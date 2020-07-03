const {Router} = require("express");
const router = Router();
const profile = require("../controllers/profile");

router.get("/hirer/:id", profile.pageHirer);
router.get("/executor/:id", profile.pageExecutor);
router.get("/settings", profile.renderSettingsPage);
router.post("/edit", profile.editProfile);


module.exports = router;