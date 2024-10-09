import pandas as pd
from utils import scrape
from utils import database
from utils import processor

# Scrape job data
df = scrape.job_scrape(["indeed", "linkedin", "zip_recruiter", "glassdoor"], search_term="Software Engineer", results_wanted=5, hours_old=72, country='Canada', location='Canada')

df = processor.DataFrameProcessor().process_dataframe(df)

db = database.Database(table_name='Hirestack', region='ca-central-1', create_new=False)

# Load the DataFrame into DynamoDB
db.load_dataframe(df)




