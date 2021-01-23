#!/bin/bash

if [ "$1" == "install" ]; then
	npm ci --prefix server
	npm ci --prefix client
fi

if [ "$1" == "run" ]; then
	./server/node_modules/.bin/concurrently "nodemon server/server.js" "npm start --prefix client"
fi
