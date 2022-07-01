const { Sequelize } = require('sequelize');

                                //Database name //username  //password
const sequelize = new Sequelize('crdtdb', '3q3ywls2ebzg', 'pscale_pw_DpjKczGLiid5obIxHjx-KtGrEthw5f3YpXVnXeRAjoY', 
    {
        host: '6joo4zyx34tk.us-east-1.psdb.cloud', //database server
        dialect: 'mysql',
        dialectOptions: {
            ssl: {
                rejectUnauthorized: true        
            }
        }
    }
);

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

/* syncModels(); */

module.exports = {
    testConnection,
    syncModels,
    dropModels,
    sequelize
}