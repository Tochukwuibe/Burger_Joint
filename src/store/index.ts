import { createStore, applyMiddleware, compose } from 'redux'
import { reducer } from './reducers/index';
import  thunk  from 'redux-thunk';


const win = window as any;
const composeEnhancers = win.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunk))
)