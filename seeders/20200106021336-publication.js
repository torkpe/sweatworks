'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Publications', [
      {
        title: 'title',
        body: 'some random text for the body',
        authorId: 1,
      },
      {
        title: 'title1',
        body: 'some random  jjfdgjdf text for the body',
        authorId: 2,
      },
      {
        title: 'title2',
        body: 'some random dsjhdh text for the body',
        authorId: 3,
      },
      {
        title: 'title3',
        body: 'some random text for the body',
        authorId: 4,
      },
      {
        title: 'title3',
        body: 'some random text for the body',
        authorId: 1,
      },
      {
        title: 'title2',
        body: 'some random dsjhdh text for the body',
        authorId: 2,
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Publications', null, {});
  }
};
