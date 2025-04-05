const pool = require('../db');
const AddressService = require('./addressService');
const PassportDataService = require('./passportService');

class WorkerService {
    async createWorker({ surname, name, middlename, birth_date, address, passport }) {
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

    async deleteWorker(id) {
        const query = `DELETE FROM workers WHERE "WorkerID" = $1 RETURNING *`;
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }
}

module.exports = new WorkerService();
