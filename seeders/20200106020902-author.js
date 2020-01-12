'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Authors', [
      {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'janedoe@email.com',
        DOB: '1995-09-14',
      },
      {
        firstName: 'James',
        lastName: 'arthur',
        email: 'jamesarthur@email.com',
        DOB: '1996-09-14',
      },
      {
        firstName: 'Jean',
        lastName: 'Gray',
        email: 'jeangr@email.com',
        DOB: '1996-09-14',
      },
      {
        firstName: 'name',
        lastName: 'last',
        email: 'name@email.com',
        DOB: '1996-09-14',
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Authors', null, {});
  }
};
