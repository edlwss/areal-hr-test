exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('hr_operations', {
    HrOperationID: { type: 'serial', primaryKey: true },
    worker_ID: {
      type: 'int',
      notNull: true,
      references: 'workers',
      onDelete: 'cascade',
    },
    actionID: {
      type: 'int',
      notNull: true,
      references: 'actions',
      onDelete: 'restrict',
    },
    position_ID: {
      type: 'int',
      notNull: true,
      references: 'positions',
      onDelete: 'restrict',
    },
    department_ID: {
      type: 'int',
      notNull: true,
      references: 'departments',
      onDelete: 'restrict',
    },
    salary: { type: 'decimal(10,2)', notNull: true },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('hr_operations');
};
