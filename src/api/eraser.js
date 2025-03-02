const router = require('express').Router();
const { authorizeGuard } = require('../data/methods/authorizer.js');
const { validatePermission } = require('../data/models/permissions.js');
const { queryById } = require('../data/modelSchema/getterValidation.js');
const { authorizeSchema } = require('../data/modelSchema/authorizeValidations.js');
const { manageEmergencyContacts, manageAcademicPrep } = require('../data/methods/setters.js');
const { deleteEstacion, deleteDepartment, deleteUserType } = require('../data/methods/eraser.js');
const { ValidateFields, ValidateHeader, ValidateQuery } = require("../data/methods/validators.js");
const { eraseContactValidation, eraseAcademicValidation } = require("../data/modelSchema/eraseValidations.js");

router.delete("/remove-contact", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateFields(eraseContactValidation), validatePermission(["DEC"]), async (req, res) => {
    let op = await manageEmergencyContacts(req.fields, false);
    return res.status(op.code).send({ code: op.code, message: op.message });
});

router.delete("/remove-academic", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateFields(eraseAcademicValidation), validatePermission(["DAI"]), async (req, res) => {
    let op = await manageAcademicPrep(req.fields, false);
    return res.status(op.code).send({ code: op.code, message: op.message });
});

router.delete("/department", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateQuery(queryById), validatePermission(["DD"]), async (req, res) => {
    let op = await deleteDepartment(req.query.id, true);
    return res.status(op.code).send({ code: op.code, message: op.message });
});

router.delete("/estacion", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateQuery(queryById), validatePermission(["DE"]), async (req, res) => {
    let op = await deleteEstacion(req.query.id, true);
    return res.status(op.code).send({ code: op.code, message: op.message });
});

router.delete("/user-type", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateQuery(queryById), validatePermission(["DVT"]), async (req, res) => {
    let op = await deleteUserType(req.query.id, true);
    return res.status(op.code).send({ code: op.code, message: op.message });
});

module.exports = router;