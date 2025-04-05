const pool = require('../db');

class AddressService {
    async createAddress({ regin, localities, street, house, building, apartment }) {
        const query = `
            INSERT INTO addresses (regin, localities, street, house, building, apartment)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`;
        const { rows } = await pool.query(query, [regin, localities, street, house, building, apartment]);
        return rows[0];
    }

    async getAddressById(id) {
        const query = `SELECT * FROM addresses WHERE "AddressID" = $1`;
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }

    async updateAddress(id, { regin, localities, street, house, building, apartment }) {
        const query = `
            UPDATE addresses SET regin = $1, localities = $2, street = $3,
            house = $4, building = $5, apartment = $6
            WHERE "AddressID" = $7 RETURNING *`;
        const { rows } = await pool.query(query, [regin, localities, street, house, building, apartment, id]);
        return rows[0];
    }

    async deleteAddress(id) {
        const query = `DELETE FROM addresses WHERE "AddressID" = $1 RETURNING *`;
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }
}

module.exports = new AddressService();
