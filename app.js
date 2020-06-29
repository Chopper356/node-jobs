const config = require("config");
const express = require("express");
const db = require("./helpers/database")();
const hbs = require("express-handlebars");
const path = require("path");
const flash = require("connect-flash");
const cookie = require("cookie-parser");
const session = require("express-session");
const auth = require("./middlewares/variables");
const app = express();

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

app.use(cookie('keyboard cat'));
app.use(session ({
	secret: config.secret_key,
	resave: false,
	saveUninitialized: false
}));
app.use(flash());
app.use(auth);
app.use(express.urlencoded({extended: true}));
app.use(routes);

app.listen(config.port, () => {
	console.log("Server started on port:", config.port);
})

