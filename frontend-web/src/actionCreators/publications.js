import {
  PUBLICATIONS,
  BASE_URL,
  SEARCH,
  SORT
} from '../utils/constants';

export const getPublications = (page = 0, queryValue = '', type = '') => async (dispatch) => {
  try {
    let request;
    if (type === SEARCH && queryValue.length < 1) {
      return;
    }

    dispatch({ type: PUBLICATIONS.GET_PUBLICATIONS });

    if (type === SEARCH) {
      request = await fetch(`${BASE_URL}/publications?searchKey=${queryValue}&page=${page}`);
    } else if (type === SORT) {
      request = await fetch(`${BASE_URL}/publications?order=${queryValue}&page=${page}`);
    } else {
      request = await fetch(`${BASE_URL}/publications?page=${page}`);
    }


    const response = await request.json();
    if (request.ok) {
      dispatch({
        type: PUBLICATIONS.GET_PUBLICATIONS_SUCCESSFUL,
        payload: response.publications
      });
      return;
    }
    dispatch({
      type: PUBLICATIONS.GET_PUBLICATIONS_FAILED,
      payload: response.error
    });
  } catch (error) {
    dispatch({
      type: PUBLICATIONS.GET_PUBLICATIONS_FAILED,
      payload: {
        message: error
      }
    });
  }
}

export const getPublicationsFromAuthor = (author) => (dispatch) => {
  dispatch({ type: PUBLICATIONS.SELECT_AUTHOR});
  if (author.publications) {
    const publications = author.publications.map(publication => ({
      ...publication,
      author: {
        firstName: author.firstName,
        lastName: author.lastName
      }
    }));
    dispatch({
      type: PUBLICATIONS.GET_PUBLICATIONS_SUCCESSFUL,
      payload: {rows: publications, count: publications.length}
    });
  } else {
    dispatch({
      type: PUBLICATIONS.GET_PUBLICATIONS_FAILED,
      payload: {
        message: 'This author has no publication yet'
      }
    });
  }
}