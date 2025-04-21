exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.alterColumn('hr_operations', 'salary', { notNull: false });
  pgm.alterColumn('hr_operations', 'department_ID', { notNull: false });
  pgm.alterColumn('hr_operations', 'position_ID', { notNull: false });
};

exports.down = (pgm) => {
  pgm.alterColumn('hr_operations', 'salary', { notNull: true });
  pgm.alterColumn('hr_operations', 'department_ID', { notNull: true });
  pgm.alterColumn('hr_operations', 'position_ID', { notNull: true });
};
