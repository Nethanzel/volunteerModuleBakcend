const { Voluntario, Departamento, Estacion, TipoVoluntario } = require("../models/index.js");

async function getVolunteer(identity) {
    try {
        const volunteer = Voluntario.findOne({ where: { identity } });
        return volunteer;
    } catch {
        return false;
    }
}

async function getEstaciones() {
    try {
        let station = Estacion.findAll();
        return station;
    } catch {
        return false;
    }
}

async function getDepartamentos() {
    try {
        let department = Departamento.findAll();
        return department;
    } catch {
        return false;
    }
}

async function getTipoVoluntarios() {
    try {
        const tVolunteer = await TipoVoluntario.findAll();
        return tVolunteer;
    } catch {
        return false;
    }
}

async function getEstacion(id) {
    try {
        const estacion = Estacion.findOne({ where: { id } });
        return estacion;
    } catch {
        return false;
    }
}

async function getDepartamento(id) {
    try {
        const departamento = Departamento.findOne({ where: { id } });
        return departamento;
    } catch {
        return false;
    }
}

async function getTipoVoluntario(id) {
    try {
        const tipo = TipoVoluntario.findOne({ where: { id } });
        return tipo;
    } catch {
        return false;
    }
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