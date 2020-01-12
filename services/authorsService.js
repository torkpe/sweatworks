'use strict';
const model = require('../models');
const { Author, Publication } = model;

module.exports.addAuthor = async (author) => {
  const createdAuthor = await Author.create({
    ...author
  });
  return createdAuthor;
}

module.exports.updateAuthor = async (data, id) => {
  const updatedAuthor = await Author.update(
    {
      ...data
    }, {
      where: {
        id
      }
    });
  return updatedAuthor;
}

module.exports.getAuthors = async () => {
  const authors = await Author.findAll({
    where: {
      isDeleted: false
    },
    attributes: ["id", "firstName", "lastName", "email", "DOB"],
    include: [
      {
        model: Publication,
        as: 'publications',
        attributes: ['title', 'createdAt', 'body']
      }
    ]
  });
  return authors;
}

module.exports.getAuthor = async (id) => {
  const author = await Author.findOne({
    where: {
      isDeleted: false,
      id
    },
    attributes: ["id", "firstName", "lastName", "email", "DOB"],
    include: [
      {
        model: Publication,
        as: 'publications',
        attributes: ['title', 'createdAt', 'body', 'authorId']
      }
    ]
  });
  return author;
}
