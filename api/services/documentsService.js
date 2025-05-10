const pool = require('../db');
const ChangeLogger = require('./changeLoggerService');

class DocumentService {
  async createDocument({ worker_ID, name, file }) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const insertQuery = `
        INSERT INTO documentes ("worker_ID", name, file)
        VALUES ($1, $2, $3)
        RETURNING *`;
      const { rows } = await client.query(insertQuery, [worker_ID, name, file]);

      await ChangeLogger.logChange(
        {
          object_operation: 'document',
          changed_field: { created: rows[0] },
        },
        client
      );

      await client.query('COMMIT');
      return rows[0];
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  }

  async getDocumentsByWorkerId(worker_ID) {
    const query = `SELECT * FROM documentes WHERE "worker_ID" = $1 AND deleted_at IS NULL ORDER BY "DocumentID"`;
    const { rows } = await pool.query(query, [worker_ID]);
    return rows;
  }

  async softDeleteDocument(id) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const query = `
        UPDATE documentes SET deleted_at = NOW()
        WHERE "DocumentID" = $1
        RETURNING *`;
      const { rows } = await client.query(query, [id]);

      if (rows.length) {
        await ChangeLogger.logChange(
          {
            object_operation: 'document',
            changed_field: { deleted: rows[0] },
          },
          client
        );
      }

      await client.query('COMMIT');
      return rows[0];
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  }
}

module.exports = new DocumentService();
