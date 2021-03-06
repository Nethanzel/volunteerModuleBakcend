const router = require('express').Router();
const { createVolunteer, createDepartamento, createEstacion, createTipoVoluntario, volunteerPrepare } = require("../data/methods/creators");

router.post("/voluntario", async (req, res) => {
    const fields = ["step_1", "step_2", "step_3", "step_4", "step_5"];

    if(fields.length != Object.keys(req.fields.data).length) return res.status(400).send({status: 400, message: "Invalid model."});

    for(var key in req.fields.data) {
        if(!fields.includes(key)) return res.status(400).send({status: 400, message: "The model has invalid fields."});
    }

    let newVolunteer = volunteerPrepare(req.fields.data);

    let result = await createVolunteer(newVolunteer).catch(() => false);
    
    if(result === 1) return res.status(200).send({status: 200, message: "That record has already been done."})
    if(!result) return res.status(503).send({status: 503, message: "Unable to create the new resource."})
    res.status(201).send();
});

router.post("/estacion", async (req, res) => {
    const fields = ["numero", "provincia", "municipio"];
    if(fields.length != Object.keys(req.fields).length) return res.status(400).send({status: 400, message: "Invalid model."});

    for(var key in req.fields) {
        if(!fields.includes(key)) return res.status(400).send({status: 400, message: "The model has invalid fields."});
    }

    let result = await createEstacion(req.fields).catch(() => false);
    if(!result) return res.status(503).send({status: 503, message: "Unable to create the new resource."})
    res.status(201).send();
});

router.post("/departamento", async (req, res) => {
    const fields = ["departamento", "descripcion"];
    if(fields.length != Object.keys(req.fields).length) return res.status(400).send({status: 400, message: "Invalid model."});

    for(var key in req.fields) {
        if(!fields.includes(key)) return res.status(400).send({status: 400, message: "The model has invalid fields."});
    }

    let result = await createDepartamento(req.fields).catch(() => false);
    if(!result) return res.status(503).send({status: 503, message: "Unable to create the new resource."})
    res.status(201).send();
});

router.post("/tipovoluntario", async (req, res) => {
    const fields = ["tipo", "descripcion"];
    if(fields.length != Object.keys(req.fields).length) return res.status(400).send({status: 400, message: "Invalid model."});

    for(var key in req.fields) {
        if(!fields.includes(key)) return res.status(400).send({status: 400, message: "The model has invalid fields."});
    }

    let result = await createTipoVoluntario(req.fields).catch(() => false);
    if(!result) return res.status(503).send({status: 503, message: "Unable to create the new resource."})
    res.status(201).send();
});

module.exports = router;