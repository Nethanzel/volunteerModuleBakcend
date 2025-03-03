const {Escuela} = require('./entities/Escuela.js');
const {Grado} = require('./entities/Grado.js');
const {TipoMiembro} = require('./entities/TipoMiembro.js');
const { Autorizacion } = require('./entities/Autorizacion.js');
const { Archivo } = require('./entities/Archivo.js');
const { Miembro } = require('./entities/Miembro.js');

module.exports = {
    Escuela,
    Grado,
    TipoMiembro,
    Autorizacion,
    Miembro,
    Archivo
}