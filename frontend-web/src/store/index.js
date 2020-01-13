import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

const configureStore = () => createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    process.env.REACT_APP_NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.devToolsExtension() : f => f
  )
);
export default configureStore;