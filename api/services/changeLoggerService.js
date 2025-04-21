const pool = require('../db');

class ChangeLogger {
  async logChange({ object_operation, changed_field, user_ID = null }) {
    const query = `
            INSERT INTO change_history (
                date_operation, time_operation, "user_ID", object_operation, changed_field
            ) VALUES (
                         CURRENT_DATE, CURRENT_TIME, $1, $2, $3
                     )
        `;
    await pool.query(query, [user_ID, object_operation, JSON.stringify(changed_field)]);
  }

  async getAllChanges() {
    const query = `
        SELECT * FROM change_history
        ORDER BY date_operation DESC, time_operation DESC
    `;
    const { rows } = await pool.query(query);
    return rows;
  }
}

module.exports = new ChangeLogger();
