const router = require('express').Router();
const {getDepartamento, getEstacion,getTipoVoluntario} = require("../data/methods/getters.js");

router.get("/estaciones", async (req, res) => {

    res.status(200).send(await getEstacion());
});

router.get("/tipovoluntarios",async (req, res) => {

    res.status(200).send(await getTipoVoluntario());
});

router.get("/departamentos", async (req, res) => {

    res.status(200).send(await getDepartamento());
});

module.exports = router;