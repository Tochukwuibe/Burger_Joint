import { combineReducers } from 'redux'
import builder from './BurgerBuilder/builder.reducer';
import checkout from './Checkout/checkout.reducer';
import orders from './Orders/orders.reducers';

export const reducer = combineReducers({
    builder: builder,
    checkout: checkout,
    orders: orders
});