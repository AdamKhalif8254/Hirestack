import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from minsearch import Index

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
