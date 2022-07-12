const router = require('express').Router();
const { getVolunteer, getDepartamento, getEstacion, getTipoVoluntario, getVolunteers } = require("../data/methods/getters.js");

router.get("/voluntario", async (req, res) => {
    let { id } = req.query;
    if(!id) return res.status(400).send({status: 400, message: "Missing required parameter(s)."});

    let voluntario = await getVolunteer(id).catch(() => false);
    if(!voluntario) return res.status(404).send({status: 404, message: "No results where found."});

    res.status(200).send(voluntario);
});

router.get("/voluntarios", async (req, res) => {
    let { page } = req.query;
    if(!page) return res.status(400).send({status: 400, message: "Missing required parameter(s)."});

    let voluntarios = await getVolunteers(page).catch(() => false);
    console.log(voluntarios);
    if(!voluntarios) return res.status(404).send({status: 404, message: "No results where found."});

    res.status(200).send(voluntarios);
});

router.get("/estacion", async (req, res) => {
    let { id } = req.query;
    if(!id) return res.status(400).send({status: 400, message: "Missing required parameter(s)."});

    let estacion = await getEstacion(id).catch(() => false);
    if(!estacion) return res.status(404).send({status: 404, message: "No results where found."});
    
    res.status(200).send(estacion);
});

router.get("/tipovoluntario", async (req, res) => {
    let { id } = req.query;
    if(!id) return res.status(400).send({status: 400, message: "Missing required parameter(s)."});

    let tipo = await getTipoVoluntario(id).catch(() => false);
    if(!tipo) return res.status(404).send({status: 404, message: "No results where found."});
    
    res.status(200).send(tipo);
});

router.get("/departamento", async (req, res) => {
    let { id } = req.query;
    if(!id) return res.status(400).send({status: 400, message: "Missing required parameter(s)."});

    let departamento = await getDepartamento(id).catch(() => false);
    if(!departamento) return res.status(404).send({status: 404, message: "No results where found."});
    
    res.status(200).send(departamento);
});

module.exports = router;