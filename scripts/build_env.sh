#!/bin/bash

./scripts/generate_secrets.sh > .env
./scripts/generate_ssl_certificates.sh >> .env
