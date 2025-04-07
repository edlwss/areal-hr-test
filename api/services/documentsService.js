const pool = require('../db');

class DocumentService {
    async createDocument({ worker_ID, name, file }) {
        const query = `
            INSERT INTO documentes ("worker_ID", name, file)
            VALUES ($1, $2, $3)
            RETURNING *`;
        const { rows } = await pool.query(query, [worker_ID, name, file]);
        return rows[0];
    }

    async getDocumentsByWorkerId(worker_ID) {
        const query = `
            SELECT * FROM documentes
            WHERE "worker_ID" = $1 AND deleted_at IS NULL
            ORDER BY "DocumentID"`;
        const { rows } = await pool.query(query, [worker_ID]);
        return rows;
    }

    async softDeleteDocument(id) {
        const query = `
            UPDATE documentes SET deleted_at = NOW()
            WHERE "DocumentID" = $1
            RETURNING *`;
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }
}

module.exports = new DocumentService();
