import json
import boto3
from boto3.dynamodb.conditions import Attr
from datetime import datetime, timedelta
import logging

# Set up logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# Initialize DynamoDB resource
dynamodb = boto3.resource('dynamodb', region_name='ca-central-1')
table = dynamodb.Table('Hirestack')

def lambda_handler(event, context):
    logger.info("Starting DynamoDB cleanup process")
    
    # Get today's date
    today = datetime.now()

    # Calculate the date 3 weeks ago
    three_weeks_ago = today - timedelta(weeks=3)

    # Convert the date to string
    three_weeks_ago_str = three_weeks_ago.strftime('%Y-%m-%d')

    logger.info(f"Deleting items older than {three_weeks_ago_str}")

    items_deleted = 0
    last_evaluated_key = None

    try:
        while True:
            # Scan parameters
            scan_params = {
                'FilterExpression': Attr('date_posted').lt(three_weeks_ago_str),
                'ProjectionExpression': 'id, core_title',  # Only fetch the keys we need
            }

            # Add ExclusiveStartKey if we're not on the first iteration
            if last_evaluated_key:
                scan_params['ExclusiveStartKey'] = last_evaluated_key

            # Scan the table
            response = table.scan(**scan_params)
            
            items_to_delete = response.get('Items', [])
            
            # Delete items in batches
            with table.batch_writer() as batch:
                for item in items_to_delete:
                    logger.info(f"Deleting item: {item['id']}")
                    batch.delete_item(
                        Key={
                            'id': item['id'],
                            'core_title': item['core_title']
                        }
                    )
                    items_deleted += 1

            # Check if we need to continue scanning
            last_evaluated_key = response.get('LastEvaluatedKey')
            if not last_evaluated_key:
                break

        logger.info(f"Deletion process completed. Total items deleted: {items_deleted}")
        return {
            'statusCode': 200,
            'body': json.dumps(f"Deleted {items_deleted} items older than {three_weeks_ago_str}")
        }
        
    except Exception as e:
        logger.error(f"Error occurred: {str(e)}", exc_info=True)
        return {
            'statusCode': 500,
            'body': json.dumps(f"An error occurred: {str(e)}")
        }