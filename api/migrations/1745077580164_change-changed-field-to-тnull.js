exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.alterColumn('change_history', 'user_ID', {
    notNull: false,
  });
};
