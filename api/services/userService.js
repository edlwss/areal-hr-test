const pool = require('../db');
const ChangeLogger = require('./changeLoggerService');
const bcrypt = require('bcryptjs');

class UserService {
  async createUser(data) {
    const { login, password, role_ID, surname, name, middlename } = data;

    const hashedPassword = await bcrypt.hash(password, 10); // соль на 10 раундов

    const query = `
    INSERT INTO users (login, password, "role_ID", surname, name, middlename)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
    const values = [login, hashedPassword, role_ID, surname, name, middlename];
    const { rows } = await pool.query(query, values);

    await ChangeLogger.logChange({
      object_operation: 'user',
      changed_field: { created: rows[0] },
    });

    return rows[0];
  }

  async getAllUsers() {
    const { rows } = await pool.query(`SELECT * FROM users WHERE deleted_at IS NULL`);
    return rows;
  }

  async getUserById(id) {
    const { rows } = await pool.query(
      `SELECT * FROM users WHERE "UserID" = $1 AND deleted_at IS NULL`,
      [id]
    );
    return rows[0];
  }

  async updateUser(id, data) {
    const { rows: oldRows } = await pool.query(`SELECT * FROM users WHERE "UserID" = $1`, [id]);
    const oldData = oldRows[0];
    if (!oldData) return null;

    const { role_ID, surname, name, middlename } = data;
    const query = `
            UPDATE users
            SET "role_ID" = $1,
                surname = $2, name = $3, middlename = $4,
                updated_at = CURRENT_TIMESTAMP
            WHERE "UserID" = $5 AND deleted_at IS NULL
            RETURNING *`;
    const values = [role_ID, surname, name, middlename, id];
    const { rows } = await pool.query(query, values);
    const updated = rows[0];

    const changes = diff(extractFields(oldData), extractFields(data));

    if (Object.keys(changes).length) {
      await ChangeLogger.logChange({
        object_operation: 'user',
        changed_field: changes,
      });
    }

    return updated;
  }

  async deleteUser(id) {
    const query = `
            UPDATE users
            SET deleted_at = CURRENT_TIMESTAMP
            WHERE "UserID" = $1 RETURNING *`;
    const { rows } = await pool.query(query, [id]);

    if (rows.length) {
      await ChangeLogger.logChange({
        object_operation: 'user',
        changed_field: { deleted: rows[0] },
      });
    }

    return rows[0];
  }
}

function extractFields(data) {
  return {
    role_ID: data.role_ID,
    surname: data.surname,
    name: data.name,
    middlename: data.middlename,
  };
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

module.exports = new UserService();
