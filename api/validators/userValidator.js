const Joi = require('joi');

const baseFields = {
  login: Joi.string().min(4).max(50).required().messages({
    'string.empty': 'Логин обязателен',
    'string.min': 'Логин должен содержать не менее 4 символов',
    'string.max': 'Логин не должен превышать 50 символов',
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'Пароль обязателен',
    'string.min': 'Пароль должен содержать не менее 6 символов',
  }),
  surname: Joi.string().max(50).required().messages({
    'string.empty': 'Фамилия обязательна',
    'string.max': 'Фамилия не должна превышать 50 символов',
  }),
  name: Joi.string().max(50).required().messages({
    'string.empty': 'Имя обязательно',
    'string.max': 'Имя не должно превышать 50 символов',
  }),
  middlename: Joi.string().allow('', null).max(50).messages({
    'string.max': 'Отчество не должно превышать 50 символов',
  }),
  role_ID: Joi.required().messages({
    'any.required': 'Роль обязательна',
  }),
};

const userCreateSchema = Joi.object({
  login: baseFields.login,
  password: baseFields.password,
  surname: baseFields.surname,
  name: baseFields.name,
  middlename: baseFields.middlename,
  role_ID: baseFields.role_ID,
}).unknown(true);

const userUpdateSchema = Joi.object({
  login: baseFields.login,
  password: baseFields.password,
  surname: baseFields.surname,
  name: baseFields.name,
  middlename: baseFields.middlename,
  role_ID: baseFields.role_ID,
}).unknown(true);

module.exports = {
  userCreateSchema,
  userUpdateSchema,
};
