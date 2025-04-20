const pool = require('../db');

class PassportDataService {
    async createPassportData({ passport_series, passport_number, data_of_issue, unit_code, issued_by_whom }) {
        console.log('data_of_issue:', data_of_issue)
        const query = `
        INSERT INTO passport_data (passport_series, passport_number, data_of_issue, unit_code, issued_by_whom)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`;
        const values = [passport_series, passport_number, data_of_issue, unit_code, issued_by_whom];

        const { rows } = await pool.query(query, values);
        return rows[0];
    }


    async updatePassportData(id, newData) {
        const selectQuery = `SELECT * FROM passport_data WHERE "PassportDataID" = $1`;
        const oldRow = (await pool.query(selectQuery, [id])).rows[0];

        const query = `
            UPDATE passport_data
            SET passport_series = $1,
                passport_number = $2,
                data_of_issue = $3,
                unit_code = $4,
                issued_by_whom = $5
            WHERE "PassportDataID" = $6
            RETURNING *`;
        const values = [
            newData.passport_series,
            newData.passport_number,
            newData.data_of_issue,
            newData.unit_code,
            newData.issued_by_whom,
            id
        ];
        const { rows } = await pool.query(query, values);

        const changes = diff(oldRow, rows[0]);

        return { updated: rows[0], changes };
    }
}

function diff(oldData, newData) {
    const result = {};
    for (const key in oldData) {
        const oldValue = oldData[key] instanceof Date ? oldData[key].toISOString() : oldData[key];
        const newValue = newData[key] instanceof Date ? newData[key].toISOString() : newData[key];

        if (oldValue !== newValue) {
            result[key] = { old: oldValue, new: newValue };
        }
    }
    return result;
}


module.exports = new PassportDataService();
