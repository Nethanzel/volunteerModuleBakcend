const { Voluntario, Departamento, Estacion, TipoVoluntario } = require("../models/index.js");

async function getVolunteer(identity) {
    const volunteer = Voluntario.findOne({ where: { identity } });
    return volunteer;
}

async function getEstaciones() {
    let station = Estacion.findAll();
    return station;
}

async function getDepartamentos() {
    let department = Departamento.findAll();
    return department;
}

async function getTipoVoluntarios() {
    const tVolunteer = TipoVoluntario.findAll();
    return tVolunteer;
}

async function getEstacion(id) {
    const estacion = Estacion.findOne({ where: { id } });
    return estacion;
}

async function getDepartamento(id) {
    const departamento = Departamento.findOne({ where: { id } });
    return departamento;
}

async function getTipoVoluntario(id) {
    const tipo = TipoVoluntario.findOne({ where: { id } });
    return tipo;
}

module.exports = {
    getVolunteer,
    getEstacion,
    getDepartamento,
    getTipoVoluntario,
    getEstaciones,
    getDepartamentos,
    getTipoVoluntarios
}