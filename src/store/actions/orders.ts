import { orders } from '../../http/http';
export enum OrderActionTypes {
    ADD_ORDERS = 'ADD_ORDERS',
    FETCH_ORDERS = 'FETCH_ORDERS',
    MANAGEUI = 'MANAGEUI',
    ADD_ORDER = 'ADD_ORDER'
}


export const OrderActions = {
    add_Orders: (orders) => {
        return { type: OrderActionTypes.ADD_ORDERS, payload: orders }
    },
    manageUI: (data) =>  {
        return {type: OrderActionTypes.MANAGEUI, payload: data}
    },
    addOrder: (order) => {
        return {type: OrderActionTypes.ADD_ORDER, payload: order}
    },
    // using a thunk antion creator
    fetchOrders: () => {
        return async (dispatch) => {
            try {

                dispatch(OrderActions.manageUI({loading: true}));
                const res = await orders.get('/orders.json');
                dispatch(OrderActions.manageUI({loading: false}));
                dispatch(OrderActions.add_Orders(res.data));
                

            } catch (e) {
                dispatch(OrderActions.add_Orders([]));
                dispatch(OrderActions.manageUI({loading: false}));
            }
          
        }
    }
}