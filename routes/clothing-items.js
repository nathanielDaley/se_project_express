const router = require("express").Router();

const auth = require("../middlewares/auth");

const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeClothingItem,
  unlikeClothingItem,
} = require("../controllers/clothing-items");
const { validateCardBody, validateId } = require("../middlewares/validation");

router.get("/", getClothingItems);
router.post("/", auth, validateCardBody, createClothingItem);
router.delete("/:itemId", auth, validateId, deleteClothingItem);

router.put("/:itemId/likes", auth, validateId, likeClothingItem);
router.delete("/:itemId/likes", auth, validateId, unlikeClothingItem);

module.exports = router;
