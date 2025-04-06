const express = require('express');
const router = express.Router();
const HrOperationService = require('../services/HrOperationService');

router.post('/hr_operation', async (req, res) => {
    try {
        const operation = await HrOperationService.createHrOperation(req.body);
        res.status(201).json(operation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create HR operation' });
    }
});

router.get('/hr_operations', async (req, res) => {
    try {
        const operations = await HrOperationService.getAllHrOperations();
        res.json(operations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch HR operations' });
    }
});

router.get('/hr_operation/:id', async (req, res) => {
    try {
        const operation = await HrOperationService.getHrOperationById(req.params.id);
        if (!operation) {
            return res.status(404).json({ message: 'HR operation not found' });
        }
        res.json(operation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch HR operation' });
    }
});

router.put('/hr_operations/:id', async (req, res) => {
    try {
        const updated = await HrOperationService.updateHrOperation(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: 'HR operation not found' });
        }
        res.json(updated);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update HR operation' });
    }
});

router.delete('/hr_operations/:id', async (req, res) => {
    try {
        const deleted = await HrOperationService.deleteHrOperation(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'HR operation not found' });
        }
        res.json(deleted);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete HR operation' });
    }
});

module.exports = router;
