'use strict';
module.exports = (sequelize, DataTypes) => {
  const author = sequelize.define('Author', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    DOB: DataTypes.STRING,
    isDeleted: false
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        // Author.hasMany(models.Publication, {as: 'publications'});
      }
    }
  });
  author.associate = function(models) {
    author.hasMany(models.Publication, {as: 'publications', targetKey: 'id', foreignKey: 'authorId'});
  }
  return author;
};