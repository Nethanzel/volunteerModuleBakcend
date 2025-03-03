const router = require('express').Router();
const { authorizeGuard } = require('../data/methods/authorizer.js');
const { authorizeSchema } = require('../data/modelSchema/authorizeValidations.js');
const { ValidateQuery, ValidateHeader } = require("../data/methods/validators.js");
const { queryById, queryByPageNumber } = require("../data/modelSchema/getterValidation.js");
const { validatePermission, PermissionsList, isAllowedToPermission } = require('../data/models/permissions.js');
const { getMember, getGrado, getEscuela, getTipoMiembro, getMembers } = require("../data/methods/getters.js");

router.get("/miembro", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateQuery(queryById), validatePermission(["QV"]), async (req, res) => {
    let { id } = req.query
    
    let miembro = await getMember(id, isAllowedToPermission(["QDI"], req.user.permissions), isAllowedToPermission(["QDF"], req.user.permissions), isAllowedToPermission(["VNC"], req.user.permissions)).catch(() => false);
    if(!miembro) return res.status(404).send({status: 404, message: "No results where found."});

    res.status(200).send(miembro);
});

router.get("/miembros", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateQuery(queryByPageNumber), validatePermission(["QVL"]), async (req, res) => {
    let { page } = req.query;
    let miembros = await getMembers(page, isAllowedToPermission(["QDI"], req.user.permissions), isAllowedToPermission(["QDF"], req.user.permissions), isAllowedToPermission(["VNC"], req.user.permissions)).catch(() => false);
    if(!miembros) return res.status(404).send({status: 404, message: "No results where found."});

    res.status(200).send(miembros);
});

router.get("/escuela", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateQuery(queryById), async (req, res) => {
    let { id } = req.query;

    let escuela = await getEscuela(id, isAllowedToPermission(["QDI"], req.user.permissions)).catch(() => false);
    if(!escuela) return res.status(404).send({status: 404, message: "No results where found."});
    
    res.status(200).send(escuela);
});

router.get("/tipo-miembro", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateQuery(queryById), async (req, res) => {
    let { id } = req.query;

    let tipo = await getTipoMiembro(id, isAllowedToPermission(["QDI"], req.user.permissions)).catch(() => false);
    if(!tipo) return res.status(404).send({status: 404, message: "No results where found."});
    
    res.status(200).send(tipo);
});

router.get("/grado", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateQuery(queryById), async (req, res) => {
    let { id } = req.query;

    let grado = await getGrado(id, isAllowedToPermission(["QDI"], req.user.permissions)).catch(() => false);
    if(!grado) return res.status(404).send({status: 404, message: "No results where found."});
    
    res.status(200).send(grado);
});

router.get("/permisos", ValidateHeader(authorizeSchema), authorizeGuard(), (req, res) => res.status(200).send(PermissionsList));

module.exports = router;