import boto3
import pandas as pd

# Initialize a boto3 DynamoDB resource
dynamodb = boto3.resource('dynamodb', region_name='us-east-2')

# Specify your DynamoDB table name
table_name = 'JobListings'
table = dynamodb.Table(table_name)

def get_all_items(table):
    data = []
    response = table.scan()  # Use the scan operation to retrieve all data
    data.extend(response.get('Items', []))  # Add the items to the list

    # Continue scanning if there are more results
    while 'LastEvaluatedKey' in response:
        response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
        data.extend(response.get('Items', []))

    return data

# Convert the list of DynamoDB items to a pandas DataFrame
def dynamo_to_dataframe(data):
    return pd.DataFrame(data)

# Function to check for duplicates
def check_for_duplicates(df):
    # Check for duplicates based on all columns
    duplicated_rows = df[df.duplicated()]
    
    if not duplicated_rows.empty:
        print("Duplicated rows found:")
        print(duplicated_rows)
    else:
        print("No duplicates found.")
    
    return duplicated_rows

if __name__ == '__main__':
    try:
        # Fetch data from DynamoDB
        items = get_all_items(table)
        
        # Convert to pandas DataFrame
        df = dynamo_to_dataframe(items)
        
        # Display the DataFrame (optional, for debugging purposes)
        print(df)
        
        # Check for duplicates
        duplicates = check_for_duplicates(df)
    except Exception as e:
        print(f"An error occurred: {e}")