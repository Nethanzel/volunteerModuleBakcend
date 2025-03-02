const { DataTypes } = require("sequelize");
const {sequelize} = require("../../sqlConnection.js");

const bcrypt = require("bcrypt");

const {Estacion} = require('./Estacion.js');
const {Departamento} = require('./Departamento');
const {TipoVoluntario} = require('./TipoVoluntario.js');

const Voluntario = sequelize.define("Voluntario", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    checked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    //Datos personales
    identity: {
        type: DataTypes.STRING(15),
        allowNull: true,
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
        type: DataTypes.INTEGER,
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
        type: DataTypes.INTEGER,
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
        type: DataTypes.JSON,
        allowNull: false
    },
    idiomas: {
        type: DataTypes.STRING,
        allowNull: false
    },
    otherLanguaje: {
        type: DataTypes.STRING,
        allowNull: true
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
        type: DataTypes.JSON,
        allowNull: false
    },

    hasIdentification: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    idetifications: {
        type: DataTypes.STRING,
        allowNull: true
    },

    // Datos de sistema
    allowAccess: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true,
    },
    permissions: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true,
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
},
{
    hooks: {
        beforeUpdate: async (record, options) => {
            if (record.dataValues.password) {
                const salt = await bcrypt.genSalt(10, "a");
                record.dataValues.password = await bcrypt.hash(record.dataValues.password, salt);
            }

            if (record.dataValues.identity) {
                record.dataValues.identity = record.dataValues.identity.replace(/[-\s]/g, "");
            }
        }
    }
});

Voluntario.belongsTo(Estacion);
Voluntario.belongsTo(Departamento);
Voluntario.belongsTo(TipoVoluntario);

Estacion.hasMany(Voluntario);
Departamento.hasMany(Voluntario);
TipoVoluntario.hasMany(Voluntario);

module.exports = {
    Voluntario
}