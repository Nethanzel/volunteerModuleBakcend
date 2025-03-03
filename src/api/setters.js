const router = require('express').Router();
const { authorizeGuard } = require('../data/methods/authorizer.js');
const { queryById } = require('../data/modelSchema/getterValidation.js');
const { authorizeSchema } = require('../data/modelSchema/authorizeValidations.js');
const { validatePermission, isAllowedToPermission } = require('../data/models/permissions.js');
const { deleteLevel, deleteEscuela, deleteUserType } = require('../data/methods/eraser.js');
const { ValidateHeader, ValidateFields, ValidateQuery } = require('../data/methods/validators.js');
const { setMemberField, managePermissions, manageEmergencyContacts, manageAcademicPrep, setSchoolField, 
    setLevelField, setUserTypeField } = require("../data/methods/setters.js");
const { allowAccesValidation, permissionOpValidation, userFieldValidation, contactValidation, academicPrepValidation, 
    schoolFieldValidation, levelFieldValidation, userTypeFieldValidation, userStatusFieldValidation} = require('../data/modelSchema/setterValidations.js');

router.patch("/miembro", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateFields(userFieldValidation), validatePermission(["UV"]), async (req, res) => {
    let op = await setMemberField(req.fields);
    if (op.result) return res.status(204).send();
    return res.status(op.code).send({ code: op.code, message: op.message });
});

router.patch("/miembro/status", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateFields(userStatusFieldValidation), async (req, res) => {
    if (req.fields.field.hasOwnProperty("deleted")) {
        let allowDeleteUser = isAllowedToPermission(["DU"], req.user.permissions);
        let allowRestoreUser = isAllowedToPermission(["RDU"], req.user.permissions);

        if ((req.fields.field.deleted && !allowDeleteUser) || (!req.fields.field.deleted && !allowRestoreUser)) {
            return res.status(403).send({ code: 403, message: 'Acción no permitida' });
        }

        let op = await setMemberField(req.fields);
        return res.status(op.code).send({ code: op.code, message: op.message });
    }

    if (req.fields.field.hasOwnProperty("checked")) {
        let allowConfirmUserInfo = isAllowedToPermission(["CUI"], req.user.permissions);

        if (req.fields.field.checked && !allowConfirmUserInfo) {
            return res.status(403).send({ code: 403, message: 'Acción no permitida' });
        }

        let op = await setMemberField(req.fields);
        return res.status(op.code).send({ code: op.code, message: op.message });
    }

    return res.status(400).send({ code:400, message:"Pedido no procesable"});
});

router.patch("/escuela", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateFields(schoolFieldValidation), validatePermission(["US"]), async (req, res) => {
    let op = await setSchoolField(req.fields);
    if (op.result) return res.status(204).send();
    return res.status(op.code).send({ code: op.code, message: op.message });
});

router.patch("/level", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateFields(levelFieldValidation), validatePermission(["UD"]), async (req, res) => {
    let op = await setLevelField(req.fields);
    if (op.result) return res.status(204).send();
    return res.status(op.code).send({ code: op.code, message: op.message });
});

router.patch("/user-type", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateFields(userTypeFieldValidation), validatePermission(["UVT"]), async (req, res) => {
    let op = await setUserTypeField(req.fields);
    if (op.result) return res.status(204).send();
    return res.status(op.code).send({ code: op.code, message: op.message });
});

router.patch("/allow-access", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateFields(allowAccesValidation), validatePermission(["AA"]), async (req, res) => {
    let op = await setMemberField(req.fields);
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

router.patch("/restore/level", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateQuery(queryById), validatePermission(["RDE"]), async (req, res) => {
    let op = await deleteLevel(req.query.id, false);
    return res.status(op.code).send({ code: op.code, message: op.message });
});

router.patch("/restore/escuela", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateQuery(queryById), validatePermission(["RDE"]), async (req, res) => {
    let op = await deleteEscuela(req.query.id, false);
    return res.status(op.code).send({ code: op.code, message: op.message });
});

router.patch("/restore/user-type", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateQuery(queryById), validatePermission(["RDE"]), async (req, res) => {
    let op = await deleteUserType(req.query.id, false);
    return res.status(op.code).send({ code: op.code, message: op.message });
});

module.exports = router;