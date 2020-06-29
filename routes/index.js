const {Router} = require("express");
const router = Router();
const jobs = require("./jobs");

router.use("/jobs", jobs);

router.get("/", (req, res) => {
	res.render("home");
});


module.exports = router;