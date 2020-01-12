import {
  AUTHORS,
  BASE_URL,
} from '../utils/constants';

export const getAuthors = () => async (dispatch) => {
  dispatch({ type: AUTHORS.GET_AUTHORS });
  try {
    const request = await fetch(`${BASE_URL}/authors`);
    const response = await request.json();
    if (request.ok) {
      dispatch({
        type: AUTHORS.GET_AUTHORS_SUCCESSFUL,
        payload: response.authors
      });
      return;
    }
    dispatch({
      type: AUTHORS.GET_AUTHORS_FAILED,
      payload: response.error
    });
  } catch (error) {
    dispatch({
      type: AUTHORS.GET_AUTHORS_FAILED,
      payload: {
        message: error
      }
    });
  }
}
