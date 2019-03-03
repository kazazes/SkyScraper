#!/bin/sh

docker-compose -f docker-compose.amd.yml build --parallel >/dev/null

CONTAINERS=$(cat docker-compose.amd.yml | grep container_name | sed -e 's/^.*container_name: //')
CONTAINERS=$(echo $CONTAINERS | tr " " "\n")
BASE=$(basename ${PWD})

for x in $CONTAINERS
do
    docker tag ${BASE}_$x skyscraper/$x:amd
    echo -e "Tagged ${BASE}_$x as skyscraper/$x:amd"
done

echo $arr

