const {sequelize} = require("../../sqlConnection.js");
const { DataTypes } = require("sequelize");

const {Estacion} = require('./Estacion.js');
const {TipoVoluntario} = require('./TipoVoluntario.js');
const {Departamento} = require('./Departamento');

const Voluntario = sequelize.define("Voluntario", {

        //Datos del comite
        estacionId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        //Datos personales
        identity: {
            type: DataTypes.STRING(15),
            allowNull: false,
            autoIncrement: false,
            primaryKey: true,
            unique: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        apellido: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lugarNacimiento: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nacimiento: {
            type: DataTypes.DATE,
            allowNull: false
        },
        nacionalidad: {
            type: DataTypes.STRING,
            allowNull: false
        },
        estadoCivil: {
            type: DataTypes.STRING,
            allowNull: false
        },

        //Datos de la direccion
        provincia: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sector: {
            type: DataTypes.STRING,
            allowNull: false
        },
        calle: {
            type: DataTypes.STRING,
            allowNull: true
        },
        casa: {
            type: DataTypes.STRING,
            allowNull: true
        },

        //Datos de contacto
        telefonoFijo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        celular: {
            type: DataTypes.STRING,
            allowNull: false
        },
        correo: {
            type: DataTypes.STRING,
            allowNull: false
        },

        //Datos de formacion academica
        estudios: {
            type: DataTypes.STRING,
            allowNull: false
        },
        idiomas: {
            type: DataTypes.STRING,
            allowNull: false
        },

        //Datos de salud del voluntario
        sangre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        enfermedad: {
            type: DataTypes.BOOLEAN,
        },
        enfermedadDetalles: {
            type: DataTypes.STRING,
            allowNull: true
        },
        alergia: {
            type: DataTypes.BOOLEAN,
        },
        alergiaDetalles: {
            type: DataTypes.STRING,
            allowNull: true
        },
        contactoEmergencia: {
            type: DataTypes.STRING,
            allowNull: false
        },

        //Datos del area que pertenece el voluntario
        departamentoId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        tipoVoluntarioId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
});

Voluntario.hasMany(Estacion, {
    foreignKey: 'id',
    onDelete: 'CASCADE'
});
Voluntario.hasMany(TipoVoluntario, {
    foreignKey: 'id',
    onDelete: 'CASCADE'
});
Voluntario.hasMany(Departamento, {
    foreignKey: 'id',
    onDelete: 'CASCADE'
});

Estacion.belongsToMany(Voluntario, {
    foreignKey: 'estacionId',
    through: Voluntario
});

TipoVoluntario.belongsToMany(Voluntario, {
    foreignKey: 'tipoVoluntarioId',
    through: Voluntario
});

Departamento.belongsToMany(Voluntario, {
    foreignKey: 'departamentoId',
    through: Voluntario
});

module.exports = {
    Voluntario
}