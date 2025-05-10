const pool = require('../db');
const ChangeLogger = require('./changeLoggerService');

class DepartmentService {
  async createDepartment(organization_ID, parent_ID, name, comment) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const query = `
        INSERT INTO departments ("organization_ID", "parent_ID", name, comment)
        VALUES ($1, $2, $3, $4) RETURNING *`;
      const { rows } = await client.query(query, [organization_ID, parent_ID, name, comment]);

      await ChangeLogger.logChange({
        object_operation: 'department',
        changed_field: { created: rows[0] },
        client,
      });

      await client.query('COMMIT');
      return rows[0];
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
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
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const getQuery = `SELECT * FROM departments WHERE "DepartmentID" = $1`;
      const { rows: oldRows } = await client.query(getQuery, [id]);
      if (!oldRows.length) throw new Error('Department not found');

      const oldData = oldRows[0];

      const updateQuery = `
        UPDATE departments SET name = $1, comment = $2, updated_at = CURRENT_TIMESTAMP
        WHERE "DepartmentID" = $3 RETURNING *`;
      const { rows } = await client.query(updateQuery, [name, comment, id]);
      const updated = rows[0];

      const changes = diff({ name: oldData.name, comment: oldData.comment }, { name, comment });

      if (Object.keys(changes).length) {
        await ChangeLogger.logChange({
          object_operation: 'department',
          changed_field: changes,
          client,
        });
      }

      await client.query('COMMIT');
      return updated;
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  }

  async deleteDepartment(id) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const query = `UPDATE departments SET deleted_at = CURRENT_TIMESTAMP WHERE "DepartmentID" = $1 RETURNING *`;
      const { rows } = await client.query(query, [id]);

      if (rows.length) {
        await ChangeLogger.logChange({
          object_operation: 'department',
          changed_field: { deleted: rows[0] },
          client,
        });
      }

      await client.query('COMMIT');
      return rows[0];
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
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
