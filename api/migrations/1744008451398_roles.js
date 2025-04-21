exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('roles', {
    RoleID: { type: 'serial', primaryKey: true },
    name: { type: 'varchar(50)', notNull: true },
  });

  pgm.sql(`
        INSERT INTO roles (name)
        VALUES ('Администратор'), ('Менеджер по персоналу')
    `);
};

exports.down = (pgm) => {
  pgm.dropTable('roles');
};
