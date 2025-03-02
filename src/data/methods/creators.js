const { resolve } = require("path");
const { readFileSync } = require("fs");
const { sequelize } = require("../sqlConnection.js");
const { Voluntario, Departamento, Estacion, TipoVoluntario, Archivo } = require("../models/index.js");

async function createVolunteer(props) {
    const t = await sequelize.transaction();
    try {
        let exists = await Voluntario.count({ where: { identity: props.identity } });
        if (exists > 0) return 1; // Si el voluntario ya existe, regresa un valor específico

        // Aquí todo debe ejecutarse dentro de la misma transacción
        let nUser = await Voluntario.create(props, { transaction: t });

        await Archivo.create({
            content: readFileSync(resolve("./src/assets/default.jpg")),
            identity: nUser.id,
            contentType: "image/jpeg",
            fileName: "Profile Photo",
            ext: 'jpg'
        }, { transaction: t });

        // Si todo está bien, haz commit de la transacción
        await t.commit();
        return true;
    } catch (e) {
        console.log(e);
        
        // Si algo falla, haz rollback de la transacción
        await t.rollback();
        return false;
    }
}

async function createEstacion(props) {
    try {
        const station = Estacion.build(props);
        let result = await station.save();
        return result;
    } catch {
        return false
    }
}

async function createDepartamento(props) {
    try {
        const department = Departamento.build(props);
        let result = await department.save();
        return result;
    } catch {
        return false
    }
}

async function createTipoVoluntario(props) {
    try {
        const tVolunteer = TipoVoluntario.build(props);
        let result = await tVolunteer.save();
        return result;
    } catch {
        return false
    }
}

function volunteerPrepare(props) {
    if(!props) return false;

    props["step_5"].identificacion = JSON.parse(props["step_5"].identificacion);
    
    let newVolunteer = {
        checked: false,
        EstacionId: Number(props["step_1"].estacion),

        //Datos de salud del voluntario
        sangre: props["step_4"].bloodType,
        enfermedad: props["step_4"].desease.state,
        enfermedadDetalles: props["step_4"].desease.state ? props["step_4"].desease.contents : "",
        alergia: props["step_4"].medicine.state,
        alergiaDetalles: props["step_4"].medicine.state ? props["step_4"].medicine.contents : "",
        contactoEmergencia: props["step_4"].emergencyContacts,

        //Datos de formacion academica
        estudios: props["step_3"].study,
        idiomas: props["step_3"].languages.toString(),
        otherLanguaje: props["step_3"].otherLanguage,

        //Datos del area a la que pertenece el voluntario
        DepartamentoId: Number(props["step_5"].departamento),
        TipoVoluntarioId: Number(props["step_5"].tipoVoluntario),
        hasIdentification: props["step_5"].identificacion,
        idetifications: props["step_5"].identificacion == true ? props["step_5"].identificacionDetails : null,

        //Datos de contacto
        telefonoFijo: props["step_2"].telefono,
        celular: props["step_2"].celular,
        correo: props["step_2"].email,

        //Datos de la direccion
        provincia: Number(props["step_2"].provincia),
        sector: props["step_2"].sector,
        calle: props["step_2"].calle,
        casa: props["step_2"].casa_no,

        //Datos personales
        identity: props["step_2"].identity.replace(/[-\s]/g, ""),
        nombre: props["step_2"].nombre,
        apellido: props["step_2"].apellido,
        lugarNacimiento: Number(props["step_2"].nacimientolugar),
        nacimiento: props["step_2"].nacimientofecha,
        nacionalidad: props["step_2"].nacionalidad,
        estadoCivil: props["step_2"].ecivil
    }

    return newVolunteer;
}

module.exports = {
    createDepartamento,
    createEstacion,
    createTipoVoluntario,
    createVolunteer,
    volunteerPrepare
}