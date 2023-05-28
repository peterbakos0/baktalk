#!/bin/bash

docker network create baktalk-api-network

docker run \
    -v /var/lib/mongodb:/data/db \
    -d \
    --rm \
    --network baktalk-api-network \
    --name baktalk-api-mongo-container \
    mongo

docker run \
    -it \
    -p 3000:3000 \
    --rm \
    --network baktalk-api-network \
    baktalk-api

docker stop baktalk-api-mongo-container
docker network rm baktalk-api-network
