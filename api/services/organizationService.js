const pool = require('../db');
const ChangeLogger = require('./changeLoggerService');

class OrganizationService {
  async createOrganization(name, comment) {
    const query = `
            INSERT INTO organizations (name, comment)
            VALUES ($1, $2) RETURNING *`;
    const values = [name, comment];
    const { rows } = await pool.query(query, values);

    await ChangeLogger.logChange({
      object_operation: 'organization',
      changed_field: { created: rows[0] },
    });

    return rows[0];
  }

  async getAllOrganizations() {
    const query = `SELECT * FROM organizations WHERE deleted_at IS NULL`;
    const { rows } = await pool.query(query);
    return rows;
  }

  async getOrganizationById(id) {
    const query = `SELECT * FROM organizations WHERE "OrganizationID" = $1 AND deleted_at IS NULL`;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  async updateOrganization(id, name, comment) {
    const { rows: oldRows } = await pool.query(
      `SELECT * FROM organizations WHERE "OrganizationID" = $1`,
      [id]
    );
    const oldData = oldRows[0];

    const query = `
            UPDATE organizations
            SET name = $1, comment = $2, updated_at = CURRENT_TIMESTAMP
            WHERE "OrganizationID" = $3 AND deleted_at IS NULL RETURNING *`;
    const values = [name, comment, id];
    const { rows } = await pool.query(query, values);
    const updated = rows[0];

    const changes = diff({ name: oldData.name, comment: oldData.comment }, { name, comment });

    if (Object.keys(changes).length) {
      await ChangeLogger.logChange({
        object_operation: 'organization',
        changed_field: changes,
      });
    }

    return updated;
  }

  async deleteOrganization(id) {
    const query = `
            UPDATE organizations
            SET deleted_at = CURRENT_TIMESTAMP
            WHERE "OrganizationID" = $1 RETURNING *`;
    const { rows } = await pool.query(query, [id]);

    if (rows.length) {
      await ChangeLogger.logChange({
        object_operation: 'organization',
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
module.exports = new OrganizationService();
