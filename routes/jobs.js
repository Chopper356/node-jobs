const {Router} = require("express");
const router = Router();
const jobs = require("../controllers/jobs");
const auth = require("../middlewares/auth");
const user_type = require("../middlewares/user_type");

router.get("/", jobs.getAllJobs);
router.get("/:id", jobs.renderJobPage);
router.get("/edit/:id", user_type("hirer"), jobs.renderEditPage);
router.post("/comment/:id/refuse", user_type("hirer"), jobs.deleteComment);
router.post("/comment/:id/accept", user_type("hirer"), jobs.acceptComment);
router.post("/comment/:id/complete", user_type("hirer"), jobs.completeComment);
router.post("/comment", user_type("executor"), jobs.createComment);
router.post("/edit", user_type("hirer"), jobs.editJob);
router.get("/create", user_type("hirer"), auth, jobs.renderCreatePage);
router.post("/create", user_type("hirer"), auth, jobs.createJob);

module.exports = router;