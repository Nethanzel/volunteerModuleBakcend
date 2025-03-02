const router = require('express').Router();
const { authorizeGuard } = require('../data/methods/authorizer.js');
const { authorizeSchema } = require('../data/modelSchema/authorizeValidations.js');
const { ValidateQuery, ValidateHeader } = require("../data/methods/validators.js");
const { queryById, queryByPageNumber } = require("../data/modelSchema/getterValidation.js");
const { validatePermission, PermissionsList, isAllowedToPermission } = require('../data/models/permissions.js');
const { getVolunteer, getDepartamento, getEstacion, getTipoVoluntario, getVolunteers } = require("../data/methods/getters.js");

router.get("/voluntario", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateQuery(queryById), validatePermission(["QV"]), async (req, res) => {
    let { id } = req.query
    
    let voluntario = await getVolunteer(id, isAllowedToPermission(["QDI"], req.user.permissions), isAllowedToPermission(["QDF"], req.user.permissions), isAllowedToPermission(["VNC"], req.user.permissions)).catch(() => false);
    if(!voluntario) return res.status(404).send({status: 404, message: "No results where found."});

    res.status(200).send(voluntario);
});

router.get("/voluntarios", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateQuery(queryByPageNumber), validatePermission(["QVL"]), async (req, res) => {
    let { page } = req.query;
    let voluntarios = await getVolunteers(page, isAllowedToPermission(["QDI"], req.user.permissions), isAllowedToPermission(["QDF"], req.user.permissions), isAllowedToPermission(["VNC"], req.user.permissions)).catch(() => false);
    if(!voluntarios) return res.status(404).send({status: 404, message: "No results where found."});

    res.status(200).send(voluntarios);
});

router.get("/estacion", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateQuery(queryById), async (req, res) => {
    let { id } = req.query;

    let estacion = await getEstacion(id, isAllowedToPermission(["QDI"], req.user.permissions)).catch(() => false);
    if(!estacion) return res.status(404).send({status: 404, message: "No results where found."});
    
    res.status(200).send(estacion);
});

router.get("/tipovoluntario", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateQuery(queryById), async (req, res) => {
    let { id } = req.query;

    let tipo = await getTipoVoluntario(id, isAllowedToPermission(["QDI"], req.user.permissions)).catch(() => false);
    if(!tipo) return res.status(404).send({status: 404, message: "No results where found."});
    
    res.status(200).send(tipo);
});

router.get("/departamento", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateQuery(queryById), async (req, res) => {
    let { id } = req.query;

    let departamento = await getDepartamento(id, isAllowedToPermission(["QDI"], req.user.permissions)).catch(() => false);
    if(!departamento) return res.status(404).send({status: 404, message: "No results where found."});
    
    res.status(200).send(departamento);
});

router.get("/permisos", ValidateHeader(authorizeSchema), authorizeGuard(), (req, res) => res.status(200).send(PermissionsList));

module.exports = router;