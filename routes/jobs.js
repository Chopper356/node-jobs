const {Router} = require("express");
const router = Router();
const jobs = require("../controllers/jobs");
const auth = require("../middlewares/auth");

router.get("/", jobs.getAllJobs);
router.get("/create", auth, jobs.renderCreatePage);
router.post("/create", auth, jobs.createJob);

module.exports = router;