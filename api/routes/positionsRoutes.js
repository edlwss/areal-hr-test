const express = require('express');
const PositionService = require('../services/positionService');

const router = express.Router();

router.post('/positions', async (req, res) => {
    try {
        const { name } = req.body;
        const position = await PositionService.createPosition(name);
        res.status(201).json(position);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/positions', async (req, res) => {
    try {
        const positions = await PositionService.getAllPositions();
        res.status(200).json(positions);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/positions/:id', async (req, res) => {
    try {
        const position = await PositionService.getPositionById(req.params.id);
        if (!position) return res.status(404).json({ error: 'Position not found' });
        res.status(200).json(position);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/positions/:id', async (req, res) => {
    try {
        const { name } = req.body;
        const updatedPosition = await PositionService.updatePosition(req.params.id, name);
        if (!updatedPosition) return res.status(404).json({ error: 'Position not found' });
        res.status(200).json(updatedPosition);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/positions/:id', async (req, res) => {
    try {
        const deletedPosition = await PositionService.deletePosition(req.params.id);
        if (!deletedPosition) return res.status(404).json({ error: 'Position not found' });
        res.status(200).json({ message: 'Position deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;