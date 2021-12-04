import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import taskRoutes from './routes/tasks.routes.js';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(taskRoutes);

// Manejar Errores
app.use((err, req, res, next) => {
    return res.json({
        message: err.message
    })
});

app.listen(9000)
console.log("Server on port 9000");