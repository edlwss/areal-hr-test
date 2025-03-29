const express = require('express');
const OrganizationService = require('../services/organizationService');

const router = express.Router();

router.post('/organizations', async (req, res) => {
    try {
        const { name, comment } = req.body;
        const organization = await OrganizationService.createOrganization(name, comment);
        res.status(201).json(organization);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/organizations', async (req, res) => {
    try {
        const organizations = await OrganizationService.getAllOrganizations();
        res.status(200).json(organizations);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/organizations/:id', async (req, res) => {
    try {
        const organization = await OrganizationService.getOrganizationById(req.params.id);
        if (!organization) return res.status(404).json({ error: 'Organization not found' });
        res.status(200).json(organization);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/organizations/:id', async (req, res) => {
    try {
        const { name, comment } = req.body;
        const updatedOrganization = await OrganizationService.updateOrganization(req.params.id, name, comment);
        if (!updatedOrganization) return res.status(404).json({ error: 'Organization not found' });
        res.status(200).json(updatedOrganization);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/organizations/:id', async (req, res) => {
    try {
        const deletedOrganization = await OrganizationService.deleteOrganization(req.params.id);
        if (!deletedOrganization) return res.status(404).json({ error: 'Organization not found' });
        res.status(200).json({ message: 'Organization deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
