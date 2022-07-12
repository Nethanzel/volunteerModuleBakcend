require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const formidable = require("express-formidable");
const path = require("path");
const history = require('connect-history-api-fallback');

//require("./src/data/models/initData.js")

const publicPoutes = require("./src/api/publicRoutes.js");
const getterRoutes = require("./src/api/getters.js");
const creatorRoutes = require("./src/api/creators.js");

app.use(formidable());
app.use(cors({origin: "*"}));
app.use("/api/common", publicPoutes);
app.use("/api/getters", getterRoutes);
app.use("/api/creators", creatorRoutes);

app.use(history());
app.use('/', express.static(path.join(__dirname, "src/client/")));

app.set("PORT", process.env.PORT || 81);

app.listen(app.get("PORT"), ()=> {
    console.log("The service is running on port ", app.get("PORT"));
});