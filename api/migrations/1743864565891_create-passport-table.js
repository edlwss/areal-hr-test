exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('passport_data', {
        PassportDataID: { type: 'serial', primaryKey: true },
        passport_series: { type: 'varchar(4)', notNull: true },
        passport_number: { type: 'varchar(6)', notNull: true },
        data_of_issue: { type: 'date', notNull: true },
        unit_code: { type: 'varchar(10)', notNull: true },
        issued_by_whom: { type: 'varchar(200)', notNull: true }
    });
};

exports.down = (pgm) => {
    pgm.dropTable('passport_data');
};
