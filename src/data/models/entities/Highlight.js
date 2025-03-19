const {sequelize} = require("../../sqlConnection.js");
const { DataTypes } = require("sequelize");

const Highlight = sequelize.define("Highlight", {
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    comment: {
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
    Highlight
}