const Joi = require('joi');

const queryById = Joi.object({
    id: Joi.number().required()
});

const memberQueryFilters = Joi.object({
    identity: Joi.object({
        description: Joi.object({
            display: Joi.string().required(),
            value: Joi.string().required(),
        }).required(),
        value: Joi.string().required(),
        type: Joi.string().required(),
    }).optional(),
    referenceCode: Joi.object({
        description: Joi.object({
            display: Joi.string().required(),
            value: Joi.string().required(),
        }).required(),
        value: Joi.string().required(),
        type: Joi.string().required(),
    }).optional(),
    nombre: Joi.object({
        description: Joi.object({
            display: Joi.string().required(),
            value: Joi.string().required(),
        }).required(),
        value: Joi.string().required(),
        type: Joi.string().required(),
    }).optional(),
    apellido: Joi.object({
        description: Joi.object({
            display: Joi.string().required(),
            value: Joi.string().required(),
        }).required(),
        value: Joi.string().required(),
        type: Joi.string().required(),
    }).optional(),
    escuelaId: Joi.object({
        description: Joi.object({
            display: Joi.string().required(),
            value: Joi.string().required(),
        }).required(),
        value: Joi.number().required(),
        type: Joi.string().required(),
    }).optional(),
    GradoId: Joi.object({
        description: Joi.object({
            display: Joi.string().required(),
            value: Joi.string().required(),
        }).required(),
        value: Joi.number().required(),
        type: Joi.string().required(),
    }).optional(),
    TipoMiembroId: Joi.object({
        description: Joi.object({
            display: Joi.string().required(),
            value: Joi.string().required(),
        }).required(),
        value: Joi.number().required(),
        type: Joi.string().required(),
    }).optional(),
    interested: Joi.object({
        description: Joi.object({
            display: Joi.string().required(),
            value: Joi.string().required(),
        }).required(),
        value: Joi.number().required(),
        type: Joi.string().required(),
    }).optional(),
    genero: Joi.object({
        description: Joi.object({
            display: Joi.string().required(),
            value: Joi.string().required(),
        }).required(),
        value: Joi.string().max(1).required(),
        type: Joi.string().required(),
    }).optional(),

    peso: Joi.object({
        description: Joi.object({
            display: Joi.string().required(),
            value: Joi.string().required(),
        }).required(),
        value: Joi.array().items(Joi.number().required()),
        type: Joi.string().required(),
    }).optional(),
    altura: Joi.object({
        description: Joi.object({
            display: Joi.string().required(),
            value: Joi.string().required(),
        }).required(),
        value: Joi.array().items(Joi.number().required()),
        type: Joi.string().required(),
    }).optional(),
    nacimiento: Joi.object({
        description: Joi.object({
            display: Joi.string().required(),
            value: Joi.string().required(),
        }).required(),
        value: Joi.array().items(Joi.date().iso().required()),
        type: Joi.string().required(),
    }).optional(),

    checked: Joi.object({
        description: Joi.object({
            display: Joi.string().required(),
            value: Joi.string().required(),
        }).required(),
        value: Joi.boolean().required(),
        type: Joi.string().required(),
    }).optional(),
    deleted: Joi.object({
        description: Joi.object({
            display: Joi.string().required(),
            value: Joi.string().required(),
        }).required(),
        value: Joi.boolean().required(),
        type: Joi.string().required(),
    }).optional(),
});

const queryByPageNumber = Joi.object({
    page: Joi.number().required(),
    filters: Joi.string().optional()
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
    memberQueryFilters,
    queryIdentity,
    queryById,
    queryByIdAndPage,
    queryMemberCode
}