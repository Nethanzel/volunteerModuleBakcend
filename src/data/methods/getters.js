const { Miembro, Grado, Escuela, TipoMiembro, Archivo, Highlight, Schedule, Practica, Asistencia } = require("../models/index.js");
const { sequelize } = require("../sqlConnection.js");
const { Op } = require("sequelize");
const limit = 15;

async function getMember(id, allowDeleted, allowDeletedFiles = false, viewNonCofirmed = false, code = null) {   
    try {
        let member = await Miembro.findOne({ 
            where: {
                ...(code ? { referenceCode:code } : { id }),
                deleted: { [Op.in]: allowDeleted ? [true, false] : [false] },
                checked: { [Op.in]: viewNonCofirmed ? [true, false] : [true] },
            },
            include: [
                { model: Escuela, as: 'escuela' },
                { model: Grado },
                { model: TipoMiembro },
                { model: Archivo, where: { fileName: "Profile Photo" }, required: false }
            ],
            ...(code ? { attributes:['nombre','apellido','nacimiento','enfermedadDetalles','alergiaDetalles','contactoEmergencia','alergia','enfermedad'] } : {}),
        });

        if (!member) return null;
        if (!code) member.Archivos = [...member.Archivos, ...await getUserFiles(member.id, allowDeletedFiles)];
        delete member.password;

        return member.toJSON();
    } catch(e) {
        return null;
    }
}

async function getMembers(page, allowDeleted, allowDeletedFiles = false, viewNonCofirmed = false) {
    let result = {};

    try {
        const memberList = await Miembro.findAndCountAll({
            where: { 
                deleted: { [Op.in]: allowDeleted ? [true, false] : [false] }, 
                checked: { [Op.in]: viewNonCofirmed ? [true, false] : [true] }
            },
            ...(page != null ? { limit: limit } : {}),
            order: [['id', 'DESC']],
            ...(page != null ? { offset: 0 + (Number(page) - 1) * limit } : {}),
            include: [
                { model: Grado },
                { model: TipoMiembro },
                { model: Escuela, as: "escuela", required: false },
                ...(page == null ? [] : [{ model: Archivo, where: { fileName: "Profile Photo" }, required: false }])
            ],
            ...(page == null ? { attributes:['nombre','apellido','nacimiento','referenceCode','celular','telefonoFijo','otherCountry','municipio','pais','estado','checked'] } : {}),
        });

        result['count'] = memberList.count;
        result['limit'] = limit;
        result['rows'] = [];

        if (page != null) {
            await Promise.all(memberList.rows.map(async (member) => {
                let otherFiles = await getUserFiles(member.id, allowDeletedFiles);
                otherFiles.forEach(f => member.Archivos.push(f));
                let data = member.toJSON();
                delete data.password;
                result.rows.push(data);
            }));
        }
        else {
            memberList.rows.map(async (member) => {
                let data = member.toJSON();
                delete data.password;
                result.rows.push(data);
            });
        }

        return result;
    } catch {
        return null;
    }
}

async function getMembersNames(escuela = null, name = null) {
    try {
        const memberList = await Miembro.findAll({
            where: {
                checked: true,
                deleted: false,
                GradoId: { [Op.ne]: null, [Op.gt]: 0 },
                ...(escuela ? { escuelaId:escuela } : {}),
                ...(name ? { [Op.and]: [ sequelize.where(sequelize.fn("LOWER", sequelize.col("nombre")), { [Op.like]: `%${name}%` }) ] } : {})
                
            },
            attributes: ['nombre','apellido','id','TipoMiembroId'],
            raw: true
        });

        return memberList;
    }
    catch {
        return null;
    }
}

async function getEscuelas(allowDeleted, page, shorten = false, includeSchedule = false) {
    try {
        let result = {};

        let school = await Escuela.findAndCountAll({ 
            where: {
                deleted: { [Op.in]: allowDeleted ? [true, false] : [false] }
            },
            ...(shorten ? { attributes:['nombre','liderId','id','provincia','municipio'] } : {}),
            ...(shorten ? { include:[] } : { include: [{ model: Miembro, attributes: ['nombre','apellido'], required: false, as: "lider", include: [{ model:Grado, attributes: ['grado','color','prefix'] }] }]}),
            ...(page > 0 ? { offset: (0 + (Number(page) - 1) * limit), limit: limit } : {}),
            ...(includeSchedule ? { include: [{ model:Schedule, as: 'schedule', include: [{ model:Miembro, as:'profesor', attributes:['nombre','apellido','id'] }] }] } : {})
        });

        result['count'] = school.count;
        result['rows'] = school.rows;
        result['limit'] = limit;

        return result;
    } catch {
        return null;
    }
}

