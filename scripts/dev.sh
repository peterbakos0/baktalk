#!/bin/bash

concurrently "cd ../api && yarn dev" "cd ../client && yarn dev"
