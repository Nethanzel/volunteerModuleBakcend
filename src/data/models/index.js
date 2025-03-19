const {Grado} = require('./entities/Grado.js');
const {Escuela} = require('./entities/Escuela.js');
const { Archivo } = require('./entities/Archivo.js');
const { Miembro } = require('./entities/Miembro.js');
const { Highlight } = require('./entities/Highlight.js');
const {TipoMiembro} = require('./entities/TipoMiembro.js');
const { Autorizacion } = require('./entities/Autorizacion.js');
const { Schedule } = require('./entities/Schedule.js');
const { Practica } = require('./entities/Practica.js');
const { Asistencia } = require('./entities/Asistencia.js');

module.exports = {
    Escuela,
    Grado,
    TipoMiembro,
    Autorizacion,
    Miembro,
    Archivo,
    Highlight,
    Schedule,
    Practica,
    Asistencia
}