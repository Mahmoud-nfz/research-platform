#!/bin/bash

# Prepare secrets folder
if [ ! -d ".secrets" ]; then
    mkdir -p ".secrets"
fi

cd .secrets || exit


# Generate database credentials
openssl rand -base64 32 > db_password.txt
openssl rand -hex 8 > db_username.txt

# Print the directory of secrets
echo "SECRETS_DIR=$(pwd)"
