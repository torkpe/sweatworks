import { PUBLICATIONS } from '../utils/constants';

const initialState = {
  isFetching: false,
  publications: [],
  numberOfPublications: 0,
  error: {}
}

export const getPublications = (state = initialState, action = {}) => {
  switch (action.type) {
    case PUBLICATIONS.GET_PUBLICATIONS: {
      return {
        ...state,
        isFetching: true
      }
    }
    case PUBLICATIONS.GET_PUBLICATIONS_SUCCESSFUL: {
      return {
        ...state,
        isFetching: false,
        publications: action.payload.rows,
        numberOfPublications: action.payload.count
      }
    }
    case PUBLICATIONS.GET_PUBLICATIONS_FAILED: {
      return {
        ...state,
        isFetching: false,
        error: action.payload
      }
    }
    default: return state
  }
}
