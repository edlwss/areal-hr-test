exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('change_history', {
    ChangeHistoryID: { type: 'serial', primaryKey: true },
    date_operation: { type: 'date', notNull: true },
    time_operation: { type: 'time', notNull: true },
    user_ID: {
      type: 'int',
      notNull: true,
      references: 'users',
      onDelete: 'cascade',
    },
    object_operation: { type: 'varchar(100)', notNull: true },
    changed_field: { type: 'varchar(200)', notNull: true },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('change_history');
};
