const Joi = require('joi');

const tipomiembroMV = Joi.object({
    tipo: Joi.string().required(),
    descripcion: Joi.string().required()
});

const gradoMV = Joi.object({
    grado: Joi.string().required(),
    descripcion: Joi.string().optional().allow("", null),
    color: Joi.string().required(),
    prefix: Joi.string().required()
});

const escuelaMV = Joi.object({
    nombre: Joi.string().required(),
    provincia: Joi.number().required(),
    municipio: Joi.number().required(),
    lat: Joi.number().required().allow("", null),
    lng: Joi.number().required().allow("", null),
    liderId: Joi.number().required().allow("", null)
});

const miembroMV = Joi.object({
    step_1: Joi.object().keys({
        escuela: Joi.number().required()
    }).optional(),
    step_2: Joi.object().keys({
        telefono: Joi.string().pattern(/^(?:\+?\d{1,3})?\s?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/).allow(""),
        celular: Joi.string().pattern(/^(?:\+?\d{1,3})?\s?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/).optional().allow(""),
        email: Joi.string().email().optional().allow("", null),
        municipio: Joi.number().required(),
        sector: Joi.string().required(),
        calle: Joi.string().optional().allow(null, ""),
        casa_no: Joi.string().optional().allow(null, ""),
        apartamento: Joi.string().optional().allow(null, ""),
        identity: Joi.string().optional().allow(null, ""),
        nombre: Joi.string().required(),
        apellido: Joi.string().required(),
        nacimientolugar: Joi.number().optional().allow(null, ""),
        nacimientofecha: Joi.date().iso().required(),
        ocupacion: Joi.string().optional().allow("", null),
        peso: Joi.number().optional().allow("", null),
        estatura: Joi.number().optional().allow("", null),
        tutorInfo: Joi.array().items(Joi.object({
            name: Joi.string().required(),
            relation: Joi.string().required(),
            phone: Joi.string().required(),
            otherPhone: Joi.string().optional().allow("", null),
        })).allow(null),

    }).required(),
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
    }).required(),
    step_4: Joi.object().keys({
        grado: Joi.number().required(),
        tipoMiembro: Joi.number().required(),
        identificacion: Joi.boolean().required().allow(null),
        identificacionDetails: Joi.string().optional().allow(null,""),
        otherMartialArt: Joi.boolean().required().allow(null),
        otherMartialArtDetails: Joi.string().optional().allow(null,""),
        desire: Joi.string().optional().allow(null,""),
        interested: Joi.number().required().allow(null),
    }).required(),
    step_5: Joi.object().keys({
        image: Joi.object().keys({
            ext: Joi.string().required(),
            contentType: Joi.string().required(),
            file: Joi.array().items(Joi.number().min(0).max(255)).required()
        }).optional().allow(null)
    }).required(),
    step_7: Joi.object().keys({
        hasSchool: Joi.boolean().required(),
        schools: Joi.array().items(Joi.object({
            nombre: Joi.string().required(),
            provincia: Joi.number().required(),
            municipio: Joi.number().required()
        })).optional()
    })
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
});

const validateHighlighy = Joi.object().keys({
    title: Joi.string().required(),
    comment: Joi.string().required(),
    image: Joi.string().required(),
});

const validateSchedule = Joi.object().keys({
    dayOfWeek: Joi.number().required(),
    profesorId: Joi.number().required(),
    startHour: Joi.string().required(),
    endHour: Joi.string().required(),
    escuelaId: Joi.number().required()
});

const validatePractica = Joi.object().keys({
    dayOfWeek: Joi.number().required().allow(null, ""),
    startHour: Joi.string().required().allow(null, ""),
    endHour: Joi.string().required().allow(null, ""),
    fecha: Joi.date().iso().required(),
    profesorId: Joi.number().required().allow(null, ""),
    escuelaId: Joi.number().required().allow(null, ""),
    scheduleId: Joi.number().required().allow(null),
    comment: Joi.string().required().allow(null, ""),
    atendance: Joi.array().items(Joi.number()).required()
});

const validateAtendant = Joi.object().keys({
    miembroId: Joi.number().required(),
    practicaId: Joi.number().required(),
});

module.exports = {
    tipomiembroMV,
    gradoMV,
    escuelaMV,
    miembroMV,
    uploadSchema,
    fileSchema,
    validateEmail,
    validateHighlighy,
    validateSchedule,
    validatePractica,
    validateAtendant
}