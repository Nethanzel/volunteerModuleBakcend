const router = require('express').Router();
const { ValidateQuery } = require('../data/methods/validators.js');
const { authorizeGuard } = require('../data/methods/authorizer.js');
const { isAllowedToPermission } = require('../data/models/permissions.js');
const { queryIdentity } = require('../data/modelSchema/getterValidation.js');
const { validateEmail } = require('../data/modelSchema/creatorValidation.js');
const { trainingTypes } = require('../data/models/dictionaries/trainingTypes.js');
const {getGrados, getEscuelas, getTipoMiembros, getIdentificationExistence} = require("../data/methods/getters.js");

router.get("/escuelas", authorizeGuard(true), async (req, res) => {
    let result = await getEscuelas(isAllowedToPermission(["QDI"], req.user?.permissions)).catch(() => false);
    if(!result) return res.status(503).send();
    res.status(200).send(result);
});

router.get("/tipo-miembro", authorizeGuard(true), async (req, res) => {
    let result = await getTipoMiembros(isAllowedToPermission(["QDI"], req.user?.permissions)).catch(() => false);
    if(!result) return res.status(503).send();
    res.status(200).send(result);
});

router.get("/tipo-entrenamiento", async (req, res) => res.status(200).send(trainingTypes));

router.get("/grados", authorizeGuard(true), async (req, res) => {
    let result = await getGrados(isAllowedToPermission(["QDI"], req.user?.permissions)).catch(() => false);
    if(!result) return res.status(503).send();
    res.status(200).send(result);
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

module.exports = router;