const {sequelize} = require("../../sqlConnection.js");
const { DataTypes } = require("sequelize");

const TipoMiembro = sequelize.define("TipoMiembro", {
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
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
        primaryKey: true,
    }
});

module.exports = {
    TipoMiembro
}