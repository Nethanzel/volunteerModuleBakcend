const { Estacion, Departamento, TipoVoluntario, Voluntario } = require("../models");

async function deleteEstacion(id, deleted) {
    try {
        let res = await Estacion.update({ deleted }, { where: { id }});
        return {
            result: res > 0,
            message: null,
            code: res > 0 ? 204 : 503
        };
    }
    catch (e) {
        return {
            result: false,
            message: "No se pudo guardar el cambio",
            code: 503
        }
    }
}

async function deleteUserType(id, deleted) {
    try {
        let res = await TipoVoluntario.update({ deleted }, { where: { id }});
        return {
            result: res > 0,
            message: null,
            code: res > 0 ? 204 : 503
        };
    }
    catch (e) {
        return {
            result: false,
            message: "No se pudo guardar el cambio",
            code: 503
        }
    }
}

async function deleteDepartment(id, deleted) {
    try {
        let res = await Departamento.update({ deleted }, { where: { id }});
        return {
            result: res > 0,
            message: null,
            code: res > 0 ? 204 : 503
        };
    }
    catch (e) {
        return {
            result: false,
            message: "No se pudo guardar el cambio",
            code: 503
        }
    }
}

async function deleteUser(id, deleted) {
    try {
        let res = await Voluntario.update({ deleted }, { where: { id }});
        return {
            result: res > 0,
            message: null,
            code: res > 0 ? 204 : 503
        };
    }
    catch (e) {
        return {
            result: false,
            message: "No se pudo guardar el cambio",
            code: 503
        }
    }
}

module.exports = {
    deleteEstacion,
    deleteUserType,
    deleteDepartment,
    deleteUser
}