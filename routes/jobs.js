const {Router} = require("express");
const router = Router();
const jobs = require("../controllers/jobs");
const auth = require("../middlewares/auth");
const user_type = require("../middlewares/user_type");

router.get("/", jobs.getAllJobs);
router.get("/job/:id", jobs.renderJobPage);
router.get("/job/edit/:id", user_type, jobs.renderEditPage);
router.post("/job/edit", user_type, jobs.editJob);
router.get("/create", user_type, auth, jobs.renderCreatePage);
router.post("/create", user_type, auth, jobs.createJob);

module.exports = router;