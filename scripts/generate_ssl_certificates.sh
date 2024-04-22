#!/bin/bash

# Prepare ssl folder
[ ! -d "$TEMP_DIR" ] && TEMP_DIR=$(mktemp -d /tmp/tmp.XXXXXX)
chmod o+x "$TEMP_DIR"
cd "$TEMP_DIR" || exit

# Generate SSL certificates
openssl req -new -x509 -days 365 -nodes -text -out server.crt \
  -keyout server.key -subj "//C=$COUNTRY_CODE/ST=$STATE/L=$CITY/O=$ORGANIZATION/CN=$COMMON_NAME"
cp server.crt root.crt
chmod og-rws server.key # Configure file permission. This is required by postgres, see https://www.postgresql.org/docs/current/ssl-tcp.html#SSL-SETUP

# Print the directory of ssl
echo "SSL_DIR=$TEMP_DIR"
