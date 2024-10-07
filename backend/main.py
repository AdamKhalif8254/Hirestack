import pandas as pd

from utils import scrape
from utils import db_utils
from utils import process
from utils import search

# Scrape job data
df = scrape.job_scrape(["indeed", "linkedin", "zip_recruiter", "glassdoor"], search_term="Software Engineer", results_wanted=30, hours_old=72, country='Canada', location='Canada')
df = process.process_location(df)
# df[['city', 'province']] = df['location'].apply(utils.parse_location)

# print(df.head())

# Connect to MongoDB
client, db, collection = db_utils.connect_to_mongodb('mongodb://localhost:27017/', 'Job-Finder', 'Jobs1')

# Create indexes
db_utils.create_indexes(collection)


cols = ['id', 'site', 'job_url', 'job_url_direct', 'title', 'company',
       'location', 'job_type', 'date_posted', 'interval',
       'min_amount', 'max_amount', 'currency', 'is_remote', 'job_level',
       'description', 'company_url', 'company_url_direct', 'company_addresses',
       'company_num_employees', 'logo_photo_url','city', 'province']

df = process.trim_columns(df, cols)

# Convert DataFrame to a list of dictionaries
records = df.to_dict('records')
records = [scrape.convert_dates(record) for record in records]

print(df.columns)
# print(df['job_type'].unique())

# Insert the records into MongoDB
db_utils.insert_many_jobs(collection, records)

# Print cities for each record
# for record in records:
#     print(record['location'])

# Example queries
print("\nJobs with 'Software Engineer' in the title:")
for job in db_utils.query_by_title(collection, "Software Engineer"):
    print(f"- {job['title']} in {job['city']}")

print("\nJobs in Toronto:")
for job in db_utils.query_by_city(collection, "Toronto"):
    print(f"- {job['title']}")


# Close the connection
client.close()