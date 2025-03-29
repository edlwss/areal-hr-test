require('dotenv').config({ path: __dirname + '/../.env' });

const express = require('express');
const pool = require('./db');
const organizationRoutes = require('./routes/organizationRoutes');
const positionRoutes = require('./routes/positionsRoutes');
const departmentRoutes = require('./routes/departmentRoutes')

const app = express();
app.use(express.json());
app.use('/api', organizationRoutes);
app.use('/api', positionRoutes);
app.use('/api', departmentRoutes);

const PORT = process.env.PORT;
const startServer = async () => {
    try {
        await pool.connect();
        app.listen(PORT, () => {
            console.log(`Server started at http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
};

startServer();
