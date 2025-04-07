const express = require('express');
const router = express.Router();
const ActionService = require('../services/actionsService');


router.get('/actions', async (req, res) => {
    try {
        const actions = await ActionService.getAllActions();
        res.json(actions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch actions' });
    }
});


module.exports = router;
