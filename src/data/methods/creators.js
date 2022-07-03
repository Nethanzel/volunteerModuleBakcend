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

module.exports = {
    createDepartamento,
    createEstacion,
    createTipoVoluntario,
    createVolunteer
}