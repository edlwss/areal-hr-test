const Joi = require('joi');

const passportSchema = Joi.object({
    passport_series: Joi.string()
        .pattern(/^\d{4}$/)
        .required()
        .messages({
            'string.empty': 'Серия паспорта обязательна',
            'string.pattern.base': 'Серия паспорта должна содержать ровно 4 цифры'
        }),

    passport_number: Joi.string()
        .pattern(/^\d{6}$/)
        .required()
        .messages({
            'string.empty': 'Номер паспорта обязателен',
            'string.pattern.base': 'Номер паспорта должен содержать ровно 6 цифр'
        }),

    data_of_issue: Joi.date()
        .iso()
        .required()
        .messages({
            'date.base': 'Дата выдачи должна быть датой',
            'any.required': 'Дата выдачи обязательна'
        }),

    unit_code: Joi.string()
        .length(6)
        .required()
        .messages({
            'string.empty': 'Код подразделения обязателен',
            'string.length': 'Код подразделения должен быть ровно 6 символов'
        }),

    issued_by_whom: Joi.string()
        .max(200)
        .required()
        .messages({
            'string.empty': 'Кем выдан обязательно',
            'string.max': 'Поле "Кем выдан" не должно превышать 200 символов'
        }),
});

const addressSchema = Joi.object({
    regin: Joi.string().max(100).required().messages({
        'string.empty': 'Регион обязателен',
        'string.max': 'Регион не должен превышать 100 символов'
    }),
    localities: Joi.string().max(100).required().messages({
        'string.empty': 'Населённый пункт обязателен',
        'string.max': 'Населённый пункт не должен превышать 100 символов'
    }),
    street: Joi.string().max(100).required().messages({
        'string.empty': 'Улица обязательна',
        'string.max': 'Улица не должна превышать 100 символов'
    }),
    house: Joi.string().max(10).required().messages({
        'string.empty': 'Номер дома обязателен',
        'string.max': 'Номер дома не должен превышать 10 символов'
    }),
    building: Joi.string().max(10).optional(),
    apartment: Joi.string().max(10).optional()
});

const createWorkerSchema = Joi.object({
    surname: Joi.string().max(100).required().messages({
        'string.empty': 'Фамилия обязательна',
        'string.max': 'Фамилия не должна превышать 100 символов'
    }),
    name: Joi.string().max(100).required().messages({
        'string.empty': 'Имя обязательно',
        'string.max': 'Имя не должно превышать 100 символов'
    }),
    middlename: Joi.string().max(100).optional(),

    birth_date: Joi.date()
        .min('1900-01-01')
        .max(new Date())
        .required()
        .messages({
            'date.base': 'Дата рождения должна быть корректной датой',
            'date.min': 'Дата рождения не может быть раньше 1900 года',
            'date.max': 'Дата рождения не может быть в будущем',
            'any.required': 'Дата рождения обязательна'
        }),

    passport: passportSchema.required(),
    address: addressSchema.required()
}).unknown(true);

const updateWorkerSchema = Joi.object({
    surname: Joi.string().max(100).messages({
        'string.max': 'Фамилия не должна превышать 100 символов'
    }),
    name: Joi.string().max(100).messages({
        'string.max': 'Имя не должно превышать 100 символов'
    }),
    middlename: Joi.string().max(100),

    birth_date: Joi.date()
        .min('1900-01-01')
        .max(new Date())
        .messages({
            'date.base': 'Дата рождения должна быть корректной датой',
            'date.min': 'Дата рождения не может быть раньше 1900 года',
            'date.max': 'Дата рождения не может быть в будущем'
        }),

    passport: passportSchema,
    address: addressSchema
}).unknown(true);

module.exports = {
    createWorkerSchema,
    updateWorkerSchema
};
