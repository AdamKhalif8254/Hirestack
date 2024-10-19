import json
import boto3
from decimal import Decimal
import pickle
from database import Database  # Assuming your database class is named `database.py`


def load_index_from_s3(db):
    s3_client = boto3.client('s3')
    BUCKET_NAME = 'hirestack-search-index'
    FILE_NAME = 'index.pkl'
    try:
        # Download the pickled index file from S3
        s3_response = s3_client.get_object(Bucket=BUCKET_NAME, Key=FILE_NAME)
        serialized_index = s3_response['Body'].read()

        # Deserialize the byte stream back into an Index object
        index = pickle.loads(serialized_index)
        print("Index successfully loaded from S3.")
        db.search_index = index
    except Exception as e:
        print(f"Error while loading index from S3: {str(e)}")

table_name = 'Hirestack'
region = 'ca-central-1'  # Fixed typo in the region
db = Database(table_name=table_name, region=region, create_new=False)

load_index_from_s3(db)

def lambda_handler(event, context):
    # Parse query parameters from the event
    query_params = event.get('queryStringParameters', {}) or {}
    
    # Extract the search keyword and optional filters (province, city) from the query parameters
    keyword = query_params.get('keyword', None)
    province = query_params.get('province', None)
    city = query_params.get('city', None)
    

    # Validate that a keyword is provided
    if not keyword:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': 'Keyword is required'}),
            'headers': {
                'Content-Type': 'application/json'
            }
        }
    
    # Perform the search using the `search_jobs` method from the Database class
    try:
        # Call the search_jobs method with optional filters for province and city
        results = db.search_jobs(query=keyword, province=province, city=city, num_results=50)

        # Return the search results in the response
        return {
            'statusCode': 200,
            'body': json.dumps(results, cls=DecimalEncoder),
            'headers': {
                'Content-Type': 'application/json'
            }
        }

    except Exception as e:
        # Log the error for debugging purposes
        print(f"Error occurred: {str(e)}")

        # Return an error response in case of failure
        return {
            'statusCode': 500,
            'body': json.dumps({'error': 'An error occurred during the search process.'}),
            'headers': {
                'Content-Type': 'application/json'
            }
        }

# Custom JSON encoder to handle Decimal types returned from DynamoDB
class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return float(obj) if obj % 1 else int(obj)
        return super(DecimalEncoder, self).default(obj)
