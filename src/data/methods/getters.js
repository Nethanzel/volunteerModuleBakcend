const { Voluntario, Departamento, Estacion, TipoVoluntario, Archivo } = require("../models/index.js");
const { Op } = require("sequelize");


async function getVolunteer(id, allowDeleted, allowDeletedFiles = false, viewNonCofirmed = false) {
    try {
        let volunteer = await Voluntario.findOne({ 
            where: { 
                id, 
                deleted: { [Op.in]: allowDeleted ? [true, false] : [false] },
                checked: { [Op.in]: viewNonCofirmed ? [true, false] : [true] }
            },
            include: [
                { model: Estacion },
                { model: Departamento },
                { model: TipoVoluntario },
                { model: Archivo, where: { fileName: "Profile Photo" }, required: false }
            ]
        });

        if (!volunteer) return null;
        delete volunteer.password;
        volunteer.Archivos = [...volunteer.Archivos, ...await getUserFiles(volunteer.id, allowDeletedFiles)];

        return volunteer.toJSON();
    } catch {
        return null;
    }
}

async function getVolunteers(page, allowDeleted, allowDeletedFiles = false, viewNonCofirmed = false) {
    const limit = 15;
    let result = {};

    try {
        const volunteerList = await Voluntario.findAndCountAll({
            where: { 
                deleted: { [Op.in]: allowDeleted ? [true, false] : [false] }, 
                checked: { [Op.in]: viewNonCofirmed ? [true, false] : [true] }
            },
            limit: limit,
            order: [['id', 'DESC']],
            offset: 0 + (Number(page) - 1) * limit,
            include: [
                { model: Estacion },
                { model: Departamento },
                { model: TipoVoluntario },
                { model: Archivo, where: { fileName: "Profile Photo" }, required: false }
            ]
        });

        result['count'] = volunteerList.count;
        result['limit'] = limit;
        result['rows'] = [];

        await Promise.all(volunteerList.rows.map(async (volunteer) => {
            let otherFiles = await getUserFiles(volunteer.id, allowDeletedFiles);
            otherFiles.forEach(f => volunteer.Archivos.push(f));

            let data = volunteer.toJSON();
            delete data.password;
            result.rows.push(data);
        }));

        return result;
    } catch (e) {
        return false;
    }
}

async function getEstaciones(allowDeleted) {
    try {
        let station = Estacion.findAll({ where: { deleted: { [Op.in]: allowDeleted ? [true, false] : [false] } } });
        return station;
    } catch (e) {
        return false;
    }
}

async function getDepartamentos(allowDeleted) {
    try {
        let department = Departamento.findAll({ where: { deleted: { [Op.in]: allowDeleted ? [true, false] : [false] } }});
        return department;
    } catch {
        return false;
    }
}

async function getTipoVoluntarios(allowDeleted) {
    try {
        const tVolunteer = await TipoVoluntario.findAll({ where: { deleted: { [Op.in]: allowDeleted ? [true, false] : [false] } } });
        return tVolunteer;
    } catch {
        return false;
    }
}

async function getEstacion(id, allowDeleted) {
    try {
        const estacion = Estacion.findOne({ where: { id, deleted: { [Op.in]: allowDeleted ? [true, false] : [false] } } });
        return estacion;
    } catch {
        return false;
    }
}

async function getDepartamento(id, allowDeleted) {
    try {
        const departamento = Departamento.findOne({ where: { id, deleted: { [Op.in]: allowDeleted ? [true, false] : [false] } } });
        return departamento;
    } catch {
        return false;
    }
}

async function getTipoVoluntario(id, allowDeleted) {
    try {
        const tipo = TipoVoluntario.findOne({ where: { id, deleted: { [Op.in]: allowDeleted ? [true, false] : [false] } } });
        return tipo;
    } catch {
        return false;
    }
}

async function getUserFiles(id, allowDeleted) {
    let result = await Archivo.findAll({ where: { identity: id, deleted: { [Op.in]: allowDeleted ? [true, false] : [false] }, fileName: { [Op.ne]: 'Profile Photo' } }, attributes: { exclude: ['content'] } });
    return result;
}

async function getIdentificationExistence(value) {
    let count = await Voluntario.count({ where: { identity: value } });
    return count > 0;
}

module.exports = {
    getVolunteer,
    getVolunteers,
    getEstacion,
    getDepartamento,
    getTipoVoluntario,
    getEstaciones,
    getDepartamentos,
    getTipoVoluntarios,
    getUserFiles,
    getIdentificationExistence
}