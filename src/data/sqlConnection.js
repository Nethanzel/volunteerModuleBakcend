const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    logging: console.log,
    dialect:  "mysql",
    host: process.env.DB_SERVER,
    port: Number(process.env.MSQL_PORT) ?? 0,
    database: process.env.DB_NAME ?? "",
    username: process.env.DB_USER ?? "",
    password: process.env.DB_PASSWORD
});

async function initConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        return true;
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        return false;
    }
}

async function syncModels() {
    if(await initConnection()) {
        try {
            await sequelize.sync({ alter: true, force: false });
            console.log("Syncronization was done.");
        } catch (error) {
            console.log(error)
        }
    }
}

async function dropModels() {
    if(await initConnection()) {
        try {
            await sequelize.dropAllSchemas();
            console.log("Syncronization was done.");
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = {
    initConnection,
    syncModels,
    dropModels,
    sequelize
}

/* WARNING: Only run commented lines if you're willing to lose all the data in the database */
/* syncModels() */