import { createStore, compose, applyMiddleware } from 'redux';
import reducer from './reducers';
import thunkMiddleware from 'redux-thunk';

export default createStore(reducer, undefined, compose(
  applyMiddleware(
    thunkMiddleware,
  ),
));