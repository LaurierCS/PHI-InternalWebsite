const express = require('express')
const app = express()
const port = 5000; //Express uses the same default port as React, so change it to 5000 so it doesn't conflict with React

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/newEndPoint', (req, res) => {
  res.send('This is my new end point')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})