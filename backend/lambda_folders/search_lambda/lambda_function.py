import json
import boto3
from decimal import Decimal
from database import Database  # Assuming your database class is named `database.py`

# Initialize the database object
table_name = 'Hirestack'
region = 'ca-central-1'  # Fixed typo in the region
db = Database(table_name=table_name, region=region, create_new=False)

# Fit the search index once when Lambda is initialized
db.fit_search_index()

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
        results = db.search_jobs(query=keyword, province=province, city=city, num_results=10)

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
