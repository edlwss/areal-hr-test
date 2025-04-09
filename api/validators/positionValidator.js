const Joi = require('joi');

const positionSchema = Joi.object({
    name: Joi.string()
        .max(100)
        .required()
        .empty('')
        .messages({
            'string.empty': 'Название должности не должно быть пустым',
            'string.max': 'Название должности не должно превышать 100 символов',
            'any.required': 'Название должности обязательно'
        })
}).unknown(true);

module.exports = {
    createPositionSchema: positionSchema,
    updatePositionSchema: positionSchema
};
