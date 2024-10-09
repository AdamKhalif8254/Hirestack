import boto3
from boto3.dynamodb.conditions import Key, Attr
from botocore.exceptions import ClientError

class JobDatabase:
    def __init__(self, table_name, region_name='ca-central-1-yto-1a'):
        self.dynamodb = boto3.resource('dynamodb', region_name=region_name)
        self.table_name = table_name
        self.table = self.dynamodb.Table(table_name)

    def create_table(self):
        try:
            table = self.dynamodb.create_table(
                TableName=self.table_name,
                KeySchema=[
                    {'AttributeName': 'id', 'KeyType': 'HASH'},
                    {'AttributeName': 'title', 'KeyType': 'RANGE'}
                ],
                AttributeDefinitions=[
                    {'AttributeName': 'id', 'AttributeType': 'S'},
                    {'AttributeName': 'title', 'AttributeType': 'S'},
                    {'AttributeName': 'city', 'AttributeType': 'S'},
                    {'AttributeName': 'province', 'AttributeType': 'S'}
                ],
                GlobalSecondaryIndexes=[
                    {
                        'IndexName': 'TitleIndex',
                        'KeySchema': [{'AttributeName': 'title', 'KeyType': 'HASH'}],
                        'Projection': {'ProjectionType': 'ALL'},
                        'ProvisionedThroughput': {'ReadCapacityUnits': 5, 'WriteCapacityUnits': 5}
                    },
                    {
                        'IndexName': 'CityIndex',
                        'KeySchema': [{'AttributeName': 'city', 'KeyType': 'HASH'}],
                        'Projection': {'ProjectionType': 'ALL'},
                        'ProvisionedThroughput': {'ReadCapacityUnits': 5, 'WriteCapacityUnits': 5}
                    },
                    {
                        'IndexName': 'ProvinceIndex',
                        'KeySchema': [{'AttributeName': 'province', 'KeyType': 'HASH'}],
                        'Projection': {'ProjectionType': 'ALL'},
                        'ProvisionedThroughput': {'ReadCapacityUnits': 5, 'WriteCapacityUnits': 5}
                    }
                ],
                ProvisionedThroughput={'ReadCapacityUnits': 10, 'WriteCapacityUnits': 10}
            )
            return table
        except ClientError as e:
            print(f"Error creating table: {e}")
            return None

    def query_by_title(self, title):
        try:
            response = self.table.query(
                IndexName='TitleIndex',
                KeyConditionExpression=Key('title').begins_with(title)
            )
            return response['Items']
        except ClientError as e:
            print(f"Error querying by title: {e}")
            return []

    def query_by_city(self, city):
        try:
            response = self.table.query(
                IndexName='CityIndex',
                KeyConditionExpression=Key('city').eq(city)
            )
            return response['Items']
        except ClientError as e:
            print(f"Error querying by city: {e}")
            return []

    def insert_many_jobs(self, records):
        try:
            with self.table.batch_writer() as batch:
                for record in records:
                    batch.put_item(Item=record)
            return True
        except ClientError as e:
            print(f"Error inserting jobs: {e}")
            return False

    def get_unique_locations(self):
        try:
            response = self.table.scan(
                ProjectionExpression='location',
                Select='SPECIFIC_ATTRIBUTES'
            )
            locations = set(item['location'] for item in response['Items'])
            return list(locations)
        except ClientError as e:
            print(f"Error getting unique locations: {e}")
            return []

def connect_to_database(table_name, region_name='ca-central-1-yto-1a'):
    try:
        job_db = JobDatabase(table_name, region_name)
        job_db.table.table_status  # This will raise an exception if the table doesn't exist
        print("Successfully connected to the database")
        return job_db
    except ClientError as e:
        print(f"Failed to connect to the database: {e}")
        return None

if __name__ == "__main__":
    table_name = 'JobsTable'
    region_name = 'ca-central-1-yto-1a'  # Change this to your preferred region
    
    job_db = connect_to_database(table_name, region_name)
    if job_db is None:
        print("Creating new table...")
        job_db = JobDatabase(table_name, region_name)
        table = job_db.create_table()
        if table:
            print("Table created successfully. Waiting for it to become active...")
            table.wait_until_exists()
            print("Table is now active")
        else:
            print("Failed to create table")
    else:
        print("Connected to existing table")