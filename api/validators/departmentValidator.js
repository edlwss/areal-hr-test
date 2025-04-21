const Joi = require('joi');

const baseFields = {
  organization_ID: Joi.number().messages({
    'number.base': 'ID организации должен быть числом',
    'any.required': 'ID организации обязателен',
  }),

  name: Joi.string().max(100).messages({
    'string.empty': 'Название отдела не должно быть пустым',
    'string.max': 'Название отдела не должно превышать 100 символов',
    'any.required': 'Название отдела обязательно',
  }),

  comment: Joi.string().max(200).allow('', null).messages({
    'string.max': 'Комментарий не должен превышать 200 символов',
  }),
};

const createDepartmentSchema = Joi.object({
  organization_ID: baseFields.organization_ID.required(),
  name: baseFields.name.required(),
  comment: baseFields.comment,
}).unknown(true);

const updateDepartmentSchema = Joi.object({
  organization_ID: baseFields.organization_ID,
  name: baseFields.name,
  comment: baseFields.comment,
}).unknown(true);

module.exports = {
  createDepartmentSchema,
  updateDepartmentSchema,
};
