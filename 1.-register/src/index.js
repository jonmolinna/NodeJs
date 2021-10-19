const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const router = require('./router');

// App Config
const app = express();
const port = process.env.PORT || 9000;

// Midleware
app.use(cors());
app.use(express.json());

// BD Config
const mongoURI = "mongodb://localhost/register_crud";

mongoose.connect(mongoURI);

mongoose.connection.once('open', () => {
    console.log('DB Connected');
});

// Rutas
app.get('/', (req, res) => res.status(200).send('I Message from Backend'));
app.use('/api', router);

// Listen
app.listen(port, () => console.log(`Listening on Localhost: ${port}`));