const express = require('express');
const router = express.Router();
const RolesService = require('../services/rolesService');

router.get('/roles', async (req, res) => {
  try {
    const roles = await RolesService.getAllRoles();
    res.json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch roles' });
  }
});

module.exports = router;
