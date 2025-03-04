const { Autorizacion, Miembro, Archivo } = require("../models");

async function createAuthorization(props) {
    try {
        const authorization = Autorizacion.build(props);
        let result = await authorization.save();
        return result;
    } catch {
        return null
    }
}

async function disableOtherAccess(identity) {
    let activeAccess = await Autorizacion.findAll({ where: { identity, active: true } });
    activeAccess.forEach(access => {
        access.active = false;
        access.save();
    });
}

async function accessValidity(access, includeAll = true) {
    let accessRecord = 
    includeAll ? 
        await Autorizacion.findOne({ where: { id: access.aid }, include: [{ model: Miembro, include: [{ model: Archivo, where: { fileName: "Profile Photo" } }] }] })
    :
        await Autorizacion.findOne({ where: { id: access.aid }, include: [{ model: Miembro }] });

    if (!accessRecord) return null;
    if (!Boolean(accessRecord.active)) return null;
    if (new Date() > accessRecord.expiresAt) return null;
    if (accessRecord.identity != access.identity) return null;

    return accessRecord;
}

async function newAccess(params) {
    const user = await Miembro.findOne({ where: { identity: params.user }, include: [{ model: Archivo, where: { fileName: "Profile Photo" }, required: false }] });

    if (!user) {
        return {
            message: "Usuario no encontrado",
            result: false,
            token: null,
            code: 404
        }
    }

    if (!user.allowAccess) {
        return {
            message: "No tiene permiso para acceder",
            result: false,
            token: null,
            code: 403
        }
    }

    if (user.password != params.password) {
        return {
            message: "Contraseña incorrecta",
            result: false,
            token: null,
            code: 403,
        }
    }

    await disableOtherAccess(user.id);

    let newAuthorization = {
        active: true,
        identity: user.id,
        releasedOn: new Date(),
        expiresAt: new Date().setDate(new Date().getDate() +1)
    }

    let authResult = await createAuthorization(newAuthorization);

    if (authResult != null) {
        let token = {
            aid: authResult.id,
            identity: newAuthorization.identity,
            expiresAt: newAuthorization.expiresAt
        }

        let imgData = {};

        if (user.Archivos.length > 0) {
            imgData.mime = user.Archivos[0].contentType;
            imgData.data = user.Archivos[0].content;
        }

        return {
            message: null,
            result: true,
            data: {
                key: Buffer.from(JSON.stringify(token)).toString("base64"),
                user: {
                    userImg: imgData,
                    permissions: user.permissions?.split(",") ?? [],
                    firstName: user.nombre,
                    lastName: user.apellido,
                    identity: user.identity,
                    id: user.id
                }
            },
            code: 200,
        }
    }

    return {
        message: "Ocurrió un error, intente mas tarde.",
        result: false,
        token: null,
        code: 503,
    }
}

async function authorize(req, res) {
    try {
        let { authorization } = req.headers;
        if (authorization == "*") return res.status(401).send({ code: 401, message: "Autorizacion inválida" });

        let access = JSON.parse(Buffer.from(authorization, "base64").toString("utf-8"));
        
        let accessData = await accessValidity(access);
        if (!accessData) return res.status(401).send({ code: 401, message: "Autorizacion inválida" });

        if (!accessData.Miembro.allowAccess) return res.status(401).send({ code: 401, message: "No tiene acceso a la plataforma" });

        let accessJson = accessData.toJSON();
        let imgData = {};

        if (accessJson.Miembro.Archivos.length > 0) {
            imgData.mime = accessJson.Miembro.Archivos[0].contentType;
            imgData.data = accessJson.Miembro.Archivos[0].content;
        }

        // if token is ok
        return res.status(200).send({ 
            userImg: imgData,
            permissions: accessJson.Miembro.permissions?.split(",") ?? [],
            firstName: accessJson.Miembro.nombre,
            lastName: accessJson.Miembro.apellido,
            identity: accessJson.Miembro.identity,
            id: accessJson.Miembro.id
        });
    }
    catch (e) {
        return res.status(401).send({ code: 401, message: "Autorizacion inválida" });
    }
}

function authorizeGuard(isOpen = false) {
    return async (req, res, next) => {       

        let { authorization } = req.headers;
        if (authorization == "*" && !isOpen) return res.status(401).send({ code: 401, message: "Autorizacion inválida" });
        
        if ((!authorization || authorization == "*") && isOpen) return next();

        let access = JSON.parse(Buffer.from(authorization, "base64").toString("utf-8"));
        
        let accessData = await accessValidity(access, false);
        if (!accessData) {
            if (isOpen) return next();
            return res.status(401).send({ code: 401, message: "Autorizacion inválida" });
        }

        let accessJson = accessData.toJSON();

        req.user = {
            permissions: accessJson.Miembro.permissions?.split(",") ?? [],
            identity: accessJson.Miembro.id,
            lastName: accessJson.Miembro.apellido,
            name: accessJson.Miembro.nombre,
        }
        
        next();
    }
}

module.exports = {
    newAccess,
    authorize,
    authorizeGuard
}
