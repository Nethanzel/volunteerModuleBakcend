const router = require('express').Router();
const { createVolunteer, createDepartamento, createEstacion, createTipoVoluntario } = require("../data/methods/creators");

router.post("/voluntario", (req, res) => {
    const fields = ["tipo", "descripcion"];
    if(fields.length != Object.keys(req.fields).length) return res.status(400).send({status: 400, message: "Invalid model."});

    for(var key in req.fields) {
        if(!fields.includes(key)) return res.status(400).send({status: 400, message: "The model has invalid fields."});
    }

    let result = await createTipoVoluntario(req.fields);
    if(!result) return res.status(503).send({status: 503, message: "Unable to create the new resource."})
    res.status(201).send();
});

router.post("/estacion", async (req, res) => {
    const fields = ["numero", "provincia", "municipio"];
    if(fields.length != Object.keys(req.fields).length) return res.status(400).send({status: 400, message: "Invalid model."});

    for(var key in req.fields) {
        if(!fields.includes(key)) return res.status(400).send({status: 400, message: "The model has invalid fields."});
    }

    let result = await createEstacion(req.fields);
    if(!result) return res.status(503).send({status: 503, message: "Unable to create the new resource."})
    res.status(201).send();
});

router.post("/departamento", (req, res) => {
    const fields = ["departamento", "descripcion"];
    if(fields.length != Object.keys(req.fields).length) return res.status(400).send({status: 400, message: "Invalid model."});

    for(var key in req.fields) {
        if(!fields.includes(key)) return res.status(400).send({status: 400, message: "The model has invalid fields."});
    }

    let result = await createDepartamento(req.fields);
    if(!result) return res.status(503).send({status: 503, message: "Unable to create the new resource."})
    res.status(201).send();
});

router.post("/tipovoluntario", (req, res) => {
    const fields = ["tipo", "descripcion"];
    if(fields.length != Object.keys(req.fields).length) return res.status(400).send({status: 400, message: "Invalid model."});

    for(var key in req.fields) {
        if(!fields.includes(key)) return res.status(400).send({status: 400, message: "The model has invalid fields."});
    }

    let result = await createTipoVoluntario(req.fields);
    if(!result) return res.status(503).send({status: 503, message: "Unable to create the new resource."})
    res.status(201).send();
});

module.exports = router;
/* {
    estacionId: 1,

    //Datos de salud del voluntario
    sangre: "O+",
    enfermedad: false,
    enfermedadDetalles: "",
    alergia: false,
    alergiaDetalles: "",
    contactoEmergencia: "*",
    
    //Datos de formacion academica
    estudios: "*",
    idiomas: "*",

    //Datos del area a la que pertenece el voluntario
    departamentoId: 1,
    tipoVoluntarioId: 1,
            
    //Datos de contacto
    telefonoFijo: "*",
    celular: "*",
    correo: "*",

    //Datos de la direccion
    provincia: "*",
    sector: "*",
    calle: "*",
    casa: "*",

    //Datos personales
    identity: "*",
    nombre: "*",
    apellido: "*",
    lugarNacimiento: "*",
    nacimiento: new Date(),
    nacionalidad: "*",
    estadoCivil: "*"
} */