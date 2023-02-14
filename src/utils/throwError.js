const throwError = {
  BAD_REQUEST: (message) => {
    throw { message, status: 400 };
  },
  SERVER_ERROR: (message) => {
    throw { message, status: 500 };
  },
  NOT_FOUND: (message) => {
    throw { message, status: 404 };
  },
};

module.exports = { throwError };
