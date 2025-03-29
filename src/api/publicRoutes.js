const router = require('express').Router();
const { ValidateQuery } = require('../data/methods/validators.js');
const { authorizeGuard } = require('../data/methods/authorizer.js');
const { convertFromBase64 } = require('../reports/assets/utils.js');
const { dayOfWeek } = require('../data/models/dictionaries/dayOfWeek.js');
const { isAllowedToPermission } = require('../data/models/permissions.js');
const { validateEmail } = require('../data/modelSchema/creatorValidation.js');
const { trainingTypes } = require('../data/models/dictionaries/trainingTypes.js');
const { queryIdentity, queryMemberCode } = require('../data/modelSchema/getterValidation.js');
const {getGrados, getEscuelas, getTipoMiembros, getIdentificationExistence, getHighlights, getMember} = require("../data/methods/getters.js");

router.get("/escuelas", authorizeGuard(true), async (req, res) => {
    let { page, shorten, schedule } = req.query;
    let result = await getEscuelas(isAllowedToPermission(["QDI"], req.user?.permissions), page, shorten ? JSON.parse(shorten) : false, schedule ? JSON.parse(schedule) : false).catch(() => false);
    if(!result) return res.status(503).send();
    res.status(200).send(result);
});

router.get("/tipo-miembro", authorizeGuard(true), async (req, res) => {
    let { page } = req.query;
    let result = await getTipoMiembros(isAllowedToPermission(["QDI"], req.user?.permissions), page).catch(() => false);
    if(!result) return res.status(503).send();
    res.status(200).send(result);
});

router.get("/tipo-entrenamiento", async (req, res) => res.status(200).send(trainingTypes));
router.get("/dias-semana", async (req, res) => res.status(200).send(dayOfWeek));

router.get("/grados", authorizeGuard(true), async (req, res) => {
    let { page } = req.query;
    let result = await getGrados(isAllowedToPermission(["QDI"], req.user?.permissions), page).catch(() => false);
    if(!result) return res.status(503).send();
    res.status(200).send(result);
});

router.get("/highlights", authorizeGuard(true), async (req, res) => {
    let { page } = req.query;
    let result = await getHighlights(isAllowedToPermission(["QDI"], req.user?.permissions), isAllowedToPermission(["QH"], req.user?.permissions), page).catch(() => false);
    if(!result) return res.status(503).send();
    res.status(200).send(result.rows);
});

router.get("/identification-existis", ValidateQuery(queryIdentity), async (req, res) => {
    let identityExists = false;
    if (req.query.identity) {
        identityExists = await getIdentificationExistence(req.query.identity);
    }
    
    let emailError = null;
    if (req.query.email) {
        let { error } = validateEmail.validate({ email: req.query.email });
        emailError = error;
    }

    return res.status(200).send({ identityExists, isValidEmail: emailError ? false : true });
});

router.get("/miembro", ValidateQuery(queryMemberCode), async (req, res) => {
    let miembro = await getMember(null, false, false, false, convertFromBase64(req.query['member-code'])).catch(() => false);
    if(!miembro) return res.status(404).send({status: 404, message: "Registro no encontrado."});

    res.status(200).send(miembro);
});

module.exports = router;