import pandas as pd
import re
import datetime

class DataFrameProcessor:
    
    def __init__(self):
        # Dictionary to map full province names to abbreviations
        self.province_abbreviations = {
            "Ontario": "ON", "Quebec": "QC", "Nova Scotia": "NS", "New Brunswick": "NB", "Manitoba": "MB",
            "British Columbia": "BC", "Prince Edward Island": "PE", "Saskatchewan": "SK", "Alberta": "AB",
            "Newfoundland and Labrador": "NL"
        }

        # Dictionary to map well-known cities to their provinces
        self.city_to_province = {
            "toronto": "ON", "london": "ON", "waterloo": "ON", "windsor": "ON", "ottawa": "ON", "mississauga": "ON",
            "hamilton": "ON", "markham": "ON", "montreal": "QC", "quebec city": "QC", "halifax": "NS",
            "winnipeg": "MB", "edmonton": "AB", "calgary": "AB", "vancouver": "BC", "victoria": "BC",
            "richmond": "BC", "north york": "ON"
        }

        self.columns = ['id', 'site', 'job_url', 'job_url_direct', 'title', 'company',
                        'location', 'job_type', 'date_posted', 'interval',
                        'min_amount', 'max_amount', 'currency', 'is_remote',
                        'description', 'company_url', 'company_url_direct', 'company_addresses',
                        'company_num_employees', 'logo_photo_url','city', 'province'
        ]

    def trim_columns(self, df):
        """
        Trims the DataFrame to include only the specified columns.
        """
        return df[self.columns]

    def parse_location(self, location):
        """
        Parses the location field into city and province.
        """
        city, province = None, None

        if pd.isna(location):
            return pd.Series([city, province])

        # If location is of form 'City, Province, Country'
        match = re.match(r'([^,]+),\s*([A-Za-z\s]+),\s*Canada', location)
        if match:
            city = match.group(1).strip()
            province = match.group(2).strip()
            province = self.province_abbreviations.get(province, province)
            return pd.Series([city, province])

        # Normalize location to lowercase for easier matching
        location_lower = location.lower()

        # Single word locations
        if len(location.split()) == 1:
            if location_lower in self.province_abbreviations:
                province = self.province_abbreviations[location_lower]
            elif location_lower in self.province_abbreviations.values():
                province = location_lower
            elif location_lower in self.city_to_province:
                city = location.title()
                province = self.city_to_province[location_lower]
            else:
                city = location.title()
            return pd.Series([city, province])

        # Multi-word city or province
        if location_lower in self.city_to_province:
            city = location.title()
            province = self.city_to_province[location_lower]
            return pd.Series([city, province])

        # If location is 'City, Province' without 'Canada'
        match = re.match(r'([^,]+),\s*([A-Za-z\s]+)', location)
        if match:
            city = match.group(1).strip().title()
            province = match.group(2).strip()
            province = self.province_abbreviations.get(province, province)
            return pd.Series([city, province])

        return pd.Series([city, province])

    def process_location(self, df):
        """
        Applies location parsing on the 'location' column of the DataFrame.
        """
        df[['city', 'province']] = df['location'].apply(self.parse_location)
        return df

    def convert_dates(self, record):
        """
        Converts date fields in a record to ISO string format.
        """
        for key, value in record.items():
            if isinstance(value, datetime.date):
                record[key] = value.isoformat()
        return record

    def extract_core_job_title(self, job_title):
        """
        Extracts the core job title from the full job title string.
        """
        core_titles = ['developer', 'engineer', 'data scientist', 'designer', 'manager', 'analyst']
        job_title_lower = job_title.lower()

        for core_title in core_titles:
            if re.search(core_title, job_title_lower):
                return core_title.capitalize()

        return job_title

    def process_dataframe(self, df):
        """
        A comprehensive method to process the DataFrame:
        - Trim the DataFrame to selected columns
        - Process location into city and province
        - Extract core job titles
        - Convert dates to ISO format
        """
        # Process the location field into city and province
        df = self.process_location(df)
        
        # Trim to only the necessary columns
        df = self.trim_columns(df)
        
        # Extract core job title
        df = df.copy()  
        df.loc[:, 'core_title'] = df['title'].apply(self.extract_core_job_title)
        
        # Convert date fields to ISO format
        df = df.apply(lambda row: pd.Series(self.convert_dates(row.to_dict())), axis=1)
        
        # Handle missing city and province by filling with empty strings
        df['province'] = df['province'].fillna(' ')
        df['city'] = df['city'].fillna(' ')

        return df