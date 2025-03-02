const router = require('express').Router();
const { authorizeGuard } = require('../data/methods/authorizer.js');
const { validatePermission } = require('../data/models/permissions.js');
const { authorizeSchema } = require('../data/modelSchema/authorizeValidations.js');
const { ValidateFields, ValidateHeader } = require("../data/methods/validators.js");
const { tipoVoluntarioMV, departamentoMV, estacionMV, voluntarioMV } = require('../data/modelSchema/creatorValidation.js');
const { createVolunteer, createDepartamento, createEstacion, createTipoVoluntario, volunteerPrepare } = require("../data/methods/creators");

router.post("/voluntario", ValidateFields(voluntarioMV), async (req, res) => {
    let result = await createVolunteer(volunteerPrepare(req.fields)).catch(() => false);
    if(result === 1) return res.status(208).send({status: 208, message: "That record has already been done."})
    if(!result) return res.status(503).send({status: 503, message: "Unable to create the new resource."})
    res.status(201).send();
});

router.post("/estacion", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateFields(estacionMV), validatePermission(["CS"]), async (req, res) => {
    let result = await createEstacion(req.fields).catch(() => false);
    if(!result) return res.status(503).send({status: 503, message: "Unable to create the new resource."})
    res.status(201).send();
});

router.post("/departamento", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateFields(departamentoMV), validatePermission(["CD"]), async (req, res) => {
    let result = await createDepartamento(req.fields).catch(() => false);
    if(!result) return res.status(503).send({status: 503, message: "Unable to create the new resource."})
    res.status(201).send();
});

router.post("/user-type", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateFields(tipoVoluntarioMV), validatePermission(["CVT"]), async (req, res) => {
    let result = await createTipoVoluntario(req.fields).catch(() => false);
    if(!result) return res.status(503).send({status: 503, message: "Unable to create the new resource."})
    res.status(201).send();
});



module.exports = router;