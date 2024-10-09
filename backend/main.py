import pandas as pd
import json
import boto3
from decimal import Decimal

from utils import scrape
from utils import db_utils
from utils import process
from utils import search

# Scrape job data
df = scrape.job_scrape(["indeed", "linkedin", "zip_recruiter", "glassdoor"], search_term="Software Engineer", results_wanted=5, hours_old=72, country='Canada', location='Canada')
df = process.process_location(df)

dynamodb = boto3.resource('dynamodb', region_name='us-east-2')


# Specify your table name
table_name = 'JobListings'
table = dynamodb.Table(table_name)


cols = ['id', 'site', 'job_url', 'job_url_direct', 'title', 'company',
       'location', 'job_type', 'date_posted', 'interval',
       'min_amount', 'max_amount', 'currency', 'is_remote', 'job_level',
       'description', 'company_url', 'company_url_direct', 'company_addresses',
       'company_num_employees', 'logo_photo_url','city', 'province']

df = process.trim_columns(df, cols)

# Convert DataFrame to a list of dictionaries
records = df.to_dict('records')
records = [scrape.convert_dates(record) for record in records]

print(df.size)
df.to_csv('out.csv', index=False) 
df['province'] = df['province'].fillna(' ')
df['city'] = df['city'].fillna(' ')

print(df.shape)
print(df['site'])

# Function to insert DataFrame into DynamoDB
def load_df_to_dynamodb(df, table):
    with table.batch_writer() as batch:
        for _, row in df.iterrows():
            # Convert row to JSON and use Decimal for floats
            item = json.loads(row.to_json(), parse_float=Decimal)
            batch.put_item(Item=item)

    print("Data uploaded successfully")

load_df_to_dynamodb(df, table)

