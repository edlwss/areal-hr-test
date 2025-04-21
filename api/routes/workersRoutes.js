const express = require('express');
const WorkerService = require('../services/workersService');
const { createWorkerSchema, updateWorkerSchema } = require('../validators/workerValidator');
const validate = require('../validate');

const router = express.Router();

router.post('/worker', validate(createWorkerSchema), async (req, res) => {
  try {
    const worker = await WorkerService.createWorker(req.body);
    res.status(201).json(worker);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/workers', async (req, res) => {
  try {
    const workers = await WorkerService.getAllWorkers();
    res.status(200).json(workers);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/worker/:id', async (req, res) => {
  try {
    const worker = await WorkerService.getWorkerById(req.params.id);
    if (!worker) return res.status(404).json({ error: 'Worker not found' });
    res.status(200).json(worker);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/worker/:id', validate(updateWorkerSchema), async (req, res) => {
  const workerId = parseInt(req.params.id, 10);
  const data = req.body;

  try {
    const updatedWorker = await WorkerService.updateWorker(workerId, data);
    res.json(updatedWorker);
  } catch (error) {
    console.error('Ошибка при обновлении работника:', error);
    res.status(500).json({ error: error.message });
  }
});

router.delete('/worker/:id', async (req, res) => {
  try {
    const deleted = await WorkerService.deleteWorker(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Worker not found' });
    res.status(200).json({ message: 'Worker deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
