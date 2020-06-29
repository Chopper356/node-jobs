const {Router} = require("express");
const router = Router();
const jobs = require("../controllers/jobs");

router.get("/", jobs.getAllJobs);
router.get("/create", jobs.createJob);

module.exports = router;