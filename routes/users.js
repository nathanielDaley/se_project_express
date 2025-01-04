const router = require("express").Router();
const { getUser, updateUser } = require("../controllers/users");
const auth = require("../middlewares/auth");
const { validateUserBodyForUpdate } = require("../middlewares/validation");

router.get("/me", auth, getUser);
router.patch("/me", auth, validateUserBodyForUpdate, updateUser);

module.exports = router;
