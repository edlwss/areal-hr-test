const pool = require('../db');

class AddressService {
  async createAddress({ regin, localities, street, house, building, apartment }, clint) {
    const query = `
            INSERT INTO addresses (regin, localities, street, house, building, apartment)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`;
    const { rows } = await clint.query(query, [
      regin,
      localities,
      street,
      house,
      building,
      apartment,
    ]);
    return rows[0];
  }

  async updateAddress( id, newData , client) {
    const selectQuery = `SELECT * FROM addresses WHERE "AddressID" = $1`;
    const oldRow = (await pool.query(selectQuery, [id])).rows[0];

    const query = `
            UPDATE addresses SET regin = $1, localities = $2, street = $3,
            house = $4, building = $5, apartment = $6
            WHERE "AddressID" = $7 RETURNING *`;
    const values = [
      newData.regin,
      newData.localities,
      newData.street,
      newData.house,
      newData.building,
      newData.apartment,
      id,
    ];
    const { rows } = await client.query(query, values);

    const changes = diff(oldRow, rows[0]);

    return { updated: rows[0], changes };
  }
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

module.exports = new AddressService();
