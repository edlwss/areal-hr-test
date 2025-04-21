exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    INSERT INTO actions (name) VALUES
    ('Изменение зарплаты'),
    ('Изменение отдела'),
    ('Увольнение с работы');
  `);
};
