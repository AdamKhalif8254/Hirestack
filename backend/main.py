import numpy as np
import pandas as pd
import scipy
import tls_client
from utils import scrape
from utils import database
from utils import processor

# Define the Lambda handler function
def lambda_handler(event, context):
    # Scrape job data
    df = scrape.job_scrape(
        ["indeed", "linkedin", "zip_recruiter", "glassdoor"], 
        search_term="Software Engineer", 
        results_wanted=5, 
        hours_old=72, 
        country='Canada', 
        location='Canada'
    )

    # Process the DataFrame
    df = processor.DataFrameProcessor().process_dataframe(df)

    # Initialize the database
    db = database.Database(table_name='Hirestack', region='ca-central-1', create_new=False)

    # Load the DataFrame into DynamoDB
    db.load_dataframe(df)

    return {
        "statusCode": 200,
        "body": "Data loaded successfully"
    }
