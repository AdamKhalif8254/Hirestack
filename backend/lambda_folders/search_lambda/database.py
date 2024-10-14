import boto3
from botocore.exceptions import ClientError
from minsearch import Index
from boto3.dynamodb.conditions import Key, Attr
import pandas as pd
import json
from decimal import Decimal


class Database:
    def __init__(self, table_name, region='your-region', create_new=False, read_capacity=5, write_capacity=5):
        """
        Initialize the DynamoDB resource and table. If create_new is True, create a new table.
        
        Args:
            table_name (str): Name of the DynamoDB table.
            region (str): AWS region where the DynamoDB table is located.
            create_new (bool): If True, create a new table. Defaults to False.
            read_capacity (int): Read capacity units for the table and indexes. Defaults to 5.
            write_capacity (int): Write capacity units for the table and indexes. Defaults to 5.
        """
        self.dynamodb = boto3.resource('dynamodb', region_name=region)
        self.table_name = table_name
        self.read_capacity = read_capacity
        self.write_capacity = write_capacity
        self.region = region
        
        if create_new:
            self.create_table()
        else:
            self.table = self.dynamodb.Table(table_name)
        
        # Define text fields and keyword fields for search
        self.text_fields = ['description']  # 'job_title' treated as text field now
        self.keyword_fields = ['province', 'city']  # Only province and city, no job_type or location
        
        # Create an instance of Index from minsearch
        self.search_index = Index(text_fields=self.text_fields, keyword_fields=self.keyword_fields)

    def create_table(self):
        """
        Create a new DynamoDB table with id as partition key and core_title as sort key.
        Also create GSIs for city and province.
        
        Args:
            region (str): AWS region where the DynamoDB table should be created.
        """
        # Initialize the DynamoDB resource with the specified region
        dynamodb = boto3.resource('dynamodb', region_name=self.region)
        
        try:
            table = dynamodb.create_table(
                TableName=self.table_name,
                KeySchema=[
                    {'AttributeName': 'id', 'KeyType': 'HASH'},  # Partition key
                    {'AttributeName': 'core_title', 'KeyType': 'RANGE'}  # Sort key (core title)
                ],
                AttributeDefinitions=[
                    {'AttributeName': 'id', 'AttributeType': 'S'},  # String
                    {'AttributeName': 'core_title', 'AttributeType': 'S'},  # String
                    {'AttributeName': 'city', 'AttributeType': 'S'},  # String
                    {'AttributeName': 'province', 'AttributeType': 'S'}  # String
                ],
                ProvisionedThroughput={
                    'ReadCapacityUnits': self.read_capacity,
                    'WriteCapacityUnits': self.write_capacity
                },
                GlobalSecondaryIndexes=[
                    {
                        'IndexName': 'city-index',
                        'KeySchema': [
                            {'AttributeName': 'city', 'KeyType': 'HASH'}  # Partition key
                        ],
                        'Projection': {
                            'ProjectionType': 'ALL'  # Include all attributes in the index
                        },
                        'ProvisionedThroughput': {
                            'ReadCapacityUnits': self.read_capacity,
                            'WriteCapacityUnits': self.write_capacity
                        }
                    },
                    {
                        'IndexName': 'province-index',
                        'KeySchema': [
                            {'AttributeName': 'province', 'KeyType': 'HASH'}  # Partition key
                        ],
                        'Projection': {
                            'ProjectionType': 'ALL'  # Include all attributes in the index
                        },
                        'ProvisionedThroughput': {
                            'ReadCapacityUnits': self.read_capacity,
                            'WriteCapacityUnits': self.write_capacity
                        }
                    }
                ]
            )
            print(f"Creating table {self.table_name} in region {self.region}. Please wait...")
            table.wait_until_exists()  # Wait until the table is created
            print(f"Table {self.table_name} created successfully in region {region}.")
            self.table = table

        except ClientError as e:
            self.table = self.dynamodb.Table(self.table_name)
            print(f"Error creating table: {e}")

    def extract_core_job_title(self, job_title):
        """
        Extracts the core job title from the full job title string.
        """
        core_titles = ['developer', 'engineer', 'data scientist', 'designer', 'manager', 'analyst']
        job_title_lower = job_title.lower()

        for core_title in core_titles:
            if re.search(core_title, job_title_lower):
                return core_title

        return job_title

    def load_dataframe(self, df: pd.DataFrame):
        """
        Ingests a pandas DataFrame into the DynamoDB table.
        
        Args:
            df (pd.DataFrame): The pandas DataFrame to be ingested.
        """
        with self.table.batch_writer() as batch:
            for _, row in df.iterrows():
                # Convert the row to a dictionary and ensure correct type handling
                item = json.loads(row.to_json(), parse_float=Decimal)

                # Extract and add the core title to the item
                if 'job_title' in item:
                    item['core_title'] = self.extract_core_job_title(item['job_title'])

                batch.put_item(Item=item)

        print(f"Data from the DataFrame has been uploaded to the table '{self.table_name}' successfully.")

    def get_all_items(self):
        """
        Fetch all items from the DynamoDB table.
        
        Returns:
            list: List of all items in the DynamoDB table.
        """
        items = []
        response = self.table.scan()
        items.extend(response.get('Items', []))
        
        while 'LastEvaluatedKey' in response:
            response = self.table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
            items.extend(response.get('Items', []))
        
        return items

    def fit_search_index(self):
        """
        Load all data from DynamoDB into the minsearch index, ensuring all text fields are valid strings.
        """
        docs = self.get_all_items()

        # Sanitize the documents
        for doc in docs:
            # Ensure that the text fields and keyword fields are not None
            for field in self.text_fields + self.keyword_fields:
                if field in doc:
                    doc[field] = doc.get(field) or ""
            
            # Extract core job title and add it to each document if 'job_title' exists
            if 'job_title' in doc:
                doc['core_title'] = self.extract_core_job_title(doc['job_title'])
            else:
                doc['core_title'] = doc.get('core_title', "")
        
        # Now fit the sanitized documents into the search index
        self.search_index.fit(docs)


    def search_jobs(self, query, province=None, city=None, num_results=10):
        """
        Search jobs using full-text search with optional filters.
        
        Args:
            query (str): Search query.
            province (str, optional): Province filter. Defaults to None.
            city (str, optional): City filter. Defaults to None.
            num_results (int, optional): Number of results to return. Defaults to 10.
        
        Returns:
            list: List of jobs matching the query.
        """
        filter_dict = {}
        if province:
            filter_dict['province'] = province
        if city:
            filter_dict['city'] = city

        results = self.search_index.search(query, filter_dict=filter_dict, num_results=num_results)
        return results

    def query_by_id_and_core_title(self, job_id, core_title):
        """
        Query jobs by partition key (id) and sort key (core_title).
        
        Args:
            job_id (str): The partition key (id).
            core_title (str): The sort key (core_title).
        
        Returns:
            list: List of jobs matching the id and core title.
        """
        response = self.table.query(
            KeyConditionExpression=Key('id').eq(job_id) & Key('core_title').eq(core_title)
        )
        return response['Items']

    def scan_by_title(self, title):
        """
        Search for jobs with a specific title using a scan (since job title is a text field).
        
        Args:
            title (str): Job title to search for.
        
        Returns:
            list: List of jobs with the specified title.
        """
        response = self.table.scan(
            FilterExpression=Attr('job_title').contains(title)
        )
        return response['Items']

    def query_by_location(self, location):
        """
        Search for jobs by location using a scan.
        
        Args:
            location (str): Location to search for (can be city or province).
        
        Returns:
            list: List of jobs at the specified location.
        """
        response = self.table.scan(
            FilterExpression=Attr('city').eq(location) | Attr('province').eq(location)
        )
        return response['Items']