async function getGrados(allowDeleted, page) {
    try {
        let result = {};

        let level = await Grado.findAndCountAll({ 
            where: { 
                deleted: { [Op.in]: allowDeleted ? [true, false] : [false] } 
            },
            ...(page > 0 ? { offset: (0 + (Number(page) - 1) * limit), limit: limit } : {})
        });

        result['count'] = level.count;
        result['rows'] = level.rows;
        result['limit'] = limit;

        return result;
    } catch {
        return null;
    }
}

async function getTipoMiembros(allowDeleted, page) {
    try {
        let result = {};

        const tMember = await TipoMiembro.findAndCountAll({ 
            where: { 
                deleted: { [Op.in]: allowDeleted ? [true, false] : [false] } 
            },
            ...(page > 0 ? { offset: (0 + (Number(page) - 1) * limit), limit: limit } : {})
        });

        result['count'] = tMember.count;
        result['rows'] = tMember.rows;
        result['limit'] = limit;

        return result;
    } catch {
        return null;
    }
}

async function getEscuela(id, allowDeleted) {
    try {
        const escuela = Escuela.findOne({ where: { id, deleted: { [Op.in]: allowDeleted ? [true, false] : [false] } } });
        return escuela;
    } catch {
        return null;
    }
}

async function getHighlights(allowDeleted, allowFullQuery = false, page) {
    try {
        let result = {};

        let highlight = await Highlight.findAndCountAll({ 
            where: { 
                deleted: { [Op.in]: allowDeleted ? [true, false] : [false] } 
            },
            ...(page > 0 ? { offset: (0 + (Number(page) - 1) * limit), limit: limit } : {}),
            ...(allowFullQuery ? {} : { attributes: ['title','comment','image'] })
        });

        result['count'] = highlight.count;
        result['rows'] = highlight.rows;
        result['limit'] = limit;

        return result;
    } catch {
        return null;
    }
}

async function getSchoolSchedule(id, allowDeleted, page, shorten) {
    try {
        let result = {};

        let schedule = await Schedule.findAndCountAll({ 
            where: {
                deleted: { [Op.in]: allowDeleted ? [true, false] : [false] },
                escuelaId: id
            },
            ...(page > 0 ? { offset: (0 + (Number(page) - 1) * limit), limit: limit } : {}),
            ...(shorten ? {attributes:['endHour','startHour','dayOfWeek','profesorId','id']} : {})
        });

        result['count'] = schedule.count;
        result['rows'] = schedule.rows;
        result['limit'] = limit;

        return result;
    } catch {
        return null;
    }
}

async function getSchoolPractices(id, allowDeleted, page) {
    try {
        let result = {};

        let practicas = await Practica.findAndCountAll({
            where: {
                deleted: { [Op.in]: allowDeleted ? [true, false] : [false] },
                escuelaId: id
            },
            distinct: true,
            ...(page > 0 ? { offset: (0 + (Number(page) - 1) * limit), limit: limit } : {}),
            include: [{
                model:Asistencia,
                where: {
                    deleted: { [Op.in]: allowDeleted ? [true, false] : [false] },
                },
                as:'asistencia',
                required: false,
                include:[{
                    model:Miembro,
                    attributes:['nombre','apellido','id','TipoMiembroId'],
                    as:'miembro',
                    required: false,
                    where: {
                        deleted: { [Op.in]: allowDeleted ? [true, false] : [false] },
                    }
                }]
            },
            {
                model:Schedule,
                as: 'schedule',
                required: false
            }]
        });

        result['count'] = practicas.count;
        result['rows'] = practicas.rows;
        result['limit'] = limit;

        return result;
    } catch (e) {
        console.log(e);
        
        return null;
    }
}

async function getGrado(id, allowDeleted) {
    try {
        const grado = Grado.findOne({ where: { id, deleted: { [Op.in]: allowDeleted ? [true, false] : [false] } } });
        return grado;
    } catch {
        return null;
    }
}

async function getTipoMiembro(id, allowDeleted) {
    try {
        const tipo = TipoMiembro.findOne({ where: { id, deleted: { [Op.in]: allowDeleted ? [true, false] : [false] } } });
        return tipo;
    } catch {
        return null;
    }
}

async function getUserFiles(id, allowDeleted) {
    try {
        let result = await Archivo.findAll({ where: { identity: id, deleted: { [Op.in]: allowDeleted ? [true, false] : [false] }, fileName: { [Op.ne]: 'Profile Photo' } }, attributes: { exclude: ['content'] } });
        return result;
    }
    catch {
        return null;
    }
}

async function getIdentificationExistence(value) {
    try {
        let count = await Miembro.count({ where: { identity: value } });
        return count > 0;
    }
    catch {
        return null;
    }
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
    getIdentificationExistence,
    getMembersNames,
    getHighlights,
    getSchoolSchedule,
    getSchoolPractices
}