#!/bin/bash

# Prepare ssl folder
if [ ! -d ".ssl" ]; then
    mkdir -p ".ssl"
fi

cd .ssl || exit

# Generate SSL certificates
openssl req -new -x509 -days 365 -nodes -text -out server.crt \
  -keyout server.key -subj "//C=$COUNTRY_CODE/ST=$STATE/L=$CITY/O=$ORGANIZATION/CN=$COMMON_NAME"
cp server.crt root.crt
chmod og-rws server.key # Configure file permission. This is required by postgres, see https://www.postgresql.org/docs/current/ssl-tcp.html#SSL-SETUP

# Print the directory of ssl
echo "SSL_DIR=$(pwd)"
