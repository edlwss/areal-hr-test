const pool = require('../db');

class ActionService {
    async createAction({ name }) {
        const query = `
            INSERT INTO actions (name)
            VALUES ($1)
            RETURNING *`;
        const { rows } = await pool.query(query, [name]);
        return rows[0];
    }

    async getActionById(id) {
        const query = `SELECT * FROM actions WHERE "ActionID" = $1`;
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }

    async getAllActions() {
        const query = `SELECT * FROM actions ORDER BY "ActionID"`;
        const { rows } = await pool.query(query);
        return rows;
    }

    async updateAction(id, { name }) {
        const query = `
            UPDATE actions SET name = $1
            WHERE "ActionID" = $2
            RETURNING *`;
        const { rows } = await pool.query(query, [name, id]);
        return rows[0];
    }

    async deleteAction(id) {
        const query = `DELETE FROM actions WHERE "ActionID" = $1 RETURNING *`;
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }
}

module.exports = new ActionService();
