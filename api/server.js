require('dotenv').config({ path: __dirname + '/../.env' });
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const express = require('express');
const path = require('path');
const pool = require('./db');

const organizationRoutes = require('./routes/organizationRoutes');
const positionRoutes = require('./routes/positionsRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const workersRoutes = require('./routes/workersRoutes');
const actionsRoutes = require('./routes/actionsRoutes');
const hrOperationRoutes = require('./routes/hrOperationRoutes');
const documentsRoutes = require('./routes/documentsRoutes');
const changeLoggerRouted = require('./routes/changeLoggerRoutes');
const userRoutes = require('./routes/userRoutes');
const rolesRoutes = require('./routes/rolesRoutes');
const login = require('./routes/login');
const cors = require('cors');

const app = express();

app.use(
  session({
    store: new pgSession({
      pool: pool,
      tableName: 'session',
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000,
    },
  })
);

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use('/api', organizationRoutes);
app.use('/api', positionRoutes);
app.use('/api', departmentRoutes);
app.use('/api', workersRoutes);
app.use('/api', actionsRoutes);
app.use('/api', hrOperationRoutes);
app.use('/api', documentsRoutes);
app.use('/api', changeLoggerRouted);
app.use('/api', userRoutes);
app.use('/api', rolesRoutes);
app.use('/api', login);
app.use('/uploads', express.static(path.join(__dirname, 'uploads/documents')));

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
