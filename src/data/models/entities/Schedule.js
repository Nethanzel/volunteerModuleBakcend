const {sequelize} = require("../../sqlConnection.js");
const { DataTypes } = require("sequelize");
const { Escuela } = require("./Escuela.js");
const { Miembro } = require("./Miembro.js");

const Schedule = sequelize.define("Schedule", {
    dayOfWeek: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    startHour: {
        type: DataTypes.STRING,
        allowNull: false
    },
    endHour: {
        type: DataTypes.STRING,
        allowNull: false
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    // profesor
    // escuela
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }
});

Schedule.belongsTo(Escuela, { foreignKey: 'escuelaId', as: 'escuela' });
Escuela.hasMany(Schedule, { foreignKey: 'escuelaId', as: 'schedule' });

Schedule.belongsTo(Miembro, { foreignKey: 'profesorId', as: 'profesor', allowNull: true  });

module.exports = {
    Schedule
}