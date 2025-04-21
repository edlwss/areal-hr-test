exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('actions', {
    ActionID: { type: 'serial', primaryKey: true },
    name: { type: 'varchar(100)', notNull: true },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('actions');
};
