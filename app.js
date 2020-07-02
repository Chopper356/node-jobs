const config = require("config");
const express = require("express");
const db = require("./helpers/database")();
const hbs = require("express-handlebars");
const MomentHandler = require("handlebars.moment");
const path = require("path");
const flash = require("connect-flash");
const cookie = require("cookie-parser");
const session = require("express-session");
const auth = require("./middlewares/variables");
const MongoUsers = require("connect-mongodb-session")(session);
const app = express();

const routes = require("./routes");

const session_users = new MongoUsers ({
	collection: "sessions",
	uri: config.mongo
});

const hbsConfig = hbs.create({
	defaultLayout: "main",
	extname: "hbs",
	allowProtoPropertiesByDefault: true,
	allowedProtoProperties: true,
	allowProtoMethodsByDefault: true,
	helpers: require("./helpers/hbs-helpers"),
});
MomentHandler.registerHelpers(hbsConfig.handlebars);

app.engine("hbs", hbsConfig.engine);
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

app.use(express.urlencoded({extended: true}));
app.use(cookie(config.cookie_key));
app.use(session ({
	secret: config.session_key,
	resave: false,
	saveUninitialized: false,
	store: session_users
}));

app.use(flash());
app.use(auth);
app.use(routes);

app.listen(config.port, () => {
	console.log("Server started on port:", config.port);
})

