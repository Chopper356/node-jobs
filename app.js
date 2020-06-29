const config = require("config");
const express = require("express");
const db = require("./helpers/database")();
const app = express();
const hbs = require("express-handlebars");
const path = require("path");

const routes = require("./routes");

const hbsConfig = hbs.create({
	defaultLayout: "main",
	extname: "hbs",
	allowProtoPropertiesByDefault: true,
	allowedProtoProperties: true,
	allowProtoMethodsByDefault: true
});

app.engine("hbs", hbsConfig.engine);
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

app.use(routes);

app.listen(config.port, () => {
	console.log("Server started on port:", config.port);
})

