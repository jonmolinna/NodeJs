import mongoose from 'mongoose';

mongoose.connect("mongodb://localhost/companydb")
    .then(db => console.log('BD is connected'))
    .catch(error => console.log(error))