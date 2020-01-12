'use strict';
const Sequelize = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  var publication = sequelize.define('Publication', {
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    authorId: DataTypes.INTEGER,
    createdAt: {type: Sequelize.DATE, defaultValue: sequelize.fn('NOW')},
    isDeleted: false
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  publication.associate = function(models) {
    publication.belongsTo(models.Author, {foreignKey: 'authorId', as: 'author'});
  }
  return publication;
};