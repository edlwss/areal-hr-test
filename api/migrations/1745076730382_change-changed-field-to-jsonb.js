exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.alterColumn('change_history', 'changed_field', {
        type: 'jsonb',
        using: 'changed_field::jsonb'
    });
};

exports.down = (pgm) => {
    pgm.alterColumn('change_history', 'changed_field', {
        type: 'varchar(200)',
        using: 'changed_field::text'
    });
};
