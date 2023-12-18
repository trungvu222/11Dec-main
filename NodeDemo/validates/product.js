const Joi = require('@hapi/joi');

const productValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(10).max(80).required(),
        description: Joi.string().min(10).max(80).required(),
        image: Joi.string().uri().required(),
        price: Joi.number().required()
    });
    return schema.validate(data);
};

module.exports = productValidation;