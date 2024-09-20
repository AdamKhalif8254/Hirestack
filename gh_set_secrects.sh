#!/bin/bash

# Path to your .env.local file
ENV_FILE=".env.local"

# Array of environments
ENVIRONMENTS=("production" "preview")

# Check if the file exists
if [ ! -f "$ENV_FILE" ]; then
    echo "Error: $ENV_FILE not found"
    exit 1
fi

# Function to create environment if it doesn't exist
create_environment() {
    if ! gh environment view "$1" &>/dev/null; then
        echo "Environment $1 does not exist. Creating it..."
        gh environment create "$1"
    fi
}

# Function to set or update a secret
set_or_update_secret() {
    local env=$1
    local key=$2
    local value=$3
    
    echo "Setting/updating environment secret for $env: $key"
    gh secret set "$key" --env "$env" -b "$value"
}

# Create environments if they don't exist
for env in "${ENVIRONMENTS[@]}"; do
    create_environment "$env"
done

# Read each line from .env.local
while IFS= read -r line || [[ -n "$line" ]]; do
    # Skip empty lines and comments
    if [[ -z "$line" ]] || [[ "$line" =~ ^#.* ]]; then
        continue
    fi

    # Extract the key and value
    key=$(echo "$line" | cut -d '=' -f1)
    value=$(echo "$line" | cut -d '=' -f2-)

    # Remove surrounding quotes from the value if present
    value=$(echo "$value" | sed -e 's/^"//' -e 's/"$//')

    # Set or update the secret for each environment
    for env in "${ENVIRONMENTS[@]}"; do
        set_or_update_secret "$env" "$key" "$value":
    done
done < "$ENV_FILE"

echo "All environment secrets have been set/updated for production and preview!"