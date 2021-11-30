import mongoose from 'mongoose';

mongoose
.connect('mongodb://localhost/mongoose-pagination')
.then(db => console.log(db.connection.host))
.catch(err => console.error(err));