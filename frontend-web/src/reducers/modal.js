import { MODAL } from '../utils/constants';

const initalState = {
  body: '',
  openModal: false
}

export const toggleModal = (state = initalState, action = {}) => {
  switch (action.type) {
    case MODAL.DISPLAY_MODAL: {
      return {
        ...state,
        openModal: true,
        body: action.payload
      }
    }
    case MODAL.CLOSE_MODAL: {
      return {
        ...state,
        openModal: false,
        body: action.payload
      }
    }
    default: return state;
  }
}