const express = require('express');
const router = express.Router();
const upload = require('../upload');
const DocumentService = require('../services/documentsService');
const { createDocumentSchema} = require('../validators/documentValidator');
const validate = require('../validate');

router.post('/document', validate(createDocumentSchema), upload.single('file'), async (req, res) => {
    try {
        const { worker_ID, name } = req.body;
        const file = req.file.filename;

        const document = await DocumentService.createDocument({ worker_ID, name, file });
        res.status(201).json(document);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Upload failed' });
    }
});

router.get('/worker/:workerId/documents', async (req, res) => {
    try {
        const docs = await DocumentService.getDocumentsByWorkerId(req.params.workerId);
        res.json(docs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch worker documents' });
    }
});

const path = require('path');
const fs = require('fs');

router.get('/document/download/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../uploads/documents', filename);

    if (fs.existsSync(filePath)) {
        res.download(filePath);
    } else {
        res.status(404).json({ message: 'Файл не найден' });
    }
});


router.delete('/document/:id', async (req, res) => {
    try {
        const deleted = await DocumentService.softDeleteDocument(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Document not found' });
        }
        res.json(deleted);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete document' });
    }
});

module.exports = router;
