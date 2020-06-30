const {Router} = require("express");
const router = Router();
const jobs = require("../controllers/jobs");
const auth = require("../middlewares/auth");

router.get("/", jobs.getAllJobs);
router.get("/job/:id", jobs.renderJobPage);
router.get("/job/edit/:id", jobs.renderEditPage);
router.post("/job/edit", jobs.editJob);
router.get("/create", auth, jobs.renderCreatePage);
router.post("/create", auth, jobs.createJob);

module.exports = router;