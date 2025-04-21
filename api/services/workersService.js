const pool = require('../db');
const AddressService = require('./addressService');
const PassportDataService = require('./passportService');
const ChangeLogger = require('./changeLoggerService');

class WorkerService {
  async createWorker({ surname, name, middlename, birth_date, address, passport }) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const savedAddress = await AddressService.createAddress(address, client);
      const savedPassport = await PassportDataService.createPassportData(passport, client);

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
        savedAddress.AddressID,
      ];
      const { rows } = await client.query(workerQuery, workerValues);

      await ChangeLogger.logChange({
        object_operation: 'worker',
        changed_field: { created: rows[0] },
      });

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

      const workerQuery = `SELECT "passport_data_ID", "address_ID", surname, name, middlename, birth_date
                                 FROM workers WHERE "WorkerID" = $1`;
      const { rows } = await client.query(workerQuery, [id]);
      if (!rows.length) throw new Error('Worker not found');

      const {
        passport_data_ID,
        address_ID,
        surname: oldSurname,
        name: oldName,
        middlename: oldMiddlename,
        birth_date: oldBirthDate,
      } = rows[0];

      const changes = {};

      if (address) {
        const { changes: addressChanges } = await AddressService.updateAddress(address_ID, address);
        if (Object.keys(addressChanges).length) changes.address = addressChanges;
      }

      if (passport) {
        const { changes: passportChanges } = await PassportDataService.updatePassportData(
          passport_data_ID,
          passport
        );
        if (Object.keys(passportChanges).length) changes.passport = passportChanges;
      }

      const workerUpdateQuery = `
                UPDATE workers SET
                                   surname = $1, name = $2, middlename = $3, birth_date = $4, updated_at = CURRENT_TIMESTAMP
                WHERE "WorkerID" = $5 RETURNING *`;
      const values = [surname, name, middlename || null, birth_date, id];
      const { rows: updatedRows } = await client.query(workerUpdateQuery, values);
      const updated = updatedRows[0];

      const workerFieldChanges = diff(
        {
          surname: oldSurname,
          name: oldName,
          middlename: oldMiddlename,
          birth_date: oldBirthDate,
        },
        { surname, name, middlename, birth_date }
      );

      Object.assign(changes, workerFieldChanges);

      if (Object.keys(changes).length) {
        await ChangeLogger.logChange({
          object_operation: 'worker',
          changed_field: changes,
        });
      }

      await client.query('COMMIT');
      return updated;
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  }

  async deleteWorker(id) {
    const query = `
            UPDATE workers
            SET deleted_at = CURRENT_TIMESTAMP
            WHERE "WorkerID" = $1 RETURNING *`;
    const { rows } = await pool.query(query, [id]);

    if (rows.length) {
      await ChangeLogger.logChange({
        object_operation: 'worker',
        changed_field: { deleted: rows[0] },
      });
    }
    return rows[0];
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

module.exports = new WorkerService();
