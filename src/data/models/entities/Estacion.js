const {sequelize} = require("../../sqlConnection.js");
const { DataTypes } = require("sequelize");


const Estacion = sequelize.define("Estacion", {
    numero: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    provincia: {
        type: DataTypes.STRING,
        allowNull: false
    },
    municipio: {
        type: DataTypes.STRING,
        allowNull: false
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