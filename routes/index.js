const router = require("express").Router();
const userRouter = require("./users");
const clothingItemRounter = require("./clothingItems");
const { INVALID_ROUTE_ERROR, NOT_FOUND_STATUS } = require("../utils/errors");

router.use("/users", userRouter);
router.use("/items", clothingItemRounter);

router.use((request, response, next) => {
  response.status(NOT_FOUND_STATUS).send({ message: INVALID_ROUTE_ERROR });
  next();
});

module.exports = router;
