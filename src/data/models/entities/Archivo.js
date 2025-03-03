const { DataTypes } = require("sequelize");
const { Miembro } = require("./Miembro.js");
const {sequelize} = require("../../sqlConnection.js");

const Archivo = sequelize.define("Archivo", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true    
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    belongsToUser: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
    },
    content: {
        type: DataTypes.BLOB("long"),
        allowNull: false,
    },
    contentType: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    ext: {
        type: DataTypes.STRING(8),
        allowNull: false,
    },
    fileName: {
        type: DataTypes.STRING(20),
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
});

Miembro.hasMany(Archivo, { foreignKey: "identity", onDelete: "CASCADE" });
Archivo.belongsTo(Miembro, { foreignKey: "identity" });

module.exports = {
    Archivo
}