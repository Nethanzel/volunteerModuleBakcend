const router = require('express').Router();
const {getDepartamentos, getEstaciones, getTipoVoluntarios} = require("../data/methods/getters.js");

router.get("/estaciones", async (req, res) => {
    let result = await getEstaciones();
    if(!result) return res.status(503).send();
    res.status(200).send(result);
});

router.get("/tipovoluntarios",async (req, res) => {
    let result = await getTipoVoluntarios();
    if(!result) return res.status(503).send();
    res.status(200).send(result);
});

router.get("/departamentos", async (req, res) => {
    let result = await getDepartamentos()
    if(!result) return res.status(503).send();
    res.status(200).send(result);
});

module.exports = router;