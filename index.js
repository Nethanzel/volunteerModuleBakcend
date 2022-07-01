const express = require('express');
const app = express();
const routes = require("./src/api/publicRoutes.js");
app.use("/common", routes);
app.set("PORT", process.env.PORT || 81);

app.listen(app.get("PORT"), ()=> {
    console.log("The service is running on port ", app.get("PORT"));
});