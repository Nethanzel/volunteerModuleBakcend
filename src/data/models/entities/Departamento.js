const {sequelize} = require("../../sqlConnection.js");
const { DataTypes } = require("sequelize");

const Departamento = sequelize.define("Departamento", {
    departamento: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true    
    }
});

module.exports = {
    Departamento
}