import { applyMiddleware, createStore } from 'redux';
import reducer from './reducers/mainReducer';
import reduxThunk from 'redux-thunk'

const store = createStore(
    reducer,
    applyMiddleware(reduxThunk),
);

export default store;