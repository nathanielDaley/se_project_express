const router = require("express").Router();
const { getUsers, getUser, createUser } = require("../controllers/users");
const auth = require("../middlewares/auth");

router.get("/me", auth, getUser);

module.exports = router;
