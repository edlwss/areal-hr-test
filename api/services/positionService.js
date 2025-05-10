const pool = require('../db');
const ChangeLogger = require('./changeLoggerService');

class PositionService {
  async createPosition(name) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const query = `INSERT INTO positions (name) VALUES ($1) RETURNING *`;
      const { rows } = await client.query(query, [name]);

      await ChangeLogger.logChange({
        object_operation: 'position',
        changed_field: { created: rows[0] },
      }, client);

      await client.query('COMMIT');
      return rows[0];
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  }

  async getAllPositions() {
    const { rows } = await pool.query(`SELECT * FROM positions`);
    return rows;
  }

  async getPositionById(id) {
    const { rows } = await pool.query(`SELECT * FROM positions WHERE "PositionID" = $1`, [id]);
    return rows[0];
  }

  async updatePosition(id, name) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const { rows: oldRows } = await client.query(
        `SELECT * FROM positions WHERE "PositionID" = $1`, [id]
      );
      const oldData = oldRows[0];

      const query = `UPDATE positions SET name = $1 WHERE "PositionID" = $2 RETURNING *`;
      const { rows } = await client.query(query, [name, id]);
      const updated = rows[0];

      const changes = diff({ name: oldData.name }, { name });

      if (Object.keys(changes).length) {
        await ChangeLogger.logChange({
          object_operation: 'position',
          changed_field: changes,
        }, client);
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

  async deletePosition(id) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const query = `DELETE FROM positions WHERE "PositionID" = $1 RETURNING *`;
      const { rows } = await client.query(query, [id]);

      if (rows.length) {
        await ChangeLogger.logChange({
          object_operation: 'position',
          changed_field: { deleted: rows[0] },
        }, client);
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

module.exports = new PositionService();
