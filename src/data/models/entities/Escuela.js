const {sequelize} = require("../../sqlConnection.js");
const { DataTypes } = require("sequelize");

const Escuela = sequelize.define("Escuela", {
    nombre: {
        type: DataTypes.STRING,
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
    lat: {
        type: DataTypes.DECIMAL(9,6),
        allowNull: true
    },
    lng: {
        type: DataTypes.DECIMAL(9,6),
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

module.exports = {
    Escuela
}