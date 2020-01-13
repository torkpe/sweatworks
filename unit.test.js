require('./.mock');
const handlerService = require('./services/authorsService');
const publicationsService = require('./services/publicationsService');
const publications = require('./publicationsHandler');
const { getAuthors } = handlerService;
const { getPublications } = publicationsService;

describe('Authors', () => {
  it('get all authors returns an array of 1', async () => {
    const users = await getAuthors();
    expect(users.length).toEqual(1);
    expect(users[0].firstName).toEqual('Jane');
  });
});

describe('Publications', () => {
  it('get all publications returns an array of 1', async () => {
    const publications = await getPublications('ASC', '', 10);
    expect(publications.rows.length).toEqual(1);
    expect(publications.count).toEqual(1);
  });

  it('makes request to getPublications', (done) => {
    publications.getPublications({
      queryStringParameters: {
        order: 'ASC',
        offset: 10
      }
    }, undefined, async(err, response) => {
      const publications = await JSON.parse(response.body);
      expect(publications.publications.rows.length).toEqual(1);
      expect(publications.publications.count).toEqual(1);
      expect(spyOnGetPublicationsService).toHaveBeenCalled()
      done();
    });
  })
});
