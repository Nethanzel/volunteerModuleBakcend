const { PassThrough } = require("stream");
const router = require('express').Router();
const { getUserFiles } = require('../data/methods/getters');
const { authorizeGuard } = require('../data/methods/authorizer');
const { eraseFile } = require('../data/modelSchema/eraseValidations');
const { queryById } = require('../data/modelSchema/getterValidation');
const { authorizeSchema } = require('../data/modelSchema/authorizeValidations');
const { fileFieldValidation } = require('../data/modelSchema/setterValidations');
const { uploadSchema, fileSchema } = require('../data/modelSchema/creatorValidation');
const { newFile, deleteFile, updateFile, getFileById } = require('../data/methods/files');
const { validatePermission, isAllowedToPermission } = require('../data/models/permissions');
const { ValidateHeader, ValidateFiles, ValidateFields, ValidateQuery } = require('../data/methods/validators');

router.post("/upload", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateFiles(uploadSchema), ValidateFields(fileSchema), validatePermission(["AF"]), async (req, res) => {
    let op = await newFile(req.fields, req.files.file);
    return res.status(op.code).send({ code:op.code, message:op.message });
});

router.get("/download", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateQuery(queryById), validatePermission(["DF"]), async (req, res) => {
    const file = await getFileById(req.query.id, true, isAllowedToPermission(["QDF"], req.user.permissions));
    if (!file) return res.status(404).send({ code:404, message:'Archivo no encontrado' })
    
    const fileStream = new PassThrough();
    fileStream.end(file.content);

    res.setHeader("Content-Type", file.contentType);
    res.setHeader("Content-Length", file.content.length);
    res.setHeader("Content-Disposition", `attachment; filename=${file.fileName}.${file.ext}`);

    fileStream.pipe(res);
});

router.get("/", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateQuery(queryById), validatePermission(["QF"]), async (req, res) => {
    let op = await getUserFiles(req.query.id, isAllowedToPermission(["QDF"], req.user.permissions));
    res.status(200).send(op);
});

router.delete("/status", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateFields(eraseFile), validatePermission(["DF"]), async (req, res) => {
    let op = await deleteFile(req.fields, true);    
    res.status(op.code).send({ code:op.code, message:op.message });
});

router.patch("/status", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateFields(eraseFile), validatePermission(["RDF"]), async (req, res) => {
    let op = await deleteFile(req.fields, false);    
    res.status(op.code).send({ code:op.code, message:op.message });
});

router.patch("/", ValidateHeader(authorizeSchema), authorizeGuard(), ValidateFields(fileFieldValidation), validatePermission(["UF"]), async (req, res) => {
    let op = await updateFile(req.fields, false);    
    res.status(op.code).send({ code:op.code, message:op.message });
});

module.exports = router;
