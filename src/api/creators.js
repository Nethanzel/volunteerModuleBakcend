const router = require('express').Router();
const { authorizeGuard } = require('../data/methods/authorizer.js');
const { validatePermission } = require('../data/models/permissions.js');
const { authorizeSchema } = require('../data/modelSchema/authorizeValidations.js');
const { ValidateFields, ValidateHeader } = require("../data/methods/validators.js");
const { tipomiembroMV, gradoMV, escuelaMV, miembroMV, validateHighlighy, validateSchedule, validatePractica } = require('../data/modelSchema/creatorValidation.js');
const { createMember, createGrado, createEscuela, createTipoMiembro, memberPrepare, createHighlight, createSchedule, createPractica } = require("../data/methods/creators");
const { prepareImage } = require('../utils/imageResize.js');

router.post("/miembro", ValidateFields(miembroMV), async (req, res) => {
    let image = null;
    if (req.fields.step_5?.image) {
        image = {};
        image.file = await prepareImage(req.fields.step_5?.image.file, 250);
        image.type = req.fields.step_5?.image.contentType;
        image.ext = req.fields.step_5?.image.ext;
    }
    let result = await createMember(memberPrepare(req.fields), image).catch(() => false);
    if (!result.result) return res.status(result.code).send({status: result.code, message: result.message});

    if (req.fields.step_7?.isProfessor == true) {
        for (let school of req.fields.step_7.schools) {
            await createEscuela({...school, ...{ liderId: result.uid, deleted: true }}).catch(() => false);
        }
    }

    res.status(201).send({ userCode: result.userCode });
});

router.post("/escuela", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateFields(escuelaMV), validatePermission(["CS"]), async (req, res) => {
    let result = await createEscuela(req.fields).catch(() => false);
    if(!result) return res.status(503).send({status: 503, message: "Unable to create the new resource."})
    res.status(201).send();
});

router.post("/grado", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateFields(gradoMV), validatePermission(["CD"]), async (req, res) => {
    let result = await createGrado(req.fields).catch(() => false);
    if(!result) return res.status(503).send({status: 503, message: "Unable to create the new resource."})
    res.status(201).send();
});

router.post("/user-type", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateFields(tipomiembroMV), validatePermission(["CVT"]), async (req, res) => {
    let result = await createTipoMiembro(req.fields).catch(() => false);
    if(!result) return res.status(503).send({status: 503, message: "Unable to create the new resource."})
    res.status(201).send();
});

router.post("/highlight", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateFields(validateHighlighy), validatePermission(["CH"]), async (req, res) => {
    let result = await createHighlight(req.fields).catch(() => false);
    if(!result) return res.status(503).send({status: 503, message: "Unable to create the new resource."})
    res.status(201).send();
});

router.post("/schedule", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateFields(validateSchedule), validatePermission(["CPS"]), async (req, res) => {
    let result = await createSchedule(req.fields).catch(() => false);
    if(!result) return res.status(503).send({status: 503, message: "Unable to create the new resource."})
    res.status(201).send();
});

router.post("/practice", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateFields(validatePractica), validatePermission(["CPR"]), async (req, res) => {
    let result = await createPractica(req.fields).catch(() => false);
    if(!result) return res.status(503).send({status: 503, message: "Unable to create the new resource."})
    res.status(201).send();
});

module.exports = router;