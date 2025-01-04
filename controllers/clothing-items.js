const ClothingItem = require("../models/clothing-item");
const {
  CREATE_CLOTHING_ITEM_ERROR,
  CLOTHING_ITEM_NOT_FOUND_ERROR,
  INVALID_CLOTHING_ITEM_ID_ERROR,
  INVALID_CLOTHING_ITEM_USER_ERROR,
  CREATED_STATUS,
} = require("../utils/errors");
const BadRequestError = require("../errors/bad-request-error");
const ForbiddenError = require("../errors/forbidden-error");
const NotFoundError = require("../errors/not-found-error");

const getClothingItems = (request, response, next) => {
  ClothingItem.find({})
    .then((clothingItems) => response.send({ clothingItems }))
    .catch((error) => {
      next(error);
    });
};

const createClothingItem = (request, response, next) => {
  const { name, weather, imageUrl } = request.body;

  // -TODO remove userId when front-end fixed
  const userId = request.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner: userId })
    .then((clothingItem) =>
      response.status(CREATED_STATUS).send({ clothingItem })
    )
    .catch((error) => {
      if (error.name === "ValidationError") {
        next(new BadRequestError(CREATE_CLOTHING_ITEM_ERROR));
      } else {
        next(error);
      }
    });
};

const deleteClothingItem = (request, response, next) => {
  const userId = request.user._id;
  const { itemId } = request.params;

  ClothingItem.findById(itemId)
    .orFail()
    .then(() =>
      ClothingItem.findOneAndRemove({ _id: itemId, owner: userId })
        .orFail()
        .then((clothingItem) => response.send({ clothingItem }))
        .catch((error) => {
          if (error.name === "DocumentNotFoundError") {
            next(new ForbiddenError(INVALID_CLOTHING_ITEM_USER_ERROR));
          }
          if (error.name === "CastError") {
            next(new BadRequestError(INVALID_CLOTHING_ITEM_ID_ERROR));
          } else {
            next(error);
          }
        })
    )
    .catch((error) => {
      if (error.name === "DocumentNotFoundError") {
        next(new NotFoundError(INVALID_CLOTHING_ITEM_ID_ERROR));
      }
      if (error.name === "CastError") {
        next(new BadRequestError(INVALID_CLOTHING_ITEM_ID_ERROR));
      } else {
        next(error);
      }
    });
};

const likeClothingItem = (request, response, next) => {
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
      if (error.name === "DocumentNotFoundError") {
        next(new NotFoundError(CLOTHING_ITEM_NOT_FOUND_ERROR));
      }
      if (error.name === "CastError") {
        next(new BadRequestError(INVALID_CLOTHING_ITEM_ID_ERROR));
      } else {
        next(error);
      }
    });
};

const unlikeClothingItem = (request, response, next) => {
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
      if (error.name === "DocumentNotFoundError") {
        next(new NotFoundError(CLOTHING_ITEM_NOT_FOUND_ERROR));
      }
      if (error.name === "CastError") {
        next(new BadRequestError(INVALID_CLOTHING_ITEM_ID_ERROR));
      } else {
        next(error);
      }
    });
};

module.exports = {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeClothingItem,
  unlikeClothingItem,
};
