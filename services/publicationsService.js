'use strict';
const Sequelize = require('sequelize');
const model = require('../models');
const { Author, Publication } = model;

const Op = Sequelize.Op;

module.exports.getPublications = async (order, searchKey, offset) => {
  const query = {
    isDeleted: false
  };

  if (searchKey) {

    query.title = {
      [Op.like]: `%${searchKey}%`
    }
  };

  const publications = await Publication.findAndCountAll({
    where: {
      ...query
    },
    limit: 10,
    offset,
    attributes: ['id', 'title', 'createdAt', 'body', 'authorId'],
    order: [['createdAt', order]],
    include: [
      {
        model: Author,
        as: 'author',
        attributes: ['firstName', 'lastName']
      }
    ],
  });
  return publications;
}

module.exports.addPublication = async (publication) => {
  const createdPublication = await Publication.create({
    ...publication
  });
  return createdPublication;
}

module.exports.updatePublication = async (data, id) => {
  const updatedPublication = await Publication.update(
    {
      ...data
    }, {
      where: {
        id
      }
    });
  return updatedPublication;
}

module.exports.getPublication = async (id) => {
  const publication = await Publication.findOne({
    where: {
      isDeleted: false,
      id
    },
    attributes: ['id', 'title', 'createdAt', 'body'],
    include: [
      {
        model: Author,
        as: 'author',
        attributes: ['firstName', 'lastName']
      }
    ],
  });
  return publication;
}