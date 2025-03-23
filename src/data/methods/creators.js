const { resolve } = require("path");
const { readFileSync } = require("fs");
const { sequelize } = require("../sqlConnection.js");
const { Miembro, Grado, Escuela, TipoMiembro, Archivo, Highlight, Schedule, Practica, Asistencia } = require("../models/index.js");

async function createMember(props, image) {
    const t = await sequelize.transaction();
    try {
        let exists = props.identity ? await Miembro.count({ where: { identity: props.identity } }) : 0;
        if (exists > 0) return {
            message: `Ya se han registrado usando la cédula ${props.identity}`,
            userCode: null,
            result: false,
            code: 208,
        };

        // Aquí todo debe ejecutarse dentro de la misma transacción
        let nUser = await Miembro.create(props, { transaction: t });

        await Archivo.create({
            content: image ? image.file : readFileSync(resolve("./src/assets/default.jpg")),
            contentType: image ? image.type : "image/jpeg",
            ext: image ? image.ext : 'jpg',
            fileName: "Profile Photo",
            identity: nUser.id,
        }, { transaction: t });

        // Si todo está bien, haz commit de la transacción
        await t.commit();

        return {
            result: true,
            userCode: nUser.referenceCode,
            uid: nUser.id
        };
    } catch {
        // Si algo falla, haz rollback de la transacción
        await t.rollback();
        return {
            result: false,
            userCode: null,
            code: 503,
            message: "Ocurrió un error"
        };
    }
}

async function createEscuela(props) {
    try {
        const station = Escuela.build(props);
        let result = await station.save();
        return result;
    } catch {
        return null
    }
}

async function createGrado(props) {
    try {
        const level = Grado.build(props);
        let result = await level.save();
        return result;
    } catch {
        return null
    }
}

async function createTipoMiembro(props) {
    try {
        const tMember = TipoMiembro.build(props);
        let result = await tMember.save();
        return result;
    } catch {
        return null
    }
}

async function createHighlight(props) {
    try {
        const highlight = Highlight.build(props);
        let result = await highlight.save();
        return result;
    } catch {
        return null
    }
}

async function createSchedule(props) {
    try {
        const schedule = Schedule.build(props);
        let result = await schedule.save();
        return result;
    } catch {
        return null
    }
}

async function createPractica(props) {
    try {
        const practica = Practica.build(props);
        let result = await practica.save();

        let atendants = [];

        for (let userId of props.atendance) {
            let atendanceProps = {
                miembroId: userId,
                practicaId: result.id
            }
            atendants.push(atendanceProps);
        }
        
        await Asistencia.bulkCreate(atendants);
        
        return result;
    } catch {
        return null
    }
}

function memberPrepare(props) {
    if(!props) return null;

    props["step_4"].identificacion = JSON.parse(props["step_4"].identificacion);
    props["step_4"].otherMartialArt = JSON.parse(props["step_4"].otherMartialArt);
    
    let newMember = {
        checked: false,
        escuelaId: props["step_1"] ? Number(props["step_1"].escuela) : null,

        //Datos de salud del miembro
        assurance: props["step_3"].assurance.state,
        assuranceCode: props["step_3"].assurance.state ? (props["step_3"].assurance.code ? props["step_3"].assurance.code : null) : null,
        assuranceCompany: props["step_3"].assurance.state ? (props["step_3"].assurance.company ? props["step_3"].assurance.company : null) : null,
        enfermedad: props["step_3"].desease.state,
        enfermedadDetalles: props["step_3"].desease.state ? (props["step_3"].desease.contents ? props["step_3"].desease.contents : null) : null,
        alergia: props["step_3"].medicine.state,
        alergiaDetalles: props["step_3"].medicine.state ? (props["step_3"].medicine.contents ? props["step_3"].medicine.contents : null) : null,
        contactoEmergencia: props["step_3"].emergencyContacts,

        //Datos del area a la que pertenece el miembro
        GradoId: Number(props["step_4"].grado),
        TipoMiembroId: Number(props["step_4"].tipoMiembro),
        hasIdentification: props["step_4"].identificacion == null ? false : props["step_4"].identificacion,
        idetifications: props["step_4"].identificacion == true ? props["step_4"].identificacionDetails : null,
        otherMartialArtDetails: props["step_4"].otherMartialArt == true ? props["step_4"].otherMartialArtDetails : null,
        otherMartialArt: props["step_4"].otherMartialArt == null ? false : props["step_4"].otherMartialArt,
        interested: props["step_4"].interested,
        desire: props["step_4"].desire,

        //Datos de contacto
        telefonoFijo: props["step_2"].telefono,
        celular: props["step_2"].celular,
        correo: props["step_2"].email,

        //Datos de la direccion
        ...(props["step_2"].otherCountry ?
        {
            pais: props["step_2"].country,
            estado: props["step_2"].state,
            ciudad: props["step_2"].city,
            calle: props["step_2"].street,
            casa: props["step_2"].building
        }
        :
        {
            municipio: Number(props["step_2"].municipio),
            apartamento: props["step_2"].apartamento ? props["step_2"].apartamento : null,
            sector: props["step_2"].sector,
            casa: props["step_2"].casa_no,
            calle: props["step_2"].calle,
        }),

        otherCountry: props["step_2"].otherCountry,
        tutorInfo: props["step_2"].tutorInfo,

        //Datos personales
        identity: props["step_2"].identity ? props["step_2"].identity.replace(/[-\s]/g, "") : null,
        nombre: props["step_2"].nombre,
        apellido: props["step_2"].apellido,
        lugarNacimiento: Number(props["step_2"].nacimientolugar),
        nacimiento: props["step_2"].nacimientofecha,
        nacionalidad: props["step_2"].nacionalidad,
        ocupacion: props["step_2"].ocupacion? props["step_2"].ocupacion : null,
        peso: Number(props["step_2"].peso),
        altura: Number(props["step_2"].estatura)
    }

    return newMember;
}

module.exports = {
    createGrado,
    createEscuela,
    createTipoMiembro,
    createMember,
    memberPrepare,
    createHighlight,
    createSchedule,
    createPractica
}