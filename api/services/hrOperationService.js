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

    async getHrOperationById(id) {
        const query = `
            SELECT
                h."HrOperationID",
                h.salary,
                w."WorkerID",
                w.surname,
                w.name,
                a."ActionID",
                a.name AS action_name,
                p."PositionID",
                p.name AS position_name,
                d."DepartmentID",
                d.name AS department_name
            FROM hr_operations h
                     JOIN workers w ON h."worker_ID" = w."WorkerID"
                     JOIN actions a ON h."actionID" = a."ActionID"
                     JOIN positions p ON h."position_ID" = p."PositionID"
                     JOIN departments d ON h."department_ID" = d."DepartmentID"
            WHERE h."HrOperationID" = $1`;

        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }


    async getAllHrOperations() {
        const query = `
            SELECT
                h."HrOperationID",
                h.salary,
                w."WorkerID",
                w.surname,
                w.name,
                a."ActionID",
                a.name AS action_name,
                p."PositionID",
                p.name AS position_name,
                d."DepartmentID",
                d.name AS department_name
            FROM hr_operations h
                     JOIN workers w ON h."worker_ID" = w."WorkerID"
                     JOIN actions a ON h."actionID" = a."ActionID"
                     JOIN positions p ON h."position_ID" = p."PositionID"
                     JOIN departments d ON h."department_ID" = d."DepartmentID"
            ORDER BY h."HrOperationID"`;

        const { rows } = await pool.query(query);
        return rows;
    }


    async updateHrOperation(id, { worker_ID, actionID, position_ID, department_ID, salary }) {
        const query = `
            UPDATE hr_operations
            SET "worker_ID" = $1,
                "actionID" = $2,
                "position_ID" = $3,
                "department_ID" = $4,
                salary = $5
            WHERE "HrOperationID" = $6
            RETURNING *`;
        const { rows } = await pool.query(query, [worker_ID, actionID, position_ID, department_ID, salary, id]);
        return rows[0];
    }

    async deleteHrOperation(id) {
        const query = `DELETE FROM hr_operations WHERE "HrOperationID" = $1 RETURNING *`;
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }
}

module.exports = new HrOperationService();
