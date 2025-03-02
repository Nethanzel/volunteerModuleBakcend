const {sequelize} = require("../../sqlConnection.js");
const { DataTypes } = require("sequelize");


const Estacion = sequelize.define("Estacion", {
    numero: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    provincia: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    municipio: {
        type: DataTypes.INTEGER,
        allowNull: false
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

module.exports = {
    Estacion
}