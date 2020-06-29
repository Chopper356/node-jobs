const {Router} = require("express");
const router = Router();
const auth = require("../controllers/auth");

router.get("/", auth.page);
router.post("/login", auth.login);
router.post("/register", auth.register);

module.exports = router;