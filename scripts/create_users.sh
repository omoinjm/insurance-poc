#!/bin/bash

# Endpoint URL
URL="http://localhost:5242/api/v1/Auth/Register"

# Predefined roles to cycle through
ROLES=("ADMIN" "USER" "MANAGER" "MODERATOR" "SUPPORT")

# Generate 100 users
for i in $(seq 1 100); do
    # Generate unique values for each user
    EMAIL="user${i}@example.com"
    USERNAME="user_${i}"
    PASSWORD="Password${i}!"
    ROLE="${ROLES[$((i % ${#ROLES[@]}))]}" # Cycle through roles

    # Make the API call
    echo "Creating user: $USERNAME with email: $EMAIL, password: $PASSWORD, role: $ROLE"

    curl -s -X POST $URL \
        -d '{
            "Email": "'"$EMAIL"'",
            "Password": "'"$PASSWORD"'",
            "Role": "'"$ROLE"'",
            "Username": "'"$USERNAME"'"
        }' \
        -H "Content-Type: application/json" | jq

    # Optional delay to avoid overwhelming the server
    sleep 0.1
done

echo "User creation script completed."

