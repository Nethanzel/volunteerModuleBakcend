const { Voluntario, Departamento, Estacion, TipoVoluntario } = require("../models/index.js");

async function getVolunteer(identity) {
    try {
        let volunteer = await Voluntario.findOne({ where: { identity } });
        volunteer = volunteer.toJSON();

        const departament = await Departamento.findOne({ where: {id: volunteer.departamentoId}});
        const tipoVoluntario = await TipoVoluntario.findOne({ where: {id: volunteer.tipoVoluntarioId}});
        const estacion = await Estacion.findOne({ where: {numero: volunteer.estacionId}});

        volunteer['departamento'] = departament.dataValues;
        volunteer['tipoVoluntario'] = tipoVoluntario.dataValues;
        volunteer['estacion'] = estacion.dataValues;

        delete volunteer.departamentoId; 
        delete volunteer.tipoVoluntarioId;
        delete volunteer.estacionId;

        return volunteer;
    } catch {
        return false;
    }
}

async function getVolunteers(page) {
    const limit = 15;
    let result = {};

    try {
        const volunteerList = await Voluntario.findAndCountAll({
            offset: 0 + (Number(page) - 1) * limit,
            limit: limit,
            order: [['createdAt', 'DESC']]
        });

        result['limit'] = limit;
        result['count'] = volunteerList.count;
        result['rows'] = [];

        await Promise.all(volunteerList.rows.map(async (volunteer) => {
            volunteer = volunteer.toJSON()

            const departament = await Departamento.findOne({ where: {id: volunteer.departamentoId}});
            const tipoVoluntario = await TipoVoluntario.findOne({ where: {id: volunteer.tipoVoluntarioId}});
            const estacion = await Estacion.findOne({ where: {numero: volunteer.estacionId}});

            volunteer['departamento'] = departament.dataValues;
            volunteer['tipoVoluntario'] = tipoVoluntario.dataValues;
            volunteer['estacion'] = estacion.dataValues;

            delete volunteer.departamentoId; 
            delete volunteer.tipoVoluntarioId;
            delete volunteer.estacionId;

            result.rows.push(volunteer);
        }));
        return result;
    } catch(e) {
        console.log(e);
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
    getVolunteers,
    getEstacion,
    getDepartamento,
    getTipoVoluntario,
    getEstaciones,
    getDepartamentos,
    getTipoVoluntarios
}