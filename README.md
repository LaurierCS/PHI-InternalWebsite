<div align="center">

<img src="./assets/internal.png">

#### Home of the internal website of the Laurier Computer Science PHI Society.

</div>

<div align="center">

## Getting Started

</div>

### Prerequisites

To get started with development you need to install a few things.

1. [**VSCode**](https://code.visualstudio.com/download); IDE used for development
2. [**MongoDB**](https://docs.mongodb.com/manual/installation/); for storing data on the backend
3. [**NodeJS**](https://nodejs.org/en/download/)

### Running the app

To get the development version of the app up and running, you can do:

```
npm install
cd server 
npm install
cd ../client
npm install
cd ..
npm run dev 
```

You can also run the client and server individually with `npm run client` and `npm run server` respectively.

<div align="center">

## API

</div>

### User
Route: `/api/users/register`  
Request Type: `POST`  
Success: 200 status code  
Create a new user given username, email, password in the request body.

Route: `/api/users/login`  
Request Type: `POST`  
Success: 200 status code  
Log in a user given username & password in the request body.

### Jobs 
Route: `/api/jobs/create`  
Request Type: `POST`  
Success: 200 status code  
Create a new job document in the database. The request body must be a JSON job document.

Route: `/api/jobs/delete/<job_id>`  
Request Type: `POST`  
Success: 200 status code  
Delete the job with the given job_id

Route: `/api/jobs/update/<job_id>`  
Request Type: `POST`  
Success: 200 status code  
Update the job with the given job_id. The request body must be a JSON job document, including any fields to be updated.

