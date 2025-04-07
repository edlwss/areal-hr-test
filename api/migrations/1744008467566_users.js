exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('users', {
        UserID: { type: 'serial', primaryKey: true },
        login: { type: 'varchar(50)', notNull: true },
        password: { type: 'varchar(50)', notNull: true },
        role_ID: {
            type: 'int',
            notNull: true,
            references: 'roles',
            onDelete: 'cascade'
        },
        surname: { type: 'varchar(100)', notNull: true },
        name: { type: 'varchar(100)', notNull: true },
        middlename: { type: 'varchar(100)' },
        deleted_at: { type: 'timestamp' },
        updated_at: { type: 'timestamp', default: pgm.func('CURRENT_TIMESTAMP') },
        created_at: { type: 'timestamp', default: pgm.func('CURRENT_TIMESTAMP') }
    });
};

exports.down = (pgm) => {
    pgm.dropTable('users');
};
