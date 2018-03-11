#!/bin/sh
set -e
echo "Test script started"
curl -o- -L https://yarnpkg.com/install.sh | bash -s -- --version 0.22.0
export PATH=$HOME/.yarn/bin:$PATH
yarn
yarn lint
yarn test
echo "Test script finished execution"
