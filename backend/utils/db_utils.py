from pymongo import MongoClient
from pymongo.errors import DuplicateKeyError

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
