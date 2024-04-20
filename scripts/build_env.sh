#!/bin/bash

./generate_secrets.sh > .env
./generate_ssl_certificates >> .env
