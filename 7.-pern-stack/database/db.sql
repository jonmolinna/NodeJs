CREATE DATABASE pern_stack;

CREATE TABLE task(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) UNIQUE,
    description VARCHAR(255)
);

-- \l => permite ver las base de datos
-- \c nameDB => permite cambiar la base de datos