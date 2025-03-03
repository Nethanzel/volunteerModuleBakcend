require("dotenv").config();
const { InsertLevels, InsertTypes, InsertSchools } = require("../models/initData.js");
const { dropModels, syncModels } = require("../sqlConnection.js");

/* InsertLevels();
InsertTypes();
InsertSchools(); */

/* dropModels() */

 syncModels();