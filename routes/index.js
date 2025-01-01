const router = require("express").Router();

const userRouter = require("./users");
const clothingItemRouter = require("./clothing-items");

const { login, createUser } = require("../controllers/users");

const { INVALID_ROUTE_ERROR, NOT_FOUND_STATUS } = require("../utils/errors");

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);
router.post("/signin", login);
router.post("/signup", createUser);

router.use((request, response, next) => {
  response.status(NOT_FOUND_STATUS).send({ message: INVALID_ROUTE_ERROR });
  next();
});

module.exports = router;
