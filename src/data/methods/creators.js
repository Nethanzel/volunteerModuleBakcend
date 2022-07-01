const { testConnection } = require("../sqlConnection.js");
const { Voluntario, Departamento, Estacion, TipoVoluntario } = require("../models/index.js");

async function createVolunteer() {

    if(!await testConnection()) {
        return;
    }
    const volunteer = Voluntario.build({
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
    });

    let result = await volunteer.save();
    return result;
}

async function createEstacion(props) {
    if(!await testConnection()) {
        return;
    }

    const station = Estacion.build(props);
    let result = await station.save();
    return result;
}

async function createDepartamento(props) {
    if(!await testConnection()) {
        return;
    }

    const department = Departamento.build(props);
    let result = await department.save();
    return result;
}

async function createTipoVoluntario(props) {
    if(!await testConnection()) {
        return;
    }

    const tVolunteer = TipoVoluntario.build(props);
    let result = await tVolunteer.save();
    return result;
}

module.exports = {
    createDepartamento,
    createEstacion,
    createTipoVoluntario,
    createVolunteer
}