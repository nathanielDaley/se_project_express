const router = require("express").Router();

const userRouter = require("./users");
const clothingItemRouter = require("./clothing-items");

const { login, createUser } = require("../controllers/users");

const { INVALID_ROUTE_ERROR } = require("../utils/errors");
const {
  validateUserBody,
  validateUserCredentials,
} = require("../middlewares/validation");
const NotFoundError = require("../errors/not-found-error");

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);
router.post("/signin", validateUserCredentials, login);
router.post("/signup", validateUserBody, createUser);

router.use((request, response, next) => {
  next(new NotFoundError(INVALID_ROUTE_ERROR));
});

module.exports = router;
