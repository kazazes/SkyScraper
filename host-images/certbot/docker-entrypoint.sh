#!/bin/bash

set -e

certbot certonly -d *.sibyl.vision --dns-cloudflare --agree-tos -m ${CF_EMAIL} --non-interactive

echo -e "\n\n\nChain:\n\n\n" && cat /etc/letsencrypt/live/sibyl.vision/fullchain.pem

echo -e "Private Key: \n\n\n" && cat /etc/letsencrypt/live/sibyl.vision/privkey.pem
