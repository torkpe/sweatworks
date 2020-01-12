require('./.mock');

const handlerService = require('./handlerService');
const { findAllAuthors,  findAllPublications } = handlerService;

describe('Authors', () => {
  it('get all authors returns an array of 1', async () => {
    const users = await findAllAuthors();
    expect(users.length).toEqual(1);
    expect(users[0].firstName).toEqual('Jane');
  });
});

// describe('Publications', () => {
//   it('get all publications returns an array of 1', async () => {
//     const publications = await findAllPublications();
//     expect(publications.length).toEqual(1);
//     expect(publications[0].firstName).toEqual('Jane');
//   });
// });
