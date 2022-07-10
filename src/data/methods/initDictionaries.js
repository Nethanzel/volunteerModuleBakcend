require("dotenv").config();
const { InsertDepartments, InsertTypes, InsertStations } = require("../models/initData.js");
const { dropModels, syncModels } = require("../sqlConnection.js");

/* InsertDepartments();
InsertTypes();
InsertStations(); */

/* dropModels() */

 syncModels();