const router = require('express').Router();
const { authorizeGuard } = require('../data/methods/authorizer.js');
const { authorizeSchema } = require('../data/modelSchema/authorizeValidations.js');
const { ValidateQuery, ValidateHeader, ValidateFilters } = require("../data/methods/validators.js");
const { validatePermission, PermissionsList, isAllowedToPermission } = require('../data/models/permissions.js');
const { queryById, queryByPageNumber, queryByIdAndPage, memberQueryFilters, queryByIdAndPageOptional } = require("../data/modelSchema/getterValidation.js");
const { getMember, getGrado, getEscuela, getTipoMiembro, getMembers, getMembersNames, getHighlights, getSchoolSchedule, getSchoolPractices, getLevelResume, getMembersResume } = require("../data/methods/getters.js");

router.get("/miembro", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateQuery(queryById), validatePermission(["QV"]), async (req, res) => {
    let { id } = req.query
    
    let miembro = await getMember(id, isAllowedToPermission(["QDI"], req.user.permissions), isAllowedToPermission(["QDF"], req.user.permissions), isAllowedToPermission(["VNC"], req.user.permissions)).catch(() => false);
    if(!miembro) return res.status(404).send({status: 404, message: "Registro no encontrado."});

    res.status(200).send(miembro);
});

router.get("/miembros", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateQuery(queryByPageNumber), validatePermission(["QVL"]), async (req, res) => {
    let { page, filters } = req.query;
    
    let filterValidation = ValidateFilters(memberQueryFilters, filters);
    if (!filterValidation.isValid) return res.status(filterValidation.status).send({ status: filterValidation.status, message: filterValidation.message });  
    
    let miembros = await getMembers(page, isAllowedToPermission(["QDI"], req.user.permissions), isAllowedToPermission(["QDF"], req.user.permissions), isAllowedToPermission(["VNC"], req.user.permissions), filterValidation.filters).catch(() => false);
    if(!miembros) return res.status(404).send({status: 404, message: "No se encontraron registros."});

    res.status(200).send(miembros);
});

router.get("/miembros/nombres", ValidateHeader(authorizeSchema), authorizeGuard(), validatePermission(["QVL"]), async (req, res) => {
    let { id, name } = req.query;
    let miembros = await getMembersNames(id, name).catch(() => false);
    if(!miembros) return res.status(404).send({status: 404, message: "No se encontraron registros."});
    res.status(200).send(miembros);
});

router.get("/escuela", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateQuery(queryById), async (req, res) => {
    let { id } = req.query;

    let escuela = await getEscuela(id, isAllowedToPermission(["QDI"], req.user.permissions)).catch(() => false);
    if(!escuela) return res.status(404).send({status: 404, message: "No se encontraron registros."});
    
    res.status(200).send(escuela);
});

router.get("/tipo-miembro", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateQuery(queryById), async (req, res) => {
    let { id } = req.query;

    let tipo = await getTipoMiembro(id, isAllowedToPermission(["QDI"], req.user.permissions)).catch(() => false);
    if(!tipo) return res.status(404).send({status: 404, message: "No se encontraron registros."});
    
    res.status(200).send(tipo);
});

router.get("/grado", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateQuery(queryById), async (req, res) => {
    let { id } = req.query;

    let grado = await getGrado(id, isAllowedToPermission(["QDI"], req.user.permissions)).catch(() => false);
    if(!grado) return res.status(404).send({status: 404, message: "No se encontraron registros."});
    
    res.status(200).send(grado);
});

router.get("/permisos", ValidateHeader(authorizeSchema), authorizeGuard(), (req, res) => res.status(200).send(PermissionsList));

router.get("/highlights", authorizeGuard(), validatePermission(["QH"]), async (req, res) => {
    let { page } = req.query;
    let result = await getHighlights(isAllowedToPermission(["QDI"], req.user?.permissions), true, page).catch(() => false);
    if(!result) return res.status(503).send();
    res.status(200).send(result);
});

router.get("/schedule", authorizeGuard(), validatePermission(["QPS"]), ValidateQuery(queryByIdAndPage), async (req, res) => {
    let { page, id, shorten } = req.query;
    let result = await getSchoolSchedule(id, isAllowedToPermission(["QDI"], req.user?.permissions), page, shorten).catch(() => false);
    if(!result) return res.status(503).send();
    res.status(200).send(result);
});

router.get("/practice", authorizeGuard(), validatePermission(["QPR"]), ValidateQuery(queryByIdAndPageOptional), async (req, res) => {
    let { page, id } = req.query;
    let result = await getSchoolPractices(id, isAllowedToPermission(["QDI"], req.user?.permissions), page).catch(() => false);
    if(!result) return res.status(503).send();
    res.status(200).send(result);
});

router.get("/members-by-level", authorizeGuard(), async (req, res) => {
    let result = await getLevelResume(isAllowedToPermission(["VNC"], req.user.permissions)).catch(() => false);
    if(!result) return res.status(503).send();
    res.status(200).send(result);
});

router.get("/members-resume", authorizeGuard(), async (req, res) => {
    let result = await getMembersResume(isAllowedToPermission(["VNC"], req.user.permissions)).catch(() => false);
    if(!result) return res.status(503).send();
    res.status(200).send(result);
});

module.exports = router;