#!/bin/bash

# Prepare secrets folder
[ ! -d "$TEMP_DIR" ] && TEMP_DIR=$(mktemp -d /tmp/tmp.XXXXXX)
cd "$TEMP_DIR" || exit

# Generate database credentials
openssl rand -base64 32 > db_password.txt
openssl rand -hex 8 > db_username.txt

# Print the directory of secrets
echo "SECRETS_DIR=$TEMP_DIR"
