const {sequelize} = require("../../sqlConnection.js");
const { DataTypes } = require("sequelize");

const Grado = sequelize.define("Grado", {
    grado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    color: {
        type: DataTypes.STRING,
        allowNull: true
    },
    descripcion: {
        type: DataTypes.TEXT,
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
        primaryKey: true    
    }
});

module.exports = {
    Grado
}