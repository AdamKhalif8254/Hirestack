import pandas as pd
import json
import boto3
from decimal import Decimal

from utils import scrape
from utils import database
from utils import process

# Scrape job data
df = scrape.job_scrape(["indeed", "linkedin", "zip_recruiter", "glassdoor"], search_term="Software Engineer", results_wanted=5, hours_old=72, country='Canada', location='Canada')

cols = ['id', 'site', 'job_url', 'job_url_direct', 'title', 'company',
       'location', 'job_type', 'date_posted', 'interval',
       'min_amount', 'max_amount', 'currency', 'is_remote',
       'description', 'company_url', 'company_url_direct', 'company_addresses',
       'company_num_employees', 'logo_photo_url','city', 'province']

df = process.process_location(df)
df = process.trim_columns(df, cols)
df['core_title'] = df['title'].apply(process.extract_core_job_title)
df = df.apply(lambda row: pd.Series(process.convert_dates(row.to_dict())), axis=1)
df['province'] = df['province'].fillna(' ')
df['city'] = df['city'].fillna(' ')


db = database.Database(table_name='Hirestack', region='ca-central-1', create_new=True)

# Load the DataFrame into DynamoDB
db.load_dataframe(df)




