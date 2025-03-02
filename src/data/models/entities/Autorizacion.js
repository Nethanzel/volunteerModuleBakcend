const { DataTypes } = require("sequelize");
const { Voluntario } = require("./Voluntario.js");
const {sequelize} = require("../../sqlConnection.js");

const Autorizacion = sequelize.define("Autorizacion", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true    
    },
    releasedOn: {
        type: DataTypes.DATE,
        allowNull: false
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
    },
    identity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Voluntario,
            key: "id"
        }
    }
},
{
    timestamps: false
});

Voluntario.hasMany(Autorizacion, { foreignKey: "identity", onDelete: "CASCADE" });
Autorizacion.belongsTo(Voluntario, { foreignKey: "identity" });

module.exports = {
    Autorizacion
}