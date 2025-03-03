const { Miembro, Grado, Escuela, TipoMiembro, Archivo } = require("../models/index.js");
const { Op } = require("sequelize");


async function getMember(id, allowDeleted, allowDeletedFiles = false, viewNonCofirmed = false) {
    try {
        let member = await Miembro.findOne({ 
            where: { 
                id, 
                deleted: { [Op.in]: allowDeleted ? [true, false] : [false] },
                checked: { [Op.in]: viewNonCofirmed ? [true, false] : [true] }
            },
            include: [
                { model: Escuela },
                { model: Grado },
                { model: TipoMiembro },
                { model: Archivo, where: { fileName: "Profile Photo" }, required: false }
            ]
        });

        if (!member) return null;
        delete member.password;
        member.Archivos = [...member.Archivos, ...await getUserFiles(member.id, allowDeletedFiles)];

        return member.toJSON();
    } catch {
        return null;
    }
}

async function getMembers(page, allowDeleted, allowDeletedFiles = false, viewNonCofirmed = false) {
    const limit = 15;
    let result = {};

    try {
        const memberList = await Miembro.findAndCountAll({
            where: { 
                deleted: { [Op.in]: allowDeleted ? [true, false] : [false] }, 
                checked: { [Op.in]: viewNonCofirmed ? [true, false] : [true] }
            },
            limit: limit,
            order: [['id', 'DESC']],
            offset: 0 + (Number(page) - 1) * limit,
            include: [
                { model: Grado },
                { model: TipoMiembro },
                { model: Escuela, as: "escuela", required: false },
                { model: Archivo, where: { fileName: "Profile Photo" }, required: false }
            ]
        });

        result['count'] = memberList.count;
        result['limit'] = limit;
        result['rows'] = [];

        await Promise.all(memberList.rows.map(async (member) => {
            let otherFiles = await getUserFiles(member.id, allowDeletedFiles);
            otherFiles.forEach(f => member.Archivos.push(f));

            let data = member.toJSON();
            delete data.password;
            result.rows.push(data);
        }));

        return result;
    } catch {
        return false;
    }
}

async function getEscuelas(allowDeleted) {
    try {
        let school = Escuela.findAll({ where: { deleted: { [Op.in]: allowDeleted ? [true, false] : [false] } } });
        return school;
    } catch {
        return false;
    }
}

async function getGrados(allowDeleted) {
    try {
        let level = Grado.findAll({ where: { deleted: { [Op.in]: allowDeleted ? [true, false] : [false] } }});
        return level;
    } catch {
        return false;
    }
}

async function getTipoMiembros(allowDeleted) {
    try {
        const tMember = await TipoMiembro.findAll({ where: { deleted: { [Op.in]: allowDeleted ? [true, false] : [false] } } });
        return tMember;
    } catch {
        return false;
    }
}

async function getEscuela(id, allowDeleted) {
    try {
        const escuela = Escuela.findOne({ where: { id, deleted: { [Op.in]: allowDeleted ? [true, false] : [false] } } });
        return escuela;
    } catch {
        return false;
    }
}

async function getGrado(id, allowDeleted) {
    try {
        const grado = Grado.findOne({ where: { id, deleted: { [Op.in]: allowDeleted ? [true, false] : [false] } } });
        return grado;
    } catch {
        return false;
    }
}

async function getTipoMiembro(id, allowDeleted) {
    try {
        const tipo = TipoMiembro.findOne({ where: { id, deleted: { [Op.in]: allowDeleted ? [true, false] : [false] } } });
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
    let count = await Miembro.count({ where: { identity: value } });
    return count > 0;
}

module.exports = {
    getMember,
    getMembers,
    getEscuela,
    getGrado,
    getTipoMiembro,
    getEscuelas,
    getGrados,
    getTipoMiembros,
    getUserFiles,
    getIdentificationExistence
}