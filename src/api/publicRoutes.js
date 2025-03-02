const router = require('express').Router();
const { ValidateQuery } = require('../data/methods/validators.js');
const { authorizeGuard } = require('../data/methods/authorizer.js');
const { isAllowedToPermission } = require('../data/models/permissions.js');
const { queryIdentity } = require('../data/modelSchema/getterValidation.js');
const {getDepartamentos, getEstaciones, getTipoVoluntarios, getIdentificationExistence} = require("../data/methods/getters.js");
const { validateEmail } = require('../data/modelSchema/creatorValidation.js');

router.get("/estaciones", authorizeGuard(true), async (req, res) => {
    let result = await getEstaciones(isAllowedToPermission(["QDI"], req.user?.permissions)).catch(() => false);
    if(!result) return res.status(503).send();
    res.status(200).send(result);
});

router.get("/user-types", authorizeGuard(true), async (req, res) => {
    let result = await getTipoVoluntarios(isAllowedToPermission(["QDI"], req.user?.permissions)).catch(() => false);
    if(!result) return res.status(503).send();
    res.status(200).send(result);
});

router.get("/departamentos", authorizeGuard(true), async (req, res) => {
    let result = await getDepartamentos(isAllowedToPermission(["QDI"], req.user?.permissions)).catch(() => false);
    if(!result) return res.status(503).send();
    res.status(200).send(result);
});

router.get("/identification-existis", ValidateQuery(queryIdentity), async (req, res) => {
    let identityExists = await getIdentificationExistence(req.query.identity);
    let { error } = validateEmail.validate({ email: req.query.email });

    return res.status(200).send({ identityExists, isValidEmail: error ? false : true });
});

module.exports = router;