const express = require('express');
const UserService = require('../services/userService');
// const { userCreateSchema, userUpdateSchema } = require('../validators/userValidator');
// const validate = require('../validate');
const router = express.Router();

router.post(
  '/user',
  /* validate(userCreateSchema), */ async (req, res) => {
    try {
      const user = await UserService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

router.get('/users', async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/user/:id', async (req, res) => {
  try {
    const user = await UserService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put(
  '/user/:id',
  /* validate(userUpdateSchema), */ async (req, res) => {
    try {
      const updated = await UserService.updateUser(req.params.id, req.body);
      if (!updated) return res.status(404).json({ error: 'User not found' });
      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

router.delete('/user/:id', async (req, res) => {
  try {
    const deleted = await UserService.deleteUser(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
