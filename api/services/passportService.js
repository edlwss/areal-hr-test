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


    async updatePassportData(id, { passport_series, passport_number, data_of_issue, unit_code, issued_by_whom }) {
        const query = `
            UPDATE passport_data
            SET passport_series = $1,
                passport_number = $2,
                data_of_issue = $3,
                unit_code = $4,
                issued_by_whom = $5
            WHERE "PassportDataID" = $6
            RETURNING *`;
        const values = [passport_series, passport_number, data_of_issue, unit_code, issued_by_whom, id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    async deletePassportData(id) {
        const query = `DELETE FROM passport_data WHERE "PassportDataID" = $1 RETURNING *`;
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }
}

module.exports = new PassportDataService();
