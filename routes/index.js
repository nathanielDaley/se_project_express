const router = require("express").Router();
const clothingItemRounter = require("./clothingItems");
const { INVALID_ROUTE_ERROR, NOT_FOUND_STATUS } = require("../utils/errors");
const { login, createUser, getUser } = require("../controllers/users");

const auth = require("../middlewares/auth");

router.use("/users/me", auth, getUser);
router.use("/items", clothingItemRounter);
router.use("/signin", login);
router.use("/signup", createUser);

router.use((request, response, next) => {
  response.status(NOT_FOUND_STATUS).send({ message: INVALID_ROUTE_ERROR });
  next();
});

module.exports = router;
