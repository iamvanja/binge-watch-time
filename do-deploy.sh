#!/bin/sh
set -e
echo "Deploy script started"
cd /var/www/$WWW_DIR
git checkout $BITBUCKET_BRANCH
git fetch --all
git reset --hard $BITBUCKET_COMMIT
yarn install
yarn migrate up
yarn build:server
yarn build:client:css
npm run build:client:js # npm uses less RAM
yarn start:server
echo "Deploy script finished execution"
