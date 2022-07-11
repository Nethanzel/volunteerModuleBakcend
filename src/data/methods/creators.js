const { Voluntario, Departamento, Estacion, TipoVoluntario } = require("../models/index.js");

async function createVolunteer(props) {
    try {
        let exists = await Voluntario.count( {where: { identity: props.identity }} );
        if(exists > 0) return 1;

        const volunteer = Voluntario.build(props);
        let result = await volunteer.save();
        return result;
    } catch (e) {
        //console.log(e);
        return false
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
    
    let newVolunteer = {
        checked: false,
        estacionId: Number(props["step_1"].estacion),

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
        departamentoId: Number(props["step_5"].departamento),
        tipoVoluntarioId: Number(props["step_5"].tipoVoluntario),
        hasIdentification: props["step_5"].identificacion == "Si" ? true : false,
        idetifications: props["step_5"].identificacion == "Si" ? props["step_5"].identificacionDetails : null,

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
        identity: props["step_2"].identity,
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