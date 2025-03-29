const pool = require('../db');

class PositionService {
    async createPosition(name) {
        const query = `INSERT INTO positions (name) VALUES ($1) RETURNING *`;
        const { rows } = await pool.query(query, [name]);
        return rows[0];
    }

    async getAllPositions() {
        const query = `SELECT * FROM positions`;
        const { rows } = await pool.query(query);
        return rows;
    }

    async getPositionById(id) {
        const query = `SELECT * FROM positions WHERE "PositionID" = $1`;
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }

    async updatePosition(id, name) {
        const query = `UPDATE positions SET name = $1 WHERE "PositionID" = $2 RETURNING *`;
        const { rows } = await pool.query(query, [name, id]);
        return rows[0];
    }

    async deletePosition(id) {
        const query = `DELETE FROM positions WHERE "PositionID" = $1 RETURNING *`;
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }
}

module.exports = new PositionService();