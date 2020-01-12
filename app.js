const express = require('express');
const app = express();

const model = require('./models');
const { Author, Publication } = model;

'use strict';
const handlerService = require('./services/authorsService');
const pub = require('./services/publicationsService');
const {
  validateAuthorPayLoad, validateDate,
  validateEmail
} = require('./utils/validation');
const {
  getPublications
} = pub;
const {
  getAuthors,
  getAuthor, addAuthor,
  updateAuthor
} = handlerService;

app.get('/get-authors', async (req, res) => {
  try {
    const authors = await Author.findAll({
      attributes: ["id", "firstName", "lastName", "email", "DOB"],
      include: [
        {
          model: Publication,
          as: 'publications',
          attributes: ['title', 'createdAt', 'body', 'authorId']
        }
      ]
    });
    res.status(200).json({
      authors
    });
  } catch (error) {
    console.log(error.toString())
    res.status(500).send({
      message: "Something went wrong"
    });
  }
});

app.get('/get-publications', async (req, res) => {
  try {
    const { query } = req;
    const { searchKey, order } = query;
    let publications;
    const orderBy = order === 'DESC' || order === 'ASC' ? order : 'DESC';
    if (searchKey) {
      publications = await getPublications(orderBy, searchKey);
    } else {
      publications = await getPublications(orderBy, undefined);
    }
    res.status(200).json({
      publications
    });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong"
    });
  }
});

app.get('/authors/:id', async (req, res) => {
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    }
  };
  const author = await getAuthor(req.params.id)
  if (!author) {
    response.statusCode = 404;
    response.body = JSON.stringify({
      error: {
        message: `Cannot find user with id ${req.params.id}`
      }
    });
    return;
  }
  res.status(200).send({author})
});

app.listen(4000, ()=> {
  console.log('running');
});