const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mern_phi', {
    useCreateIndex:true,
    useUnifiedTopology:true,
    useNewUrlParser:true
    }).then( () => {
        console.log("Connected To Mongo Db DataBase");
    }).catch((err) => {
        console.log("DataBase Connection Error " + err);
});

// mongoose.connection.on('connected', () => {
//     console.log('Mongoose has been successfully connected');
// });

// Data parsing
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));


// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static('client/build'));
// }


// HTTP request logger
app.use(morgan('tiny'));
// app.use('/api', routes);

app.listen(PORT, console.log(`Server is starting at ${PORT}`));