const { validatePermission, isAllowedToPermission } = require('../data/models/permissions');
const { generateMemberForm, generateMembersForm } = require('../reports/printer/print');
const { authorizeSchema } = require('../data/modelSchema/authorizeValidations');
const { getMember, getMembers } = require('../data/methods/getters');
const { authorizeGuard } = require('../data/methods/authorizer');
const { ValidateHeader } = require('../data/methods/validators');
const router = require('express').Router();

router.get("/print/member", ValidateHeader(authorizeSchema), authorizeGuard(), validatePermission(["QV","PMF"]), async (req, res) => {
    let member = await getMember(req.query.id, isAllowedToPermission(["QDI"], req.user.permissions), isAllowedToPermission(["QDF"], req.user.permissions), isAllowedToPermission(["VNC"], req.user.permissions)).catch(() => false);

    if(member) {
        let pdf = await generateMemberForm(member);
        if (!pdf) return res.status(503).send({status: 503, message: "No se pudo generar el formulario."});

        res.setHeader("Content-Length", pdf.length);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${member.nombre}.pdf"`);

        const pdfBuffer = Buffer.from(pdf, 'base64');
        return res.status(201).send(pdfBuffer);
    }

    return res.status(404).send({status: 404, message: "Registro no encontrado."});
});

router.get("/print/members", ValidateHeader(authorizeSchema), authorizeGuard(), validatePermission(["QVL","PML"]), async (req, res) => {
    let miembros = await getMembers(null, isAllowedToPermission(["QDI"], req.user.permissions), isAllowedToPermission(["QDF"], req.user.permissions), isAllowedToPermission(["VNC"], req.user.permissions)).catch(() => false);
    
    if(miembros?.count > 0) {
        let pdf = await generateMembersForm(miembros);
        if (!pdf) return res.status(503).send({status: 503, message: "No se pudo generar el reporte."});

        res.setHeader("Content-Length", pdf.length);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="miembros.pdf"`);

        const pdfBuffer = Buffer.from(pdf, 'base64');
        return res.status(201).send(pdfBuffer);
    }
    
    return res.status(404).send({status: 404, message: "No se cargaron registros."});
});

module.exports = router;