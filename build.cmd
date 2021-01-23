@echo off

if "%1%"=="install" (
	echo "installing server"
	npm ci --prefix server
	echo "installing client"
	npm ci --prefix client
)

if "%1%"=="run" (
	echo "running server & client concurrently"
	"server/node_modules/.bin/concurrently.cmd" "nodemon server/server.js" "npm start --prefix client"
)
