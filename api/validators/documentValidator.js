const Joi = require('joi');

const baseDocumentSchema = {

    name: Joi.string()
        .max(100)
        .required()
        .messages({
            'any.required': 'Название документа обязательно',
            'string.empty': 'Название документа не должно быть пустым',
            'string.max': 'Название документа не должно превышать 100 символов',
        })
};

const createDocumentSchema = Joi.object(baseDocumentSchema);

module.exports = {
    createDocumentSchema
};
