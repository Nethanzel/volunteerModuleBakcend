const {Estacion} = require('./entities/Estacion.js');
const {Voluntario} = require('./entities/Voluntario.js');
const {Departamento} = require('./entities//Departamento.js');
const {TipoVoluntario} = require('./entities/TipoVoluntario.js');
const { Autorizacion } = require('./entities/Autorizacion.js');
const { Archivo } = require('./entities/Archivo.js');

module.exports = {
    Estacion,
    Departamento,
    TipoVoluntario,
    Autorizacion,
    Voluntario,
    Archivo
}