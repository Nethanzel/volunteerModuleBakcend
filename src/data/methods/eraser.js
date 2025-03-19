const { Escuela, Grado, TipoMiembro, Miembro, Highlight, Schedule, Practica, Asistencia } = require("../models");

async function deleteEscuela(id, deleted) {
    try {
        let res = await Escuela.update({ deleted }, { where: { id }});
        return {
            result: res > 0,
            message: null,
            code: res > 0 ? 204 : 503
        };
    }
    catch {
        return {
            result: false,
            message: "No se pudo guardar el cambio",
            code: 503
        }
    }
}

async function deleteUserType(id, deleted) {
    try {
        let res = await TipoMiembro.update({ deleted }, { where: { id }});
        return {
            result: res > 0,
            message: null,
            code: res > 0 ? 204 : 503
        };
    }
    catch {
        return {
            result: false,
            message: "No se pudo guardar el cambio",
            code: 503
        }
    }
}

async function deleteLevel(id, deleted) {
    try {
        let res = await Grado.update({ deleted }, { where: { id }});
        return {
            result: res > 0,
            message: null,
            code: res > 0 ? 204 : 503
        };
    }
    catch {
        return {
            result: false,
            message: "No se pudo guardar el cambio",
            code: 503
        }
    }
}

async function deleteUser(id, deleted) {
    try {
        let res = await Miembro.update({ deleted }, { where: { id }});
        return {
            result: res > 0,
            message: null,
            code: res > 0 ? 204 : 503
        };
    }
    catch {
        return {
            result: false,
            message: "No se pudo guardar el cambio",
            code: 503
        }
    }
}

async function deleteHighlight(id, deleted) {
    try {
        let res = await Highlight.update({ deleted }, { where: { id }});
        return {
            result: res > 0,
            message: null,
            code: res > 0 ? 204 : 503
        };
    }
    catch {
        return {
            result: false,
            message: "No se pudo guardar el cambio",
            code: 503
        }
    }
}

async function deleteSchedule(id, deleted) {
    try {
        let res = await Schedule.update({ deleted }, { where: { id }});
        return {
            result: res > 0,
            message: null,
            code: res > 0 ? 204 : 503
        };
    }
    catch {
        return {
            result: false,
            message: "No se pudo guardar el cambio",
            code: 503
        }
    }
}

async function deletePractice(id, deleted) {
    try {
        let res = await Practica.update({ deleted }, { where: { id }});
        return {
            result: res > 0,
            message: null,
            code: res > 0 ? 204 : 503
        };
    }
    catch {
        return {
            result: false,
            message: "No se pudo guardar el cambio",
            code: 503
        }
    }
}

async function deleteAtendance(id, deleted) {
    try {
        let res = await Asistencia.update({ deleted }, { where: { id }});
        return {
            result: res > 0,
            message: null,
            code: res > 0 ? 204 : 503
        };
    }
    catch {
        return {
            result: false,
            message: "No se pudo guardar el cambio",
            code: 503
        }
    }
}

module.exports = {
    deleteEscuela,
    deleteUserType,
    deleteLevel,
    deleteUser,
    deleteHighlight,
    deleteSchedule,
    deletePractice,
    deleteAtendance
}