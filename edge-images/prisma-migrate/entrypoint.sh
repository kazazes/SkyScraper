#!/bin/sh

./wait-for.sh prisma:4466

prisma deploy --skip-hooks --no-generate --force

sleep infinity
