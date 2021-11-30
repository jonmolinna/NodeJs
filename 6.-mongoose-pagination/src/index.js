import express from 'express';
import './database.js';
import router from './routes.js';

const app = express();

// Middlerware
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Hola Mundo'})
})

app.use(router)

app.listen(9000);
console.log('Server on port ', 9000)