const express = require('express');
const router = express.Router();
const ActionService = require('../services/actionsService');

router.post('/action', async (req, res) => {
    try {
        const action = await ActionService.createAction(req.body);
        res.status(201).json(action);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create action' });
    }
});

router.get('/actions', async (req, res) => {
    try {
        const actions = await ActionService.getAllActions();
        res.json(actions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch actions' });
    }
});

router.get('/action/:id', async (req, res) => {
    try {
        const action = await ActionService.getActionById(req.params.id);
        if (!action) {
            return res.status(404).json({ message: 'Action not found' });
        }
        res.json(action);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch action' });
    }
});

router.put('/action/:id', async (req, res) => {
    try {
        const updated = await ActionService.updateAction(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: 'Action not found' });
        }
        res.json(updated);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update action' });
    }
});

router.delete('/action/:id', async (req, res) => {
    try {
        const deleted = await ActionService.deleteAction(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Action not found' });
        }
        res.json(deleted);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete action' });
    }
});

module.exports = router;
