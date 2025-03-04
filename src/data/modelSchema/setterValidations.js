const Joi = require('joi');

const allowAccesValidation = Joi.object({
    field: Joi.object().keys({
        allowAccess: Joi.boolean().required()
    }),
    id: Joi.number().required()
});

const permissionOpValidation = Joi.object({
    key: Joi.string().required(),
    id: Joi.number().required()
});

const userFieldValidation = Joi.object({
    id: Joi.number().required(),
    field: Joi.object().keys({
        alergia: Joi.boolean().optional(),
        alergiaDetalles: Joi.string().optional(),
        enfermedad: Joi.boolean().optional(),
        enfermedadDetalles: Joi.string().optional(),
        identity: Joi.string().max(13).optional(),
        nombre: Joi.string().optional(),
        apellido: Joi.string().optional(),
        nacionalidad: Joi.string().optional(),
        lugarNacimiento: Joi.number().optional(),
        nacimiento: Joi.date().iso().optional(),
        municipio: Joi.number().optional(),
        sector: Joi.string().optional(),
        calle: Joi.string().optional(),
        casa: Joi.number().optional(),
        apartamento: Joi.string().optional(),
        correo: Joi.string().optional(),
        celular: Joi.string().optional(),
        telefonoFijo: Joi.string().optional(),
        idiomas: Joi.string().optional(),
        otherLanguaje: Joi.string().optional(),
        escuela: Joi.number().optional(),
        grado: Joi.number().optional(),
        tipomiembro: Joi.number().optional(),
        hasIdentification: Joi.boolean().optional(),
        idetifications: Joi.string().optional(),
        assurance: Joi.boolean().optional(),
        assuranceCompany: Joi.string().optional(),
        assuranceCode: Joi.string().optional(),
        ocupacion: Joi.string().optional(),
        peso: Joi.number().optional(),
        altura: Joi.number().optional(),
        escuelaId: Joi.number().optional(),
        GradoId: Joi.number().optional(),
        TipoMiembroId: Joi.number().optional(),
        interested: Joi.number().optional(),
        otherMartialArt: Joi.boolean().optional(),
        desire: Joi.string().optional(),
    }).required()
});

const contactValidation = Joi.object({
    record: Joi.object().keys({
        name: Joi.string().required(),
        relation: Joi.string().required(),
        phone: Joi.string().required()
    }).required(),
    id: Joi.number().required()
});

const academicPrepValidation = Joi.object({
    record: Joi.object().keys({
        grade: Joi.string().required(),
        place: Joi.string().required(),
        age: Joi.string().required()
    }).required(),
    id: Joi.number().required()
});

const schoolFieldValidation = Joi.object({
    field: Joi.object().keys({
        nombre: Joi.string().optional(),
        provincia: Joi.number().optional(),
        municipio: Joi.number().optional(),
        lat: Joi.number().optional(),
        lng: Joi.number().optional(),
        liderId: Joi.number().optional()
    }),
    id: Joi.number().required()
});

const levelFieldValidation = Joi.object({
    field: Joi.object().keys({
        grado: Joi.string().optional(),
        descripcion: Joi.string().optional().allow("", null),
        color: Joi.string().optional(),
        prefix: Joi.string().optional().allow("", null)
    }),
    id: Joi.number().required()
});

const userTypeFieldValidation = Joi.object({
    field: Joi.object().keys({
        tipo: Joi.string().optional(),
        descripcion: Joi.string().optional(),
    }),
    id: Joi.number().required()
});

const fileFieldValidation = Joi.object({
    field: Joi.object().keys({
        fileName: Joi.string().optional(),
    }),
    id: Joi.number().required()
});

const userStatusFieldValidation = Joi.object({
    field: Joi.object().keys({
        deleted: Joi.boolean().optional(),
        checked: Joi.boolean().optional()
    }),
    id: Joi.number().required()
});

module.exports = {
    allowAccesValidation,
    permissionOpValidation,
    userFieldValidation,
    contactValidation,
    academicPrepValidation,
    schoolFieldValidation,
    levelFieldValidation,
    userTypeFieldValidation,
    fileFieldValidation,
    userStatusFieldValidation
}