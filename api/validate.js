module.exports = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            message: 'Ошибка валидации',
            details: error.details.map((d) => d.message),
        });
    }

    next();
};
