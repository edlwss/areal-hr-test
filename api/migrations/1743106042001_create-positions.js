exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('positions', {
    PositionID: { type: 'serial', primaryKey: true },
    name: { type: 'varchar(100)', notNull: true },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('positions');
};
