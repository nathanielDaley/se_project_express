const router = require("express").Router();
const { getUser, updateUser } = require("../controllers/users");
const auth = require("../middlewares/auth");

router.get("/me", auth, getUser);
router.post("/me", auth, updateUser);

module.exports = router;
