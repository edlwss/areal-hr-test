const pool = require('../db');

class ActionService {

    async getAllActions() {
        const query = `SELECT * FROM actions ORDER BY "ActionID"`;
        const { rows } = await pool.query(query);
        return rows;
    }
}

module.exports = new ActionService();
