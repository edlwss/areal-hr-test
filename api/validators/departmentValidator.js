const Joi = require('joi');

const departmentBaseSchema = {
    organization_ID: Joi.number()
        .required()
        .messages({
            'any.required': 'ID организации обязателен'
        }),

    name: Joi.string()
        .max(100)
        .required()
        .messages({
            'any.required': 'Название отдела обязательно',
            'string.empty': 'Название отдела не должно быть пустым',
            'string.max': 'Название отдела не должно превышать 100 символов',
        }),

    comment: Joi.string()
        .max(200)
        .allow('', null)
        .messages({
            'string.max': 'Комментарий не должен превышать 200 символов',
        })
};

const createDepartmentSchema = Joi.object(departmentBaseSchema);

const updateDepartmentSchema = Joi.object({
    ...departmentBaseSchema
});

module.exports = {
    createDepartmentSchema,
    updateDepartmentSchema
};
