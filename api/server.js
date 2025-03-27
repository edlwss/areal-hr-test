require('dotenv').config({ path: __dirname + '/../.env' });

const express = require('express');
const pool = require('./db');
const router = require('./routes/organizationRoutes');

const app = express();
app.use(express.json());
app.use(router);

const PORT = process.env.PORT;

const startServer = async () => {
    try {
        // Ожидаем подключения к базе данных
        await pool.connect();

        app.listen(PORT, () => {
            console.log(`Server started at http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
};

startServer();
