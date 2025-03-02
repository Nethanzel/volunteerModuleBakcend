const Joi = require('joi');

const tipoVoluntarioMV = Joi.object({
    tipo: Joi.string().required(),
    descripcion: Joi.string().required()
});

const departamentoMV = Joi.object({
    departamento: Joi.string().required(),
    descripcion: Joi.string().required()
});

const estacionMV = Joi.object({
    numero: Joi.number().required(),
    provincia: Joi.number().required(),
    municipio: Joi.number().required(),
});

const voluntarioMV = Joi.object({
    step_1: Joi.object().keys({
        estacion: Joi.number().required()
    }),
    step_2: Joi.object().keys({
        telefono: Joi.string().pattern(/^(?:\+?\d{1,3})?\s?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/).allow(""),
        celular: Joi.string().pattern(/^(?:\+?\d{1,3})?\s?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/).required(),
        email: Joi.string().email().required(),
        provincia: Joi.number().required(),
        sector: Joi.string().required(),
        calle: Joi.string().optional().allow(null, ""),
        casa_no: Joi.string().optional().allow(null, ""),
        identity: Joi.string().required().allow(null, ""),
        nombre: Joi.string().required(),
        apellido: Joi.string().required(),
        nacimientolugar: Joi.number().optional().allow(null, ""),
        nacimientofecha: Joi.date().iso().required(),
        nacionalidad: Joi.string().required(),
        ecivil: Joi.string().optional().allow(null, "")
    }),
    step_3: Joi.object().keys({
        study: Joi.array().items(Joi.object({
            age: Joi.number().required(),
            grade: Joi.string().required(),
            place: Joi.string().required()
        })),
        languages: Joi.array().items(Joi.string()).min(1).required(),
        otherLanguage: Joi.string().optional().allow(null, ""),
    }),
    step_4: Joi.object().keys({
        bloodType: Joi.string().required(),
        desease: Joi.object().keys({
            state: Joi.boolean().required(),
            contents: Joi.string().optional().allow(null, "")
        }),
        medicine: Joi.object().keys({
            state: Joi.boolean().required(),
            contents: Joi.string().optional().allow(null, "")
        }),
        emergencyContacts: Joi.array().items(Joi.object({
            name: Joi.string().required(),
            phone: Joi.string().pattern(/^(?:\+?\d{1,3})?\s?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/).required(),
            relation: Joi.string().required(),
        })),
    }),
    step_5: Joi.object().keys({
        departamento: Joi.number().required(),
        tipoVoluntario: Joi.number().required(),
        identificacion: Joi.boolean().required(),
        identificacionDetails: Joi.string().optional().allow("", null),
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
    tipoVoluntarioMV,
    departamentoMV,
    estacionMV,
    voluntarioMV,
    uploadSchema,
    fileSchema,
    validateEmail
}