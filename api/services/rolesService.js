const pool = require('../db');

class RolesService {
  async getAllRoles() {
    const query = `SELECT * FROM roles ORDER BY "RoleID"`;
    const { rows } = await pool.query(query);
    return rows;
  }
}

module.exports = new RolesService();
