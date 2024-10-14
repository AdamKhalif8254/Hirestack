# Use AWS Lambda's base image for Python 3.12
FROM public.ecr.aws/lambda/python:3.12

# Copy the Python dependencies
COPY requirements.txt ./

# Install any dependencies
RUN pip install -r requirements.txt

# Copy the Lambda function and the database code
COPY lambda_function.py /var/task/
COPY database.py /var/task/

# Set the CMD to your function handler (ex. lambda_function.lambda_handler)
CMD ["lambda_function.lambda_handler"]
