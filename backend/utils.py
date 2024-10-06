from pymongo import MongoClient
from pymongo.errors import DuplicateKeyError
import pandas as pd
import re
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from minsearch import Index

def connect_to_mongodb(connection_string, db_name, collection_name):
    client = MongoClient(connection_string)
    db = client[db_name]
    collection = db[collection_name]
    return client, db, collection

def create_indexes(collection):
    collection.create_index("Job Title")
    collection.create_index("City")

def query_by_title(collection, title):
    return list(collection.find({"title": {"$regex": title, "$options": "i"}}))

def query_by_city(collection, city):
    return list(collection.find({"city": city}))

def insert_many_jobs(collection, records):
    return collection.insert_many(records)

def get_unique_locations(collection):
    return collection.distinct('location')

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


# Refresh the in-memory search index
def refresh_index(collection):
    # Fetch all job postings from the MongoDB collection
    jobs = list(collection.find({}, {"_id": 0}))  # Fetch all documents, omit MongoDB's default `_id` field

    # Initialize the search index
    text_fields = ['title', 'description']
    keyword_fields = ['location', 'city', 'company', 'job_type', 'industry']  # Adding fields that make sense for keyword matching
    index = Index(text_fields=text_fields, keyword_fields=keyword_fields)

    # Fit the index with the documents from MongoDB
    index.fit(jobs)
    return index

# Perform a search using the in-memory index
def search_jobs(index, query, filter_dict={}, boost_dict={}, num_results=10):
    results = index.search(query, filter_dict=filter_dict, boost_dict=boost_dict, num_results=num_results)
    return results
