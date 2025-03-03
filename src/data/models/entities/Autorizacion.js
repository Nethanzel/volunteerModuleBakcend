const { DataTypes } = require("sequelize");
const { Miembro } = require("./Miembro.js");
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
            model: Miembro,
            key: "id"
        }
    }
},
{
    timestamps: false
});

Miembro.hasMany(Autorizacion, { foreignKey: "identity", onDelete: "CASCADE" });
Autorizacion.belongsTo(Miembro, { foreignKey: "identity" });

module.exports = {
    Autorizacion
}