jest.mock('./models/author', () => () => {
  const SequelizeMock = require('sequelize-mock');
  const dbMock = new SequelizeMock();
  const author = dbMock.define('Author',  {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'janedoe@email.com',
    DOB: '1995-09-14',
  });
  author.associate = function(models) {
    author.hasMany(models.Publication, {as: 'publications', targetKey: 'id', foreignKey: 'authorId'});
  }
  return author;
});

module.exports.pub = jest.mock('./models/publication', () => () => {
  const SequelizeMock = require('sequelize-mock');
  const dbMock = new SequelizeMock();
  const publication = dbMock.define('Publication',  {
    title: 'title3',
    body: 'some random text for the body test',
    authorId: 1,
  });
  publication.associate = function(models) {
    publication.belongsTo(models.Author, {foreignKey: 'authorId', as: 'author'});
  }
  return publication;
});
