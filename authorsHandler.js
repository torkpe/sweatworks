'use strict';
const handlerService = require('./services/authorsService');
const {
  validateAuthorPayLoad,
  validateDate,
  validateEmail,
  validateId
} = require('./utils/validation');

const {
  getAuthors,
  getAuthor,
  addAuthor,
  updateAuthor
} = handlerService;

module.exports.getAuthors = async (event, context, callback) => {
  const authors = await getAuthors();
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    },
    body: JSON.stringify({authors})
  };

  callback(null, response);
};

module.exports.getAuthor = async (event, context, callback) => {
  const { pathParameters } = event;
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    }
  };

  const { id } = pathParameters;

  if (!validateId(id)) {
    response.statusCode = 400;
    response.body = JSON.stringify({
      error: {
        message: `Invalid parameter id`
      }
    });
    callback(null, response);
    return;
  }
  const author = await getAuthor(id)
  if (!author) {
    response.statusCode = 404;
    response.body = JSON.stringify({
      error: {
        message: `Cannot find user with id ${id}`
      }
    });
    callback(null, response);
    return;
  }
  response.body = JSON.stringify({author});
  callback(null, response);
};

module.exports.addAuthor = async (event, context, callback) => {
  const { body } = event;
  const parsedBody = JSON.parse(body);
  const response = {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    },
  };
  const error = validateAuthorPayLoad(parsedBody);
  if (error !== false) {
    response.statusCode = 400
    response.body = JSON.stringify({ error });
    callback(null, response);
    return;
  }

  parsedBody.email = parsedBody.email.trim();
  parsedBody.DOB = parsedBody.DOB.trim();
  parsedBody.firstName = parsedBody.firstName.trim();
  parsedBody.lastName = parsedBody.lastName.trim();

  await addAuthor(parsedBody);
  response.body = JSON.stringify({
    success: {
      message: 'Successfully added author'
    }
  });
  callback(null, response);
};

module.exports.updateAuthor = async (event, context, callback) => {
  const { body } = event;
  const { firstName, lastName, email, DOB } = JSON.parse(body);
  const patchedData = {};
  const { pathParameters } = event;
  const { id } = pathParameters;
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    }
  };

  if (!validateId(id)) {
    response.statusCode = 400;
    response.body = JSON.stringify({
      error: {
        message: `Invalid parameter id`
      }
    });
    callback(null, response);
    return;
  }
  const author = await getAuthor(id)

  if (!author) {
    response.statusCode = 404;
    response.body = JSON.stringify({
      error: {
        message: `Cannot find user with id ${id}`
      }
    });
    callback(null, response);
    return;
  }
  if (firstName && firstName.length >= 2) {
    patchedData.firstName = firstName
  }

  if (lastName && lastName.length >= 2) {
    patchedData.lastName = lastName;
  }

  if (email && validateEmail(email)) {
    patchedData.email = email;
  }

  if (DOB && validateDate(DOB)) {
    patchedData.DOB = DOB;
  }

  await updateAuthor(patchedData, id);
  response.body = JSON.stringify({
    success: {
      message: 'Successfully updated author'
    }
  });
  callback(null, response);
};

module.exports.deleteAuthor = async (event, context, callback) => {
  const { pathParameters } = event;
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    }
  };
  const { id } = pathParameters;

  if (!validateId(id)) {
    response.statusCode = 400;
    response.body = JSON.stringify({
      error: {
        message: `Invalid parameter id`
      }
    });
    callback(null, response);
    return;
  }

  const author = await getAuthor(id)
  if (!author) {
    response.statusCode = 404;
    response.body = JSON.stringify({
      error: {
        message: `Cannot find user with id ${id}`
      }
    });
    callback(null, response);
    return;
  }
  await updateAuthor({ isDeleted: true }, id);
  response.body = JSON.stringify({
    success: {
      message: "Successfully deleted author"
    }
  })
  callback(null, response);
};
