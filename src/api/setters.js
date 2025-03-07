const router = require('express').Router();
const { authorizeGuard } = require('../data/methods/authorizer.js');
const { queryById } = require('../data/modelSchema/getterValidation.js');
const { authorizeSchema } = require('../data/modelSchema/authorizeValidations.js');
const { validatePermission, isAllowedToPermission } = require('../data/models/permissions.js');
const { deleteDepartment, deleteEstacion, deleteUserType } = require('../data/methods/eraser.js');
const { ValidateHeader, ValidateFields, ValidateQuery } = require('../data/methods/validators.js');
const { setVolunteerField, managePermissions, manageEmergencyContacts, manageAcademicPrep, setStacionField, 
    setDepartmentField, setUserTypeField } = require("../data/methods/setters.js");
const { allowAccesValidation, permissionOpValidation, userFieldValidation, contactValidation, academicPrepValidation, 
    stacionFieldValidation, departmentFieldValidation, userTypeFieldValidation, userStatusFieldValidation} = require('../data/modelSchema/setterValidations.js');

router.patch("/voluntario", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateFields(userFieldValidation), validatePermission(["UV"]), async (req, res) => {
    let op = await setVolunteerField(req.fields);
    if (op.result) return res.status(204).send();
    return res.status(op.code).send({ code: op.code, message: op.message });
});

router.patch("/voluntario/status", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateFields(userStatusFieldValidation), async (req, res) => {
    if (req.fields.field.hasOwnProperty("deleted")) {
        let allowDeleteUser = isAllowedToPermission(["DU"], req.user.permissions);
        let allowRestoreUser = isAllowedToPermission(["RDU"], req.user.permissions);

        if ((req.fields.field.deleted && !allowDeleteUser) || (!req.fields.field.deleted && !allowRestoreUser)) {
            return res.status(403).send({ code: 403, message: 'Acción no permitida' });
        }

        let op = await setVolunteerField(req.fields);
        return res.status(op.code).send({ code: op.code, message: op.message });
    }

    if (req.fields.field.hasOwnProperty("checked")) {
        let allowConfirmUserInfo = isAllowedToPermission(["CUI"], req.user.permissions);

        if (req.fields.field.checked && !allowConfirmUserInfo) {
            return res.status(403).send({ code: 403, message: 'Acción no permitida' });
        }

        let op = await setVolunteerField(req.fields);
        return res.status(op.code).send({ code: op.code, message: op.message });
    }

    return res.status(400).send({ code:400, message:"Pedido no procesable"});
});

router.patch("/estacion", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateFields(stacionFieldValidation), validatePermission(["US"]), async (req, res) => {
    let op = await setStacionField(req.fields);
    if (op.result) return res.status(204).send();
    return res.status(op.code).send({ code: op.code, message: op.message });
});

router.patch("/department", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateFields(departmentFieldValidation), validatePermission(["UD"]), async (req, res) => {
    let op = await setDepartmentField(req.fields);
    if (op.result) return res.status(204).send();
    return res.status(op.code).send({ code: op.code, message: op.message });
});

router.patch("/user-type", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateFields(userTypeFieldValidation), validatePermission(["UVT"]), async (req, res) => {
    let op = await setUserTypeField(req.fields);
    if (op.result) return res.status(204).send();
    return res.status(op.code).send({ code: op.code, message: op.message });
});

router.patch("/allow-access", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateFields(allowAccesValidation), validatePermission(["AA"]), async (req, res) => {
    let op = await setVolunteerField(req.fields);
    if (op.result) return res.status(204).send();
    return res.status(op.code).send({ code: op.code, message: op.message });
});

router.patch("/add-permission", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateFields(permissionOpValidation), validatePermission(["GP"]), async (req, res) => {
    let op = await managePermissions(req.fields, true);
    if (op) return res.status(204).send();
    return res.status(204).send({ code: 503, message: "No se pudo guardar el cambio" })
});

router.patch("/remove-permission", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateFields(permissionOpValidation), validatePermission(["RP"]), async (req, res) => {
    let op = await managePermissions(req.fields, false);
    if (op) return res.status(204).send();
    return res.status(503).send({ code: 503, message: "No se pudo guardar el cambio" })
});

router.patch("/add-contact", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateFields(contactValidation), validatePermission(["AEC"]), async (req, res) => {
    let op = await manageEmergencyContacts(req.fields, true);
    return res.status(op.code).send({ code: op.code, message: op.message });
});

router.patch("/add-academic", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateFields(academicPrepValidation), validatePermission(["AAI"]), async (req, res) => {
    let op = await manageAcademicPrep(req.fields, true);
    return res.status(op.code).send({ code: op.code, message: op.message });
});

router.patch("/restore/department", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateQuery(queryById), validatePermission(["RDE"]), async (req, res) => {
    let op = await deleteDepartment(req.query.id, false);
    return res.status(op.code).send({ code: op.code, message: op.message });
});

router.patch("/restore/estacion", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateQuery(queryById), validatePermission(["RDE"]), async (req, res) => {
    let op = await deleteEstacion(req.query.id, false);
    return res.status(op.code).send({ code: op.code, message: op.message });
});

router.patch("/restore/user-type", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateQuery(queryById), validatePermission(["RDE"]), async (req, res) => {
    let op = await deleteUserType(req.query.id, false);
    return res.status(op.code).send({ code: op.code, message: op.message });
});

module.exports = router;