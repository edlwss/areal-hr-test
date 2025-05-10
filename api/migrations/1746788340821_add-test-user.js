const argon2 = require('argon2');
require('dotenv').config();

exports.shorthands = undefined;

exports.up = async (pgm) => {
  const login = process.env.TEST_ADMIN_LOGIN;
  const rawPassword = process.env.TEST_ADMIN_PASSWORD;
  const roleId = parseInt(process.env.TEST_ADMIN_ROLE_ID, 10);

  const hashedPassword = await argon2.hash(rawPassword, {
    type: argon2.argon2id,
  });

  await pgm.db.query(
    `
        INSERT INTO users (login, password, "role_ID", surname, name)
        VALUES ($1, $2, $3, 'Admin', 'Test');
    `,
    [login, hashedPassword, roleId]
  );
};
