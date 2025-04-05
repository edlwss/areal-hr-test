exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('addresses', {
        AddressID: { type: 'serial', primaryKey: true },
        regin: { type: 'varchar(100)', notNull: true },
        localities: { type: 'varchar(100)', notNull: true },
        street: { type: 'varchar(100)', notNull: true },
        house: { type: 'varchar(5)', notNull: true },
        building: { type: 'varchar(5)' },
        apartment: { type: 'varchar(5)' }
    });
};

exports.down = (pgm) => {
    pgm.dropTable('addresses');
};
