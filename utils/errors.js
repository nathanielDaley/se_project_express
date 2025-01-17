const DEFAULT_ERROR = "An error has occurred on the server.";
const CREATE_USER_ERROR =
  "Error creating user - ensure a valid name(2 to 30 characters) and avatar url.";
const CREATE_CLOTHING_ITEM_ERROR =
  "Error creating clothing item - ensure a valid name(2 to 30 characters), weather type('hot', 'warm', or 'cold'), image url, and owner id.";
const USER_NOT_FOUND_ERROR = "That user does not exist.";
const DUPLICATE_EMAIL_ERROR =
  "That email is already in use, please use another.";
const INVALID_USER_ID_ERROR = "Invalid user ID.";

const LOGIN_ERROR = "Incorrect password or email.";
const USERNAME_PASSWORD_REQUIRED_ERROR =
  "The email and password fields are required.";
const AUTHORIZATION_ERROR = "Authorization required.";

const CLOTHING_ITEM_NOT_FOUND_ERROR = "That clothing item does not exist.";
const INVALID_CLOTHING_ITEM_ID_ERROR = "Invalid clothing item ID.";
const INVALID_CLOTHING_ITEM_USER_ERROR =
  "You don't have permission to delete that.";

const INVALID_ROUTE_ERROR = "Invalid route";

const BAD_REQUEST_STATUS = 400;
const AUTHENTICATION_ERROR_STATUS = 401;
const INSUFFICIENT_PERMISSIONS = 403;
const NOT_FOUND_STATUS = 404;
const UNIQUE_CONFLICT = 409;
const DEFAULT_STATUS = 500;
const CREATED_STATUS = 201;

const JOI_NAME_MIN_LENGTH_ERROR = 'The minimum length of the "name" field is 2';
const JOI_NAME_MAX_LENGTH_ERROR =
  'The maximum length of the "name" field is 30';
const JOI_NAME_EMPTY_ERROR = 'The "name" field must be filled in';
const JOI_WEATHER_EMPTY_ERROR = 'A "weather" must be chosen';
const JOI_CARD_URL_EMPTY_ERROR = 'The "imageUrl" field must be filled in';
const JOI_CARD_URL_INVALID_ERROR = 'the "imageUrl" field must be a valid url';
const JOI_USER_URL_EMPTY_ERROR = 'The "avatar" field must be filled in';
const JOI_USER_URL_INVALID_ERROR = 'the "avatar" field must be a valid url';
const JOI_USER_EMAIL_EMPTY_ERROR = 'The "email" field must be filled in';
const JOI_USER_EMAIL_INVALID_ERROR = 'The "email" field must be a valid url';
const JOI_USER_PASSWORD_EMPTY_ERROR = 'The "password" field must be filled in';
const JOI_CARD_MISSING_ID_ERROR = "A card ID must be provided";

const CARD_NAME_MIN_LENGTH = 2;
const CARD_NAME_MAX_LENGTH = 30;
const USER_NAME_MIN_LENGTH = 2;
const USER_NAME_MAX_LENGTH = 30;

module.exports = {
  DEFAULT_ERROR,
  CREATE_USER_ERROR,
  CREATE_CLOTHING_ITEM_ERROR,
  USER_NOT_FOUND_ERROR,
  DUPLICATE_EMAIL_ERROR,
  LOGIN_ERROR,
  USERNAME_PASSWORD_REQUIRED_ERROR,
  AUTHORIZATION_ERROR,
  CLOTHING_ITEM_NOT_FOUND_ERROR,
  INVALID_USER_ID_ERROR,
  INVALID_CLOTHING_ITEM_ID_ERROR,
  INVALID_CLOTHING_ITEM_USER_ERROR,
  INVALID_ROUTE_ERROR,
  BAD_REQUEST_STATUS,
  AUTHENTICATION_ERROR_STATUS,
  INSUFFICIENT_PERMISSIONS,
  NOT_FOUND_STATUS,
  UNIQUE_CONFLICT,
  DEFAULT_STATUS,
  CREATED_STATUS,
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
};
