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

router.get('/hr_operations/worker/:workerId', async (req, res) => {
    try {
        const operations = await HrOperationService.getOperationsByWorkerId(req.params.workerId);
        res.json(operations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch HR operations for worker' });
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
