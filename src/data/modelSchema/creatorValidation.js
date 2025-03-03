const Joi = require('joi');

const tipomiembroMV = Joi.object({
    tipo: Joi.string().required(),
    descripcion: Joi.string().required()
});

const gradoMV = Joi.object({
    grado: Joi.string().required(),
    descripcion: Joi.string().required()
});

const escuelaMV = Joi.object({
    numero: Joi.number().required(),
    provincia: Joi.number().required(),
    municipio: Joi.number().required(),
});

const miembroMV = Joi.object({
    step_1: Joi.object().keys({
        escuela: Joi.number().required()
    }),
    step_2: Joi.object().keys({
        telefono: Joi.string().pattern(/^(?:\+?\d{1,3})?\s?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/).allow(""),
        celular: Joi.string().pattern(/^(?:\+?\d{1,3})?\s?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/).required(),
        email: Joi.string().email().required(),
        municipio: Joi.number().required(),
        sector: Joi.string().required(),
        calle: Joi.string().optional().allow(null, ""),
        casa_no: Joi.string().optional().allow(null, ""),
        apartamento: Joi.string().optional().allow(null, ""),
        identity: Joi.string().required().allow(null, ""),
        nombre: Joi.string().required(),
        apellido: Joi.string().required(),
        nacimientolugar: Joi.number().optional().allow(null, ""),
        nacimientofecha: Joi.date().iso().required(),
        ocupacion: Joi.string().required().allow("", null),
        ecivil: Joi.string().optional().allow(null, ""),
        peso: Joi.number().required(),
        estatura: Joi.number().required(),
        tutorInfo: Joi.array().items(Joi.object({
            name: Joi.string().required(),
            relation: Joi.string().required(),
            phone: Joi.string().required(),
            otherPhone: Joi.string().optional().allow("", null),
        })).allow(null),

    }),
    step_3: Joi.object().keys({
        desease: Joi.object().keys({
            state: Joi.boolean().required(),
            contents: Joi.string().optional().allow(null, "")
        }),
        medicine: Joi.object().keys({
            state: Joi.boolean().required(),
            contents: Joi.string().optional().allow(null, "")
        }),
        assurance: Joi.object().keys({
            state: Joi.boolean().required(),
            company: Joi.string().optional().allow(null, ""),
            code: Joi.string().optional().allow(null, "")
        }),
        emergencyContacts: Joi.array().items(Joi.object({
            name: Joi.string().required(),
            phone: Joi.string().pattern(/^(?:\+?\d{1,3})?\s?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/).required(),
            relation: Joi.string().required(),
        })),
    }),
    step_4: Joi.object().keys({
        grado: Joi.number().required(),
        tipoMiembro: Joi.number().required(),
        identificacion: Joi.boolean().required(),
        identificacionDetails: Joi.string().optional().allow(null,""),
        otherMartialArt: Joi.boolean().required(),
        otherMartialArtDetails: Joi.string().optional().allow(null,""),
        desire: Joi.string().optional().allow(null,""),
        interested: Joi.number().required(),
    }),
    step_5: Joi.object().keys({
        image: Joi.object().keys({
            ext: Joi.string().required(),
            contentType: Joi.string().required(),
            file: Joi.array().items(Joi.number().min(0).max(255)).required()
        }).optional().allow(null)
    }),
});

const uploadSchema = Joi.object({
  file: Joi.any().required().messages({ "any.required": "Debe agregar al menos un archivo." }),
});

const fileSchema = Joi.object().keys({
    contentType: Joi.string().required(),
    identity: Joi.number().required(),
    fileName: Joi.string().required(),
    ext: Joi.string().required(),
})

const validateEmail = Joi.object().keys({
    email: Joi.string().email().required(),
})

module.exports = {
    tipomiembroMV,
    gradoMV,
    escuelaMV,
    miembroMV,
    uploadSchema,
    fileSchema,
    validateEmail
}