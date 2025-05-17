exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    INSERT INTO actions (name) VALUES ('Взять в штат');
  `);
};
