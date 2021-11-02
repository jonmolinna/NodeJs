const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan'); // to get info for each request
const cors = require('cors');
const path = require('path');
// const bodyParser = require('body-parser');

const app = express();

app.use(cors());

app.use('/uploads', express.static('uploads')); // use uploads folder to save image

// Connect Mongodb
mongoose.connect("mongodb://localhost/uploadimage")
    .then(() => console.log('DB Connected'));

// Check connect to db
mongoose.connection.on('error', err => {
    console.log(`DB COnnection error ${err.message}`);
});

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// app.use(
//     bodyParser.urlencoded({
//         extended: true,
//     })
// );

// import category route
app.use('/api', require('./routes/category.route.js'));

// page not found 404
app.use((req, res) => {
    res.status(404).json({
        errors: 'page not found'
    })
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});