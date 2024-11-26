const ClothingItem = require("../models/clothingItem");
const {
  DEFAULT_ERROR,
  CREATE_CLOTHING_ITEM_ERROR,
  CLOTHING_ITEM_NOT_FOUND_ERROR,
  INVALID_CLOTHING_ITEM_ID_ERROR,
} = require("../utils/errors");

const getClothingItems = (request, response) => {
  ClothingItem.find({})
    .then((clothingItems) => response.status(200).send({ clothingItems }))
    .catch((error) => {
      console.error(error);
      return response.status(500).send({ message: DEFAULT_ERROR });
    });
};

const createClothingItem = (request, response) => {
  const { name, weather, imageUrl, owner, likes } = request.body;

  ClothingItem.create({ name, weather, imageUrl, owner, likes })
    .then((clothingItem) => response.status(201).send({ clothingItem }))
    .catch((error) => {
      console.error(error);
      if (error.name === "ValidationError") {
        return response
          .status(400)
          .send({ message: CREATE_CLOTHING_ITEM_ERROR });
      }
      return response.status(500).send({ message: DEFAULT_ERROR });
    });
};

const deleteClothingItem = (request, response) => {
  const { itemId } = request.params;

  ClothingItem.findByIdAndRemove(itemId)
    .orFail()
    .then((clothingItem) => response.status(200).send({ clothingItem }))
    .catch((error) => {
      console.error(error);
      if (error.name === "DocumentNotFoundError") {
        return response
          .status(404)
          .send({ message: CLOTHING_ITEM_NOT_FOUND_ERROR });
      }
      if (error.name === "CastError") {
        return response
          .status(400)
          .send({ message: INVALID_CLOTHING_ITEM_ID_ERROR });
      }
      return response.status(500).send({ message: DEFAULT_ERROR });
    });
};

const likeClothingItem = (request, response) => {
  const { itemId } = request.params;
  const userId = request.body.user._id;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .orFail()
    .then((clothingItem) => response.status(200).send({ clothingItem }))
    .catch((error) => {
      console.error(error);
      if (error.name === "DocumentNotFoundError") {
        return response
          .status(404)
          .send({ message: CLOTHING_ITEM_NOT_FOUND_ERROR });
      }
      if (error.name === "CastError") {
        return response
          .status(400)
          .send({ message: INVALID_CLOTHING_ITEM_ID_ERROR });
      }
      return response.status(500).send({ message: DEFAULT_ERROR });
    });
};

const unlikeClothingItem = (request, response) => {
  const { itemId } = request.params;
  const userId = request.body.user._id;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: userId } },
    { new: true }
  )
    .orFail()
    .then((clothingItem) => response.status(200).send({ clothingItem }))
    .catch((error) => {
      console.error(error);
      if (error.name === "DocumentNotFoundError") {
        return response
          .status(404)
          .send({ message: CLOTHING_ITEM_NOT_FOUND_ERROR });
      }
      if (error.name === "CastError") {
        return response
          .status(400)
          .send({ message: INVALID_CLOTHING_ITEM_ID_ERROR });
      }
      return response.status(500).send({ message: DEFAULT_ERROR });
    });
};

module.exports = {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeClothingItem,
  unlikeClothingItem,
};
