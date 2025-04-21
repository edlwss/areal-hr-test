const pool = require('../db');
const ChangeLogger = require('./changeLoggerService');

class DepartmentService {
  async createDepartment(organization_ID, parent_ID, name, comment) {
    const query = `
            INSERT INTO departments ("organization_ID", "parent_ID", name, comment)
            VALUES ($1, $2, $3, $4) RETURNING *`;
    const { rows } = await pool.query(query, [organization_ID, parent_ID, name, comment]);

    await ChangeLogger.logChange({
      object_operation: 'department',
      changed_field: { created: rows[0] },
    });

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
    const getQuery = `SELECT * FROM departments WHERE "DepartmentID" = $1`;
    const { rows: oldRows } = await pool.query(getQuery, [id]);
    if (!oldRows.length) throw new Error('Department not found');

    const oldData = oldRows[0];

    const updateQuery = `
            UPDATE departments SET name = $1, comment = $2, updated_at = CURRENT_TIMESTAMP
            WHERE "DepartmentID" = $3 RETURNING *`;
    const { rows } = await pool.query(updateQuery, [name, comment, id]);
    const updated = rows[0];

    const changes = diff({ name: oldData.name, comment: oldData.comment }, { name, comment });

    if (Object.keys(changes).length) {
      await ChangeLogger.logChange({
        object_operation: 'department',
        changed_field: changes,
      });
    }

    return updated;
  }

  async deleteDepartment(id) {
    const query = `UPDATE departments SET deleted_at = CURRENT_TIMESTAMP WHERE "DepartmentID" = $1 RETURNING *`;
    const { rows } = await pool.query(query, [id]);

    if (rows.length) {
      await ChangeLogger.logChange({
        object_operation: 'department',
        changed_field: { deleted: rows[0] },
      });
    }

    return rows[0];
  }
}
function diff(oldData, newData) {
  const result = {};
  for (const key in oldData) {
    if (oldData[key] !== newData[key]) {
      result[key] = { old: oldData[key], new: newData[key] };
    }
  }
  return result;
}

module.exports = new DepartmentService();
