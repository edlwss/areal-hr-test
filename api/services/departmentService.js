const pool = require('../db');

class DepartmentService {
    async createDepartment(organization_ID, parent_ID, name, comment) {
        const query = `INSERT INTO departments (organization_ID, parent_ID, name, comment) VALUES ($1, $2, $3, $4) RETURNING *`;
        const { rows } = await pool.query(query, [organization_ID, parent_ID, name, comment]);
        return rows[0];
    }

    async getAllDepartments() {
        const query = `SELECT * FROM departments WHERE deleted_at IS NULL`;
        const { rows } = await pool.query(query);
        return rows;
    }

    async getDepartmentById(id) {
        const query = `SELECT * FROM departments WHERE "DepartmentID" = $1 AND deleted_at IS NULL`;
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }

    async updateDepartment(id, name, comment) {
        const query = `UPDATE departments SET name = $1, comment = $2 WHERE "DepartmentID" = $3 RETURNING *`;
        const { rows } = await pool.query(query, [name, comment, id]);
        return rows[0];
    }

    async deleteDepartment(id) {
        const query = `UPDATE departments SET deleted_at = CURRENT_TIMESTAMP WHERE "DepartmentID" = $1 RETURNING *`;
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }
}

module.exports = new DepartmentService();