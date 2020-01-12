import {
  MODAL
} from '../utils/constants';

export const toggleModal = (openModal, body= '') => (dispatch) => {
  if (openModal) {
    dispatch({
      type: MODAL.DISPLAY_MODAL,
      payload: body
    });
  } else {
    dispatch({
      type: MODAL.CLOSE_MODAL,
      payload: ''
    });
  }
}