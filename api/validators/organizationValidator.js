const Joi = require('joi');

const organizationCreateSchema = Joi.object({
  name: Joi.string().max(100).required().messages({
    'string.empty': 'Название организации обязательно',
    'string.max': 'Название организации не должно превышать 100 символов',
    'any.required': 'Название организации обязательно',
  }),
  comment: Joi.string().max(200).allow('').optional().messages({
    'string.max': 'Комментарий не должен превышать 200 символов',
  }),
}).unknown(true);

const organizationUpdateSchema = Joi.object({
  name: Joi.string().max(100).messages({
    'string.max': 'Название организации не должно превышать 100 символов',
  }),
  comment: Joi.string().max(200).allow('').messages({
    'string.max': 'Комментарий не должен превышать 200 символов',
  }),
}).unknown(true);

module.exports = {
  organizationCreateSchema,
  organizationUpdateSchema,
};
