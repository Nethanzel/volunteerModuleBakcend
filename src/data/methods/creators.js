const { resolve } = require("path");
const { readFileSync } = require("fs");
const { sequelize } = require("../sqlConnection.js");
const { Miembro, Grado, Escuela, TipoMiembro, Archivo } = require("../models/index.js");

async function createMember(props, image) {
    const t = await sequelize.transaction();
    try {
        let exists = props.identity ? await Miembro.count({ where: { identity: props.identity } }) : 0;
        if (exists > 0) return {
            result: false,
            userCode: null,
            code: 208,
            message: `Ya se han registrado usando la cédula ${props.identity}`
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
            userCode: nUser.referenceCode
        };
    } catch (e) {
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
        return false
    }
}

async function createGrado(props) {
    try {
        const level = Grado.build(props);
        let result = await level.save();
        return result;
    } catch {
        return false
    }
}

async function createTipoMiembro(props) {
    try {
        const tMember = TipoMiembro.build(props);
        let result = await tMember.save();
        return result;
    } catch {
        return false
    }
}

function memberPrepare(props) {
    if(!props) return false;

    props["step_4"].identificacion = JSON.parse(props["step_4"].identificacion);
    props["step_4"].otherMartialArt = JSON.parse(props["step_4"].otherMartialArt);
    
    let newMember = {
        checked: false,
        escuelaId: Number(props["step_1"].escuela),

        //Datos de salud del miembro
        assurance: props["step_3"].assurance.state,
        assuranceCompany: props["step_3"].assurance.state ? (props["step_3"].assuranceCompany ? props["step_3"].assuranceCompany : null) : null,
        assuranceCode: props["step_3"].assurance.state ? (props["step_3"].assuranceCode ? props["step_3"].assuranceCode : null) : null,
        enfermedad: props["step_3"].desease.state,
        enfermedadDetalles: props["step_3"].desease.state ? (props["step_3"].desease.contents ? props["step_3"].desease.contents : null) : null,
        alergia: props["step_3"].medicine.state,
        alergiaDetalles: props["step_3"].medicine.state ? (props["step_3"].medicine.contents ? props["step_3"].medicine.contents : null) : null,
        contactoEmergencia: props["step_3"].emergencyContacts,

        //Datos del area a la que pertenece el miembro
        GradoId: Number(props["step_4"].grado),
        TipoMiembroId: Number(props["step_4"].tipoMiembro),
        hasIdentification: props["step_4"].identificacion,
        idetifications: props["step_4"].identificacion == true ? props["step_4"].identificacionDetails : null,
        otherMartialArt: props["step_4"].otherMartialArt,
        otherMartialArtDetails: props["step_4"].otherMartialArt == true ? props["step_4"].otherMartialArtDetails : null,
        desire: props["step_4"].desire,
        interested: props["step_4"].interested,

        //Datos de contacto
        telefonoFijo: props["step_2"].telefono,
        celular: props["step_2"].celular,
        correo: props["step_2"].email,

        //Datos de la direccion
        municipio: Number(props["step_2"].municipio),
        apartamento: props["step_2"].apartamento ? props["step_2"].apartamento : null,
        sector: props["step_2"].sector,
        casa: props["step_2"].casa_no,
        calle: props["step_2"].calle,

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
    memberPrepare
}