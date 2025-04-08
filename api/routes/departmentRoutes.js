const express = require('express');
const DepartmentService = require('../services/departmentService');
const validate = require('../validate');
const { createDepartmentSchema, updateDepartmentSchema } = require('../validators/departmentValidator');

const departmentRouter = express.Router();

departmentRouter.post('/department', validate(createDepartmentSchema), async (req, res) => {
    try {
        const { organization_ID, parent_ID, name, comment } = req.body;
        const department = await DepartmentService.createDepartment(organization_ID, parent_ID, name, comment);
        res.status(201).json(department);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

departmentRouter.get('/departments', async (req, res) => {
    try {
        const departments = await DepartmentService.getAllDepartments();
        res.status(200).json(departments);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

departmentRouter.get('/department/:id', async (req, res) => {
    try {
        const department = await DepartmentService.getDepartmentById(req.params.id);
        if (!department) return res.status(404).json({ error: 'Department not found' });
        res.status(200).json(department);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

departmentRouter.put('/department/:id', validate(updateDepartmentSchema), async (req, res) => {
    try {
        const { name, comment } = req.body;
        const updatedDepartment = await DepartmentService.updateDepartment(req.params.id, name, comment);
        if (!updatedDepartment) return res.status(404).json({ error: 'Department not found' });
        res.status(200).json(updatedDepartment);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

departmentRouter.delete('/department/:id', async (req, res) => {
    try {
        const deletedDepartment = await DepartmentService.deleteDepartment(req.params.id);
        if (!deletedDepartment) return res.status(404).json({ error: 'Department not found' });
        res.status(200).json({ message: 'Department deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = departmentRouter;