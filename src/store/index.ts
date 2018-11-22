import { createStore, applyMiddleware, compose } from 'redux'
import { reducer } from './reducers/index';
import  thunk  from 'redux-thunk';


const win = window as any;
const composeEnhancers = process.env.NODE_ENV === 'development' ? win.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose ;

export default createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunk))
)