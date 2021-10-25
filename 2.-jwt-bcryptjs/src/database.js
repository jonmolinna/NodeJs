const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/jwt-bcryptjs')
    .then(db => console.log('Database is connected'));