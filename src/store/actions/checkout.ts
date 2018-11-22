import { BuilderActions } from './builder';
import { orders } from '../../http/http';
import { OrderActions } from './orders';
export enum CheckoutActionTypes {
    MAKE_ORDER = 'MAKE_OEDER',
    MANAGEUI = 'MANAGE_UI',
    INIT_CHECKOUT = 'INIT_CHECKOUT'
}


export const CheckoutActions = {

    manageUI: (data) => {
        return {type: CheckoutActionTypes.MANAGEUI, payload: data};
    },
    make_Order: (order, token, userId) => {
        return async(dispatch) => {
            try {
                dispatch(CheckoutActions.manageUI({loading: true}))
                const res = await orders.post(`/orders/${userId}.json?auth=` + token, order);
                console.log('the order response ', res.data);

                dispatch(CheckoutActions.manageUI({loading: false, complete: true}));
                dispatch(OrderActions.addOrder({...order, id: res.data.name}));
                dispatch(BuilderActions.resetOrder())

            } catch(e) {
                dispatch(CheckoutActions.manageUI({loading: false}))
            }
        }
    },
    initCheckout: () => {
        return {type: CheckoutActionTypes.INIT_CHECKOUT}
    }
}

