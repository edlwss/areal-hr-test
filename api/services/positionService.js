const pool = require('../db');
const ChangeLogger = require('./changeLoggerService');


class PositionService {
    async createPosition(name) {
        const query = `INSERT INTO positions (name) VALUES ($1) RETURNING *`;
        const { rows } = await pool.query(query, [name]);

        await ChangeLogger.logChange({
            object_operation: 'position',
            changed_field: { created: rows[0] }
        });

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
        const { rows: oldRows } = await pool.query(
            `SELECT * FROM positions WHERE "PositionID" = $1`,
            [id]
        );
        const oldData = oldRows[0];

        const query = `UPDATE positions SET name = $1 WHERE "PositionID" = $2 RETURNING *`;
        const { rows } = await pool.query(query, [name, id]);
        const updated = rows[0];

        const changes = diff(
            { name: oldData.name },
            { name }
        );

        if (Object.keys(changes).length) {
            await ChangeLogger.logChange({
                object_operation: 'position',
                changed_field: changes
            });
        }

        return updated;
    }

    async deletePosition(id) {
        const query = `DELETE FROM positions WHERE "PositionID" = $1 RETURNING *`;
        const { rows } = await pool.query(query, [id]);

        if (rows.length) {
            await ChangeLogger.logChange({
                object_operation: 'position',
                changed_field: { deleted: rows[0] }
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
module.exports = new PositionService();
