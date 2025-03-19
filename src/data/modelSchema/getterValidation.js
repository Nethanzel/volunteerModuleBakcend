const Joi = require('joi');

const queryById = Joi.object({
    id: Joi.number().required()
});

const queryByPageNumber = Joi.object({
    page: Joi.number().required()
});

const queryIdentity = Joi.object({
    identity: Joi.string().optional(),
    email: Joi.string().optional()
});

const queryByIdAndPage = Joi.object({
    id: Joi.number().required(),
    page: Joi.number().optional(),
    shorten: Joi.boolean().optional(),
});

const queryMemberCode = Joi.object({
    'member-code': Joi.string().optional(),
});

module.exports = {
    queryByPageNumber,
    queryIdentity,
    queryById,
    queryByIdAndPage,
    queryMemberCode
}