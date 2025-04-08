const pool = require('../db');

class HrOperationService {
    async createHrOperation({ worker_ID, actionID, position_ID, department_ID, salary }) {
        const query = `
            INSERT INTO hr_operations ("worker_ID", "actionID", "position_ID", "department_ID", salary)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`;
        const { rows } = await pool.query(query, [worker_ID, actionID, position_ID, department_ID, salary]);
        return rows[0];
    }

    async getOperationsByWorkerId(workerId) {
        const query = `
        SELECT
            h."HrOperationID",
            h.salary,
            h."worker_ID",
            h."actionID",
            h."position_ID",
            h."department_ID",
            w.surname,
            w.name,
            a.name AS action_name,
            p.name AS position_name,
            d.name AS department_name
        FROM hr_operations h
            JOIN workers w ON h."worker_ID" = w."WorkerID"
            JOIN actions a ON h."actionID" = a."ActionID"
            LEFT JOIN positions p ON h."position_ID" = p."PositionID"
            LEFT JOIN departments d ON h."department_ID" = d."DepartmentID"
        WHERE h."worker_ID" = $1
        ORDER BY h."HrOperationID" DESC
    `;
        const { rows } = await pool.query(query, [workerId]);
        return rows;
    }

    async deleteHrOperation(id) {
        const query = `DELETE FROM hr_operations WHERE "HrOperationID" = $1 RETURNING *`;
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }
}

module.exports = new HrOperationService();
