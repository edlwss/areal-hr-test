exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('workers', {
    WorkerID: { type: 'serial', primaryKey: true },
    surname: { type: 'varchar(100)', notNull: true },
    name: { type: 'varchar(100)', notNull: true },
    middlename: { type: 'varchar(100)' },
    birth_date: { type: 'date', notNull: true },
    passport_data_ID: {
      type: 'int',
      notNull: true,
      references: '"passport_data"',
      onDelete: 'cascade',
    },
    address_ID: {
      type: 'int',
      notNull: true,
      references: '"addresses"',
      onDelete: 'cascade',
    },
    created_at: { type: 'timestamp', default: pgm.func('CURRENT_TIMESTAMP') },
    updated_at: { type: 'timestamp', default: pgm.func('CURRENT_TIMESTAMP') },
    deleted_at: { type: 'timestamp' },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('workers');
};
