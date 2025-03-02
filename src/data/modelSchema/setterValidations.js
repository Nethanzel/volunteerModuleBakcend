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
        sangre: Joi.string().optional(),
        alergia: Joi.boolean().optional(),
        alergiaDetalles: Joi.string().optional(),
        enfermedad: Joi.boolean().optional(),
        enfermedadDetalles: Joi.string().optional(),
        identity: Joi.string().max(13).optional(),
        nombre: Joi.string().optional(),
        apellido: Joi.string().optional(),
        nacionalidad: Joi.string().optional(),
        estadoCivil: Joi.string().optional(),
        lugarNacimiento: Joi.number().optional(),
        nacimiento: Joi.date().iso().optional(),
        provincia: Joi.number().optional(),
        sector: Joi.string().optional(),
        calle: Joi.string().optional(),
        casa: Joi.number().optional(),
        correo: Joi.string().optional(),
        celular: Joi.string().optional(),
        telefonoFijo: Joi.string().optional(),
        idiomas: Joi.string().optional(),
        otherLanguaje: Joi.string().optional(),
        estacion: Joi.number().optional(),
        departamento: Joi.number().optional(),
        tipoVoluntario: Joi.number().optional(),
        hasIdentification: Joi.boolean().optional(),
        idetifications: Joi.string().optional(),
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

const stacionFieldValidation = Joi.object({
    field: Joi.object().keys({
        numero: Joi.number().optional(),
        provincia: Joi.number().optional(),
        municipio: Joi.number().optional()
    }),
    id: Joi.number().required()
});

const departmentFieldValidation = Joi.object({
    field: Joi.object().keys({
        departamento: Joi.string().optional(),
        descripcion: Joi.string().optional(),
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
    stacionFieldValidation,
    departmentFieldValidation,
    userTypeFieldValidation,
    fileFieldValidation,
    userStatusFieldValidation
}