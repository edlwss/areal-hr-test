const pool = require('../db');
const ChangeLogger = require('./changeLoggerService');

class OrganizationService {
  async createOrganization(name, comment) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const query = `
        INSERT INTO organizations (name, comment)
        VALUES ($1, $2) RETURNING *`;
      const { rows } = await client.query(query, [name, comment]);

      await ChangeLogger.logChange({
        object_operation: 'organization',
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

  async getAllOrganizations() {
    const { rows } = await pool.query(`SELECT * FROM organizations WHERE deleted_at IS NULL`);
    return rows;
  }

  async getOrganizationById(id) {
    const { rows } = await pool.query(`SELECT * FROM organizations WHERE "OrganizationID" = $1 AND deleted_at IS NULL`, [id]);
    return rows[0];
  }

  async updateOrganization(id, name, comment) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const { rows: oldRows } = await client.query(
        `SELECT * FROM organizations WHERE "OrganizationID" = $1`, [id]
      );
      const oldData = oldRows[0];

      const query = `
        UPDATE organizations
        SET name = $1, comment = $2, updated_at = CURRENT_TIMESTAMP
        WHERE "OrganizationID" = $3 AND deleted_at IS NULL
        RETURNING *`;
      const { rows } = await client.query(query, [name, comment, id]);
      const updated = rows[0];

      const changes = diff(
        { name: oldData.name, comment: oldData.comment },
        { name, comment }
      );

      if (Object.keys(changes).length) {
        await ChangeLogger.logChange({
          object_operation: 'organization',
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

  async deleteOrganization(id) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const query = `
        UPDATE organizations
        SET deleted_at = CURRENT_TIMESTAMP
        WHERE "OrganizationID" = $1 RETURNING *`;
      const { rows } = await client.query(query, [id]);

      if (rows.length) {
        await ChangeLogger.logChange({
          object_operation: 'organization',
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

module.exports = new OrganizationService();
