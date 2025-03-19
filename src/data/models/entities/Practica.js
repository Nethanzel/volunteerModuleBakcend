const {sequelize} = require("../../sqlConnection.js");
const { DataTypes } = require("sequelize");
const { Schedule } = require("./Schedule.js");
const { Escuela } = require("./Escuela.js");
const { Miembro } = require("./Miembro.js");

const Practica = sequelize.define("Practica", {
    dayOfWeek: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    startHour: {
        type: DataTypes.STRING,
        allowNull: true
    },
    endHour: {
        type: DataTypes.STRING,
        allowNull: true
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: true
    },
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

Practica.belongsTo(Miembro, { foreignKey: 'profesorId', as: 'profesor', allowNull: true });
Practica.belongsTo(Schedule, { foreignKey: 'scheduleId', as: 'schedule', allowNull: true });
Practica.belongsTo(Escuela, { foreignKey: 'escuelaId', as: 'escuela', allowNull: true });

module.exports = {
    Practica
}