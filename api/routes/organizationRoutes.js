const express = require('express');
const pool = require('../db');

const router = express.Router();

// // Получение всех организаций
// router.get('/organizations', async (req, res) => {
//     try {
//         const result = await pool.query('SELECT * FROM organizations');
//         res.json(result.rows);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Database error' });
//     }
// });
//
// // Добавление организации
// router.post('/organizations', async (req, res) => {
//     const { name } = req.body;
//     try {
//         const result = await pool.query(
//             'INSERT INTO organizations (name) VALUES ($1) RETURNING *',
//             [name]
//         );
//         res.json(result.rows[0]);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Database error' });
//     }
// });

module.exports = router;
