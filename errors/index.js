const CustomAPIError = require('./custom-api');
const UnauthenticatedError = require('./unaunthenticated');
const NotFoundError = require('./not-found');
const BadRequestError = require('./bad-request');

module.exports = {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError
}
