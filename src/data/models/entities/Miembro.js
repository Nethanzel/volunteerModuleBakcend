const { DataTypes } = require("sequelize");
const {sequelize} = require("../../sqlConnection.js");

const bcrypt = require("bcrypt");

const {Escuela} = require('./Escuela.js');
const {Grado} = require('./Grado.js');
const {TipoMiembro} = require('./TipoMiembro.js');

const Miembro = sequelize.define("Miembro", {
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
    peso: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    altura: {
        type: DataTypes.DECIMAL(3,1),
        allowNull: true
    },

    //Datos de la direccion
    municipio: {
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
    apartamento: {
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

    tutorInfo: {
        type: DataTypes.JSON,
        allowNull: true
    },

    //Datos de formacion academica
    ocupacion: {
        type: DataTypes.STRING,
        allowNull: true
    },

    //Datos de salud del miembro
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

    assurance: {
        type: DataTypes.BOOLEAN,
    },
    assuranceCompany: {
        type: DataTypes.STRING,
        allowNull: true
    },
    assuranceCode: {
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

    otherMartialArt: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    otherMartialArtDetails: {
        type: DataTypes.STRING,
        allowNull: true
    },
    desire: {
        type: DataTypes.STRING,
        allowNull: true
    },
    interested: {
        type: DataTypes.INTEGER,
        allowNull: false
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

Miembro.belongsTo(Grado);
Miembro.belongsTo(TipoMiembro);

Grado.hasMany(Miembro);
TipoMiembro.hasMany(Miembro);

// Relación Escuela -> Miembros (Uno a Muchos)
Miembro.belongsTo(Escuela, { foreignKey: 'escuelaId', as: 'escuela' });
Escuela.hasMany(Miembro, { foreignKey: 'escuelaId', as: 'miembros' });

// Relación Escuela -> Líder (Uno a Uno, pero el líder es un Miembro)
Escuela.belongsTo(Miembro, { foreignKey: 'liderId', as: 'lider', allowNull: true });


module.exports = {
    Miembro
}