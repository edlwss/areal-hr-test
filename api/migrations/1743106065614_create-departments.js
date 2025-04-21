exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('departments', {
    DepartmentID: { type: 'serial', primaryKey: true },
    organization_ID: {
      type: 'int',
      notNull: true,
      references: 'organizations',
    },
    parent_ID: { type: 'int', references: 'departments' },
    name: { type: 'varchar(100)', notNull: true },
    comment: { type: 'varchar(200)' },
    created_at: { type: 'timestamp', default: pgm.func('CURRENT_TIMESTAMP') },
    updated_at: { type: 'timestamp', default: pgm.func('CURRENT_TIMESTAMP') },
    deleted_at: { type: 'timestamp', notNull: false },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('departments');
};
