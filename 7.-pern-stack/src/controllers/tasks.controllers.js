import pool from '../db.js';

export const getAllTask = async (req, res, next) => {
    try {
        // throw new Error('Algo fue mal'); 
        const allTasks = await pool.query('SELECT * FROM task');
        const tasks = allTasks.rows;
        res.json({ tareas: tasks});
    } catch (error) {
        next(error)
    }
};

export const getTask = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM task WHERE id = $1', [id]);

        if(result.rows.length === 0) return res.status(404).json({
            message: 'Tarea no encontrado'
        });

        res.json(result.rows[0]);
        
    } catch (error) {
        next(error)
    }
};

export const createTask = async (req, res, next) => {
    const { title, description } = req.body;

    try {
        const result = await pool.query(
            "INSERT INTO task (title, description) VALUES ($1, $2) RETURNING *", 
            [title, description]
        );
    
        const task = result.rows[0];    
        res.json({ tarea: task });
    } catch (error) {
        next(error);
    }

};

export const deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM task WHERE id = $1', [id]);

        if(result.rowCount === 0) return res.status(404).json({
            message: 'Tarea no encontrado'
        });

        return res.sendStatus(204);
        // res.json({ message: 'Delete Task'});
    } catch (error) {
        next(error);
    }
};

export const updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        const result = await pool.query(
            'UPDATE task SET title = $1, description = $2 WHERE id = $3 RETURNING *',
            [title, description, id]
        );

        if(result.rows.length === 0) return res.status(404).json({
            message: 'Task not found'
        });

        return res.json(result.rows[0]);
        
    } catch (error) {
        next(error);
    }
};