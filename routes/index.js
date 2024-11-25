const router = require("express").Router();
const userRouter = require("./users");
const clothingItemRounter = require("./clothingItems");

router.use("/users", userRouter);
router.user("/clothingItems", clothingItemRounter);

module.exports = router;
