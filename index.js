require("dotenv").config();
const path = require("path");
const cors = require("cors");
const express = require("express");
const formidable = require("express-formidable");
const history = require('connect-history-api-fallback');

const app = express();

require("./src/data/models/initData.js");

const authorizeRoutes = require("./src/api/authorize.js");
const publicPoutes = require("./src/api/publicRoutes.js");
const creatorRoutes = require("./src/api/creators.js");
const setterPoutes = require("./src/api/setters.js");
const getterRoutes = require("./src/api/getters.js");
const eraserRoutes = require("./src/api/eraser.js");
const fileRoutes = require("./src/api/files.js");

app.use(cors({origin: "*"}));
app.use(formidable({ uploadDir: path.join(__dirname, "src/uploads"), keepExtensions: true }));

app.use('/api/authorize', authorizeRoutes);
app.use("/api/creators", creatorRoutes);
app.use("/api/getters", getterRoutes);
app.use("/api/setters", setterPoutes);
app.use("/api/common", publicPoutes);
app.use("/api/erase", eraserRoutes);
app.use("/api/files", fileRoutes);

app.use(history());
app.set("PORT", process.env.PORT || 81);
app.use('/', express.static(path.join(__dirname, "src/client/")));
app.listen(app.get("PORT"), () => console.log("The service is running on port ", app.get("PORT")));