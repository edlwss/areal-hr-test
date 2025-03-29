const pool = require('../db');

class OrganizationService {
    async createOrganization(name, comment) {
        const query = `
            INSERT INTO organizations (name, comment)
            VALUES ($1, $2) RETURNING *`;
        const values = [name, comment];
        const { rows } = await pool.query(query, values);
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
        const query = `
            UPDATE organizations
            SET name = $1, comment = $2, updated_at = CURRENT_TIMESTAMP
            WHERE "OrganizationID" = $3 AND deleted_at IS NULL RETURNING *`;
        const values = [name, comment, id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    async deleteOrganization(id) {
        const query = `
            UPDATE organizations
            SET deleted_at = CURRENT_TIMESTAMP
            WHERE "OrganizationID" = $1 RETURNING *`;
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }
}

module.exports = new OrganizationService();
