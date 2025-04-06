exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('documentes', {
        DocumentID: { type: 'serial', primaryKey: true },
        worker_ID: {
            type: 'int',
            notNull: true,
            references: 'workers',
            onDelete: 'cascade'
        },
        name: { type: 'varchar(100)', notNull: true },
        file: { type: 'varchar(100)', notNull: true },
        created_at: { type: 'timestamp', default: pgm.func('CURRENT_TIMESTAMP') },
        updated_at: { type: 'timestamp', default: pgm.func('CURRENT_TIMESTAMP') },
        deleted_at: { type: 'timestamp' }
    });
};

exports.down = (pgm) => {
    pgm.dropTable('documentes');
};
