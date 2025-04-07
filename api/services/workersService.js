const pool = require('../db');
const AddressService = require('./addressService');
const PassportDataService = require('./passportService');

class WorkerService {
    async createWorker({ surname, name, middlename, birth_date, address, passport }) {
        console.log('data_of_issue:', passport.data_of_issue)
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            const savedAddress = await AddressService.createAddress(address);
            const savedPassport = await PassportDataService.createPassportData(passport);

            const workerQuery = `
                INSERT INTO workers (
                    surname, name, middlename, birth_date,
                    "passport_data_ID", "address_ID"
                ) VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING *`;
            const workerValues = [
                surname,
                name,
                middlename || null,
                birth_date,
                savedPassport.PassportDataID,
                savedAddress.AddressID
            ];
            const { rows } = await client.query(workerQuery, workerValues);

            await client.query('COMMIT');
            return rows[0];
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    async getAllWorkers() {
        const query = `
            SELECT w.*, p.*, a.*
            FROM workers w
            JOIN passport_data p ON w."passport_data_ID" = p."PassportDataID"
            JOIN addresses a ON w."address_ID" = a."AddressID"`;
        const { rows } = await pool.query(query);
        return rows;
    }

    async getWorkerById(id) {
        const query = `
            SELECT w.*, p.*, a.*
            FROM workers w
            JOIN passport_data p ON w."passport_data_ID" = p."PassportDataID"
            JOIN addresses a ON w."address_ID" = a."AddressID"
            WHERE w."WorkerID" = $1`;
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }

    async updateWorker(id, { surname, name, middlename, birth_date, address, passport }) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            const workerQuery = `SELECT "passport_data_ID", "address_ID" FROM workers WHERE "WorkerID" = $1`;
            const { rows } = await client.query(workerQuery, [id]);

            if (rows.length === 0) {
                throw new Error('Worker not found');
            }

            const { passport_data_ID, address_ID } = rows[0];

            if (address) {
                await AddressService.updateAddress(address_ID, address);
            }

            if (passport) {
                await PassportDataService.updatePassportData(passport_data_ID, passport);
            }

            const updateWorkerQuery = `
            UPDATE workers
            SET surname = $1,
                name = $2,
                middlename = $3,
                birth_date = $4,
                updated_at = CURRENT_TIMESTAMP
            WHERE "WorkerID" = $5
            RETURNING *`;
            const values = [surname, name, middlename || null, birth_date, id];
            const updated = await client.query(updateWorkerQuery, values);

            await client.query('COMMIT');
            return updated.rows[0];
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    }

    async deleteWorker(id) {
        const query = `DELETE FROM workers WHERE "WorkerID" = $1 RETURNING *`;
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }
}

module.exports = new WorkerService();
