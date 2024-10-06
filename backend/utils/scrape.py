from jobspy import scrape_jobs
import datetime


def job_scrape(site_name=["indeed", "linkedin", "zip_recruiter", "glassdoor"], search_term="Software Engineer", location=None, results_wanted=20, hours_old=72, country='Canada', country_indeed='Canada'):
    jobs = scrape_jobs(
    site_name=site_name,
    search_term=search_term,
    location=location,
    results_wanted=results_wanted,
    hours_old=hours_old, # (only Linkedin/Indeed is hour specific, others round up to days old)
    country=country,  # only needed for indeed / glassdoor
    country_indeed=country_indeed
    
    # linkedin_fetch_description=True # get more info such as full description, direct job url for linkedin (slower)
    # proxies=["208.195.175.46:65095", "208.195.175.45:65095", "localhost"],
    )
    return jobs


def get_top_jobs(keyword):
    pass

def process_location():
    pass

def process_location(df):
    # Dictionary of Canadian province abbreviations
    province_abbr = {
        'Alberta': 'AB', 'British Columbia': 'BC', 'Manitoba': 'MB', 'New Brunswick': 'NB',
        'Newfoundland and Labrador': 'NL', 'Nova Scotia': 'NS', 'Ontario': 'ON',
        'Prince Edward Island': 'PE', 'Quebec': 'QC', 'Saskatchewan': 'SK',
        'Northwest Territories': 'NT', 'Nunavut': 'NU', 'Yukon': 'YT'
    }

    def split_location(location):
        parts = location.strip('"').split(', ')
        city, province, country = '', '', ''
        
        if len(parts) >= 3:
            city, province, country = parts[:3]
        elif len(parts) == 2:
            city, country = parts
        elif len(parts) == 1:
            country = parts[0]
        
        # Abbreviate Canadian provinces
        if province in province_abbr:
            province = province_abbr[province]
        elif province in province_abbr.values():
            pass  # Already abbreviated
        else:
            province = ''  # Not a recognized Canadian province
        
        return city, province, country

    # Apply the split_location function to create new columns
    df[['City', 'Province', 'Country']] = df['location'].apply(split_location).tolist()

    # Remove rows where Country is not Canada
    df = df[df['Country'].str.lower() == 'canada']

    # Drop the original location column
    df = df.drop('location', axis=1)

    return df

def convert_dates(record):
    for key, value in record.items():
        if isinstance(value, datetime.date):
            record[key] = datetime.datetime(value.year, value.month, value.day)
            # Or convert to string with: record[key] = value.isoformat()
    return record



