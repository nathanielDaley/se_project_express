const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const {
  JOI_NAME_MIN_LENGTH_ERROR,
  JOI_NAME_MAX_LENGTH_ERROR,
  JOI_NAME_EMPTY_ERROR,
  JOI_WEATHER_EMPTY_ERROR,
  JOI_CARD_URL_EMPTY_ERROR,
  JOI_CARD_URL_INVALID_ERROR,
  JOI_USER_URL_EMPTY_ERROR,
  JOI_USER_URL_INVALID_ERROR,
  JOI_USER_EMAIL_EMPTY_ERROR,
  JOI_USER_EMAIL_INVALID_ERROR,
  JOI_USER_PASSWORD_EMPTY_ERROR,
  JOI_CARD_MISSING_ID_ERROR,
  CARD_NAME_MIN_LENGTH,
  CARD_NAME_MAX_LENGTH,
  USER_NAME_MIN_LENGTH,
  USER_NAME_MAX_LENGTH,
} = require("../utils/errors");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

module.exports.validateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(CARD_NAME_MIN_LENGTH)
      .max(CARD_NAME_MAX_LENGTH)
      .messages({
        "string.min": JOI_NAME_MIN_LENGTH_ERROR,
        "string.max": JOI_NAME_MAX_LENGTH_ERROR,
        "string.empty": JOI_NAME_EMPTY_ERROR,
      }),

    weather: Joi.string().required().messages({
      "string.empty": JOI_WEATHER_EMPTY_ERROR,
    }),

    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": JOI_CARD_URL_EMPTY_ERROR,
      "string.uri": JOI_CARD_URL_INVALID_ERROR,
    }),
  }),
});

module.exports.validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(USER_NAME_MIN_LENGTH)
      .max(USER_NAME_MAX_LENGTH)
      .messages({
        "string.min": JOI_NAME_MIN_LENGTH_ERROR,
        "string.max": JOI_NAME_MAX_LENGTH_ERROR,
        "string.empty": JOI_NAME_EMPTY_ERROR,
      }),

    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": JOI_USER_URL_EMPTY_ERROR,
      "string.uri": JOI_USER_URL_INVALID_ERROR,
    }),

    email: Joi.string().required().email().messages({
      "string.empty": JOI_USER_EMAIL_EMPTY_ERROR,
      "string.email": JOI_USER_EMAIL_INVALID_ERROR,
    }),

    password: Joi.string().required().messages({
      "string.empty": JOI_USER_PASSWORD_EMPTY_ERROR,
    }),
  }),
});

module.exports.validateUserBodyForUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(USER_NAME_MIN_LENGTH)
      .max(USER_NAME_MAX_LENGTH)
      .messages({
        "string.min": JOI_NAME_MIN_LENGTH_ERROR,
        "string.max": JOI_NAME_MAX_LENGTH_ERROR,
        "string.empty": JOI_NAME_EMPTY_ERROR,
      }),

    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": JOI_USER_URL_EMPTY_ERROR,
      "string.uri": JOI_USER_URL_INVALID_ERROR,
    }),
  }),
});

module.exports.validateUserCredentials = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": JOI_USER_EMAIL_EMPTY_ERROR,
      "string.email": JOI_USER_EMAIL_INVALID_ERROR,
    }),

    password: Joi.string().required().messages({
      "string.empty": JOI_USER_PASSWORD_EMPTY_ERROR,
    }),
  }),
});

module.exports.validateId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().required().messages({
      "string.empty": JOI_CARD_MISSING_ID_ERROR,
    }),
  }),
});
