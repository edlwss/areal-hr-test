module.exports = function validate(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (!error) {
            return next();
        }

        const formattedErrors = error.details.map(err => ({
            field: err.context.key,
            message: err.message
        }));

        return res.status(400).json({ errors: formattedErrors });
    };
};

