const router = require('express').Router();
const { ValidateFields, ValidateHeader } = require('../data/methods/validators.js');
const { newAccess, authorize } = require("../data/methods/authorizer.js");
const { crendentialsModel, authorizeSchema } = require("../data/modelSchema/authorizeValidations.js");

router.get("/", ValidateHeader(authorizeSchema), authorize);

router.post("/login", ValidateFields(crendentialsModel), async (req, res) => {
    let result = await newAccess(req.fields);
    if (!result.result) return res.status(result.code).send({ message: result.message, status: result.code });

    return res.status(200).send(result.data);
});

module.exports = router;
