const ClothingItem = require("../models/clothingItem");
const {
  DEFAULT_ERROR,
  CREATE_CLOTHING_ITEM_ERROR,
  CLOTHING_ITEM_NOT_FOUND_ERROR,
  INVALID_CLOTHING_ITEM_ID_ERROR,
  INVALID_CLOTHING_ITEM_USER,
  BAD_REQUEST_STATUS,
  INSUFFICIENT_PERMISSIONS,
  NOT_FOUND_STATUS,
  DEFAULT_STATUS,
  CREATED_STATUS,
} = require("../utils/errors");

const getClothingItems = (request, response) => {
  ClothingItem.find({})
    .then((clothingItems) => response.send({ clothingItems }))
    .catch((error) => {
      console.error(error);
      return response.status(DEFAULT_STATUS).send({ message: DEFAULT_ERROR });
    });
};

const createClothingItem = (request, response) => {
  const { name, weather, imageUrl } = request.body;

  // -TODO remove userId when front-end fixed
  const userId = request.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner: userId })
    .then((clothingItem) =>
      response.status(CREATED_STATUS).send({ clothingItem })
    )
    .catch((error) => {
      console.error(error);
      if (error.name === "ValidationError") {
        return response
          .status(BAD_REQUEST_STATUS)
          .send({ message: CREATE_CLOTHING_ITEM_ERROR });
      }
      return response.status(DEFAULT_STATUS).send({ message: DEFAULT_ERROR });
    });
};

const deleteClothingItem = (request, response) => {
  const userId = request.user._id;
  const { itemId } = request.params;

  ClothingItem.findByIdAndRemove(itemId)
    .orFail()
    .then((clothingItem) => {
      if (clothingItem.owner !== userId) {
        return response
          .status(INSUFFICIENT_PERMISSIONS)
          .send({ message: INVALID_CLOTHING_ITEM_USER });
      }
      return response.send({ clothingItem });
    })
    .catch((error) => {
      console.error(error);
      if (error.name === "DocumentNotFoundError") {
        return response
          .status(NOT_FOUND_STATUS)
          .send({ message: CLOTHING_ITEM_NOT_FOUND_ERROR });
      }
      if (error.name === "CastError") {
        return response
          .status(BAD_REQUEST_STATUS)
          .send({ message: INVALID_CLOTHING_ITEM_ID_ERROR });
      }
      return response.status(DEFAULT_STATUS).send({ message: DEFAULT_ERROR });
    });
};

const likeClothingItem = (request, response) => {
  const { itemId } = request.params;
  const userId = request.user._id;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .orFail()
    .then((clothingItem) => response.send({ clothingItem }))
    .catch((error) => {
      console.error(error);
      if (error.name === "DocumentNotFoundError") {
        return response
          .status(NOT_FOUND_STATUS)
          .send({ message: CLOTHING_ITEM_NOT_FOUND_ERROR });
      }
      if (error.name === "CastError") {
        return response
          .status(BAD_REQUEST_STATUS)
          .send({ message: INVALID_CLOTHING_ITEM_ID_ERROR });
      }
      return response.status(DEFAULT_STATUS).send({ message: DEFAULT_ERROR });
    });
};

const unlikeClothingItem = (request, response) => {
  const { itemId } = request.params;
  const userId = request.user._id;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: userId } },
    { new: true }
  )
    .orFail()
    .then((clothingItem) => response.send({ clothingItem }))
    .catch((error) => {
      console.error(error);
      if (error.name === "DocumentNotFoundError") {
        return response
          .status(NOT_FOUND_STATUS)
          .send({ message: CLOTHING_ITEM_NOT_FOUND_ERROR });
      }
      if (error.name === "CastError") {
        return response
          .status(BAD_REQUEST_STATUS)
          .send({ message: INVALID_CLOTHING_ITEM_ID_ERROR });
      }
      return response.status(DEFAULT_STATUS).send({ message: DEFAULT_ERROR });
    });
};

module.exports = {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeClothingItem,
  unlikeClothingItem,
};
