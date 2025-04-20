const express = require('express');
const router = express.Router();
const ChangeLogger = require('../services/changeLoggerService');

router.get('/change-logger', async (req, res) => {
    try {
        const changes = await ChangeLogger.getAllChanges();
        res.json(changes);
    } catch (err) {
        console.error('Ошибка при получении истории изменений:', err);
        res.status(500).json({ error: 'Ошибка при получении истории изменений' });
    }
});

module.exports = router;
