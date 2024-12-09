const router = require("express").Router();

const auth = require("./middleware/auth");

const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeClothingItem,
  unlikeClothingItem,
} = require("../controllers/clothingItems");

router.get("/", getClothingItems);
router.post("/", auth, createClothingItem);
router.delete("/:itemId", auth, deleteClothingItem);

router.put("/:itemId/likes", auth, likeClothingItem);
router.delete("/:itemId/likes", auth, unlikeClothingItem);

module.exports = router;
