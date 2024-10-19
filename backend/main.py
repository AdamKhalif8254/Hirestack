import numpy as np
import pandas as pd
import scipy
import tls_client
import boto3
import pickle
from utils import scrape
from utils import database
from utils import processor

# Define the Lambda handler function
def lambda_handler(event, context):
    # Extract query parameters from the event
    query_params = event.get('queryStringParameters', {}) or {}

    # Extract the required parameters from the query string or provide defaults
    search_term = query_params.get('search_term', 'Software Developer')  # Default to 'Software Developer'
    results_wanted = int(query_params.get('results_wanted', 15))  # Default to 50 results
    hours_old = int(query_params.get('hours_old', 72))  # Default to 72 hours old
    country = query_params.get('country', 'Canada')  # Default to 'Canada'

    # You can add validation to ensure these parameters are valid
    if not search_term or not results_wanted or not hours_old or not country:
        return {
            "statusCode": 400,
            "body": "Missing required parameters: search_term, results_wanted, hours_old, country"
        }

    try:
        # Scrape job data using the dynamic parameters
        df = scrape.job_scrape(
            ["indeed", "linkedin", "zip_recruiter", "glassdoor"], 
            search_term=search_term, 
            results_wanted=results_wanted, 
            hours_old=hours_old,
            country=country, 
            location=country  # Assuming location is the same as the country
        )

        # Process the DataFrame
        df = processor.DataFrameProcessor().process_dataframe(df)

        # Initialize the database
        db = database.Database(table_name='Hirestack', region='ca-central-1', create_new=False)

        # Load the DataFrame into DynamoDB
        db.load_dataframe(df)

        db.fit_search_index()
        s3_client = boto3.client('s3')

        try:
            # Serialize the index object to bytes using pickle
            serialized_index = pickle.dumps(db.search_index)

            # Upload the serialized object to S3
            s3_client.put_object(
                Bucket='hirestack-search-index',
                Key='index.pkl',
                Body=serialized_index
            )
            print("Index successfully stored in S3.")
        except Exception as e:
            print(f"Error while storing index in S3: {str(e)}")

        return {
            "statusCode": 200,
            "body": "Data loaded successfully"
        }

    except Exception as e:
        # Handle errors and return a message
        return {
            "statusCode": 500,
            "body": f"An error occurred: {str(e)}"
        }
