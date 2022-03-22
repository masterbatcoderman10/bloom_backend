#!/bin/bash

DEPLOY_SERVER=$DEPLOY_SERVER
SERVER_FOLDER=$SERVER_FOLDER

# Building React output
npm cache clean --force
npm install
npm run build
#ls build/
echo "Deploying to ${DEPLOY_SERVER}"
scp -r build/ root@${DEPLOY_SERVER}:/var/www/${SERVER_FOLDER}/html

echo "Finished copying the build files"
