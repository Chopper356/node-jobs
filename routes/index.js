const express = require("express");
const router = express.Router();
const path = require("path");
const jobs = require("./jobs");
const auth = require("./auth");

router.use(express.static(path.join(__dirname, "../public")));

router.use("/jobs", jobs);
router.use("/auth", auth);

router.get("/", (req, res) => {
	res.render("home");
});


module.exports = router;