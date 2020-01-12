import { combineReducers } from 'redux';
import * as authorReducers from './authors';
import * as publicationReducers from './publications';
import { toggleModal } from './modal';

const rootReducer = combineReducers({
  authors: authorReducers.getAuthors,
  publications: publicationReducers.getPublications,
  modal: toggleModal
});

export default rootReducer;