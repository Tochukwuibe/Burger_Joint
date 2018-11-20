import { CheckoutActionTypes } from './../../actions/checkout';
const initialState = {

    loading: false,
    complete: false
}

export default (state = initialState, action) => {
    switch (action.type) {

        case CheckoutActionTypes.MANAGEUI: {
            return { ...state, ...action.payload }
        }
        case CheckoutActionTypes.INIT_CHECKOUT: {
            return { ...state, loading: false, complete: false }
        }

        default: {
            return state;
        }
    }
}