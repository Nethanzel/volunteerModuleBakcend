const { readFileSync, unlink } = require("fs");
const { Archivo } = require("../models");
const { resolve } = require("path");
const { Op } = require("sequelize");

async function newFile(props, file) {
    try {
        const newfile = Archivo.build(props);
        newfile.content = readFileSync(resolve(file.path))
        if (newfile.contentType != file.type) newfile.contentType = file.type;
        await newfile.save();

        unlink(file.path, (e) => console.log(e));

        return { code:204, message:null, result:true }
    }
    catch {
        return { code:503, message:"Ocurrió un error", result:false }
    }
}

async function deleteFile(params, deleted) {
    try {
        let res = await Archivo.update({ deleted }, { where: { identity: params.uid, id: params.id } });
        return { result: res > 0, message: null, code: res > 0 ? 204 : 503 };
    }
    catch (e) {
        return { code:503, message:"Ocurrió un error", result:false }
    }
}

async function updateFile(params) {
    try {
        let res = await Archivo.update(params.field, { where: { id: params.id } });
        return { result: res > 0, message: null, code: res > 0 ? 204 : 503 };
    }
    catch (e) {
        return { code:503, message:"Ocurrió un error", result:false }
    }
}

async function getFileById(id, includeContent, allowDeleted) {
    const file = await Archivo.findOne({ 
        where: { 
            id, 
            deleted: { 
                [Op.in]: allowDeleted ? [true, false] : [false] 
            }
        },
        attributes: {
            exclude: !includeContent ? ['content'] : []
        }
    });

    if (!file) return null;

    return file.toJSON();
}

module.exports = {
    newFile,
    deleteFile,
    updateFile,
    getFileById
}