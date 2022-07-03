const express = require("express");
const app = express();
const formidable = require("express-formidable");

const publicPoutes = require("./src/api/publicRoutes.js");
const getterRoutes = require("./src/api/getters.js");
const creatorRoutes = require("./src/api/creators.js");

app.use(formidable());
app.use("/api/common", publicPoutes);
app.use("/api/getters", getterRoutes);
app.use("/api/creators", creatorRoutes);

app.set("PORT", process.env.PORT || 81);

app.listen(app.get("PORT"), ()=> {
    console.log("The service is running on port ", app.get("PORT"));
});