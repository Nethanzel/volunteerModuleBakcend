const Joi = require('joi');

const crendentialsModel = Joi.object({
    user: Joi.string().required(),
    password: Joi.string().required()
});

const authorizeSchema = Joi.object({
    authorization: Joi.string().required().messages({
        "any.required": "Authorization header is required",
        "string.base": "Authorization header must be a string"
    })
}).unknown(true);

module.exports = {
    crendentialsModel,
    authorizeSchema
}