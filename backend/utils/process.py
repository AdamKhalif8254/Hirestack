import pandas as pd
import re
import datetime


def trim_columns(df, columns):
    return df[columns]

# Dictionary to map full province names to abbreviations
province_abbreviations = {
    "Ontario": "ON", "Quebec": "QC", "Nova Scotia": "NS", "New Brunswick": "NB", "Manitoba": "MB",
    "British Columbia": "BC", "Prince Edward Island": "PE", "Saskatchewan": "SK", "Alberta": "AB",
    "Newfoundland and Labrador": "NL"
}

# Dictionary to map well-known cities to their provinces
city_to_province = {
    "toronto": "ON", "london": "ON", "waterloo": "ON", "windsor": "ON", "ottawa": "ON", "mississauga": "ON",
    "hamilton": "ON", "markham": "ON", "montreal": "QC", "quebec city": "QC", "halifax": "NS",
    "winnipeg": "MB", "edmonton": "AB", "calgary": "AB", "vancouver": "BC", "victoria": "BC",
    "richmond": "BC", "North York": "ON"
}

def parse_location(location):
    city, province = None, None

    # If location is NaN, return None values
    if pd.isna(location):
        return pd.Series([city, province])

    # If location is of form 'City, Province, Country'
    match = re.match(r'([^,]+),\s*([A-Za-z\s]+),\s*Canada', location)
    if match:
        city = match.group(1).strip()
        province = match.group(2).strip()
        province = province_abbreviations.get(province, province)  # Convert full province name to abbreviation if possible
        return pd.Series([city, province])

    # Normalize location to lowercase for easier matching
    location_lower = location.lower()

    # If location has only one word
    if len(location.split()) == 1:
        if location_lower in province_abbreviations:  # If it's a full province name
            province = province_abbreviations[location_lower]
        elif location_lower in province_abbreviations.values():  # If it's already a province abbreviation
            province = location_lower
        elif location_lower in city_to_province:  # If it's a well-known city
            city = location.title()  # Capitalize each word for consistency
            province = city_to_province[location_lower]
        else:  # Otherwise, it's a city without a known province
            city = location.title()
        return pd.Series([city, province])

    # If location has multiple words, determine if it includes a known city or province
    if location_lower in city_to_province:  # If the entire location matches a well-known city (multi-word)
        city = location.title()  # Capitalize properly
        province = city_to_province[location_lower]
        return pd.Series([city, province])

    # If location has the form 'City, Province' without 'Canada'
    match = re.match(r'([^,]+),\s*([A-Za-z\s]+)', location)
    if match:
        city = match.group(1).strip().title()
        province = match.group(2).strip()
        province = province_abbreviations.get(province, province)  # Convert full province name to abbreviation if possible
        return pd.Series([city, province])

    # If no match, return None for both
    return pd.Series([city, province])

def process_location(df):
    df[['city', 'province']] = df['location'].apply(parse_location)
    return df

# Function to convert dates to ISO format strings in the row
def convert_dates(record):
    for key, value in record.items():
        if isinstance(value, datetime.date):
            # Convert the date to an ISO string format
            record[key] = value.isoformat()
    return record

def extract_core_job_title(job_title):
    """
    Extracts the core job title from the full job title string.
    
    Args:
        job_title (str): The full job title.
    
    Returns:
        str: The core job title.
    """
    # Core titles to search for (could be expanded based on needs)
    core_titles = ['developer', 'engineer', 'data scientist', 'designer', 'manager', 'analyst']
    
    # Convert to lowercase for easier matching
    job_title_lower = job_title.lower()
    
    # Search for core job titles in the title
    for core_title in core_titles:
        if re.search(core_title, job_title_lower):
            return core_title.capitalize()
    
    # If no core title found, return the original job title as fallback
    return job_title