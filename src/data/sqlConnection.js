const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,
    {
        host: process.env.DB_SERVER,
        dialect: 'mysql',
        dialectOptions: {
            ssl: {
                rejectUnauthorized: true        
            }
        }
});

async function testConnection() {
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
    if(await testConnection()) {
        try {
            await sequelize.sync();
            console.log("Syncronization was done.");
        } catch (error) {
            console.log(error)
        }
    }
}

async function dropModels() {
    if(await testConnection()) {
        try {
            await sequelize.dropAllSchemas();
            console.log("Syncronization was done.");
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = {
    testConnection,
    syncModels,
    dropModels,
    sequelize
}

syncModels()