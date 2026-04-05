#!/bin/bash
# Script to generate self-signed SSL for 139.162.3.247.nip.io

mkdir -p .docker/nginx/ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout .docker/nginx/ssl/nginx.key \
  -out .docker/nginx/ssl/nginx.crt \
  -subj "/C=VN/ST=Hanoi/L=Hanoi/O=Travel/OU=Dev/CN=139.162.3.247.nip.io"

echo "SSL Certificate generated in .docker/nginx/ssl/"
