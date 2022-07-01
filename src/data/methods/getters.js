const { testConnection } = require("../sqlConnection.js");
const { Voluntario, Departamento, Estacion, TipoVoluntario } = require("../models/index.js");

/* async function getVolunteer() {

    if(!await testConnection()) {
        return;
    }
    const volunteer = Voluntario.build();

    let result = await volunteer.save();
    return result;
}
 */

async function getEstacion() {
    if(!await testConnection()) {
        return;
    }

    let station = Estacion.findAll();
    return station;
}

async function getDepartamento() {
    if(!await testConnection()) {
        return;
    }

    let department = Departamento.findAll();
    return department;
}

async function getTipoVoluntario() {
    if(!await testConnection()) {
        return;
    }

    const tVolunteer = TipoVoluntario.findAll();
    return tVolunteer;
}

module.exports = {
   // getVolunteer,
    getEstacion,
    getDepartamento,
    getTipoVoluntario
}