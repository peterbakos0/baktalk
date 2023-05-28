#!/bin/bash

concurrently "cd ../api && yarn start" "cd ../client && yarn start"
