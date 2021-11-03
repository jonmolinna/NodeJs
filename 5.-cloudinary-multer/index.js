const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

// Connect DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB is connected'))
    .catch(err => console.log(err));

// Middleware
app.use(express.json());

// Rutas
app.use('/user', require('./router/user.js'));

app.listen(5000, () => console.log('Server is running'));