'use strict';
const services = require('./services');
const {
  validatePublicationPayLoad,
  validateId
} = require('./utils/validation');

const { authorService, publicationsService } = services;

const {
  getPublications,
  getPublication,
  addPublication,
  updatePublication,
} = publicationsService;

const {
  getAuthor
} = authorService;

module.exports.getPublications = async (event, context, callback) => {
  const { queryStringParameters } = event;
  let publications;
  if (queryStringParameters) {
    const { searchKey, order } = queryStringParameters;
    const page = queryStringParameters.page || 0;
    const offset = parseInt(page, 10) * 10;
    const orderBy = order === 'DESC' || order === 'ASC' ? order : 'DESC';

    if (searchKey) {
      publications = await getPublications(orderBy, searchKey, offset);
    } else {
      publications = await getPublications(orderBy, undefined, offset);
    }
  } else {
    publications = await getPublications();
  }
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    },
    body: JSON.stringify({ publications })
  };
  callback(null, response);
};

module.exports.getPublication = async (event, context, callback) => {
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
  const publication = await getPublication(id)
  if (!publication) {
    response.statusCode = 404;
    response.body = JSON.stringify({
      error: {
        message: `Cannot find publication with id ${id}`
      }
    });
    callback(null, response);
    return;
  }
  response.body = JSON.stringify({publication});
  callback(null, response);
};

module.exports.addPublication = async (event, context, callback) => {
  const { body } = event;
  const parsedBody = JSON.parse(body);
  const response = {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    },
  };
  const error = validatePublicationPayLoad(parsedBody);
  if (error !== false) {
    response.statusCode = 400
    response.body = JSON.stringify({ error });
    callback(null, response);
    return;
  }

  const author = await getAuthor(parsedBody.authorId);
  if (!author) {
    response.statusCode = 404;
    response.body = JSON.stringify({
      error: {
        message: `Cannot find author with id ${parsedBody.authorId}`
      }
    });
    callback(null, response);
    return;
  }

  parsedBody.title = parsedBody.title.trim();
  parsedBody.body = parsedBody.body.trim();
  parsedBody.authorId = parseInt(parsedBody.authorId)

  await addPublication(parsedBody);
  response.body = JSON.stringify({
    success: {
      message: 'Successfully added publication'
    }
  });
  callback(null, response);
};

module.exports.updatePublication = async (event, context, callback) => {
  const { body } = event;
  const { title, body: publicationBody, authorId } = JSON.parse(body);
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

  const publication = await getPublication(id)

  if (!publication) {
    response.statusCode = 404;
    response.body = JSON.stringify({
      error: {
        message: `Cannot find publication with id ${id}`
      }
    });
    callback(null, response);
    return;
  }
  if (title && title.length >= 2) {
    patchedData.title = title.trim()
  }

  if (publicationBody && publicationBody.length >= 10) {
    patchedData.body = publicationBody.trim();
  }

  if (authorId && validateId(authorId)) {
    patchedData.authorId = parseInt(authorId)
  }
  
  const author = await getAuthor(authorId);
  if (!author) {
    response.statusCode = 404;
    response.body = JSON.stringify({
      error: {
        message: `Cannot find author with id ${authorId}`
      }
    });
    callback(null, response);
    return;
  }

  await updatePublication(patchedData, id);

  response.body = JSON.stringify({
    success: {
      message: 'Successfully updated publication'
    }
  });
  callback(null, response);
};

module.exports.deletePublication = async (event, context, callback) => {
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
  const publication = await getPublication(id)
  if (!publication) {
    response.statusCode = 404;
    response.body = JSON.stringify({
      error: {
        message: `Cannot find publication with id ${id}`
      }
    });
    callback(null, response);
    return;
  }
  await updatePublication({ isDeleted: true }, id);
  response.body = JSON.stringify({
    success: {
      message: "Successfully deleted publication"
    }
  })
  callback(null, response);
};
