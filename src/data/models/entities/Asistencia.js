const {sequelize} = require("../../sqlConnection.js");
const { DataTypes } = require("sequelize");
const { Miembro } = require("./Miembro.js");
const { Practica } = require("./Practica.js");

const Asistencia = sequelize.define("Asistencia", {
    deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }
});

Asistencia.belongsTo(Miembro, { foreignKey: 'miembroId', as: 'miembro' });
Asistencia.belongsTo(Practica, { foreignKey: 'practicaId', as: 'practica' });

Practica.hasMany(Asistencia, { foreignKey: 'practicaId', as: 'asistencia' });

module.exports = {
    Asistencia
}