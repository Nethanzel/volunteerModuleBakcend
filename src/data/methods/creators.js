const { Voluntario, Departamento, Estacion, TipoVoluntario } = require("../models/index.js");

async function createVolunteer(props) {
    try {
        const volunteer = Voluntario.build(props);
        let result = await volunteer.save();
        return result;
    } catch {
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
        estacionId: 1,

        //Datos de salud del voluntario
        sangre: "O+",
        enfermedad: false,
        enfermedadDetalles: "",
        alergia: false,
        alergiaDetalles: "",
        contactoEmergencia: "*",
        
        //Datos de formacion academica
        estudios: "*",
        idiomas: "*",

        //Datos del area a la que pertenece el voluntario
        departamentoId: 1,
        tipoVoluntarioId: 1,
                
        //Datos de contacto
        telefonoFijo: "*",
        celular: "*",
        correo: "*",

        //Datos de la direccion
        provincia: "*",
        sector: "*",
        calle: "*",
        casa: "*",

        //Datos personales
        identity: "*",
        nombre: "*",
        apellido: "*",
        lugarNacimiento: "*",
        nacimiento: new Date(),
        nacionalidad: "*",
        estadoCivil: "*"
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