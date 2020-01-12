import { AUTHORS } from '../utils/constants';

const initialState = {
  isFetching: false,
  authors: [],
  error: {}
}

export const getAuthors = (state = initialState, action = {}) => {
  switch (action.type) {
    case AUTHORS.GET_AUTHORS: {
      return {
        ...state,
        isFetching: true
      }
    }
    case AUTHORS.GET_AUTHORS_SUCCESSFUL: {
      return {
        ...state,
        isFetching: false,
        authors: action.payload
      }
    }
    case AUTHORS.GET_AUTHORS_FAILED: {
      return {
        ...state,
        isFetching: false,
        error: action.payload
      }
    }
    default: return state
  }
}