const express = require('express');
const router = express.Router();
const upload = require('../upload');
const DocumentService = require('../services/documentsService');

router.post('/document', upload.single('file'), async (req, res) => {
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

router.get('/documents', async (req, res) => {
    try {
        const docs = await DocumentService.getAllDocuments();
        res.json(docs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch documents' });
    }
});

router.get('/document/:id', async (req, res) => {
    try {
        const doc = await DocumentService.getDocumentById(req.params.id);
        if (!doc) {
            return res.status(404).json({ message: 'Document not found' });
        }
        res.json(doc);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch document' });
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
