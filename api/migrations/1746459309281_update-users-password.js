exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.alterColumn('users', 'password', {
    type: 'varchar(200)',
    notNull: true,
  });
};
