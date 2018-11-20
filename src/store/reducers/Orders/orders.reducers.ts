import { OrderActionTypes } from "../../actions/orders";

const initialState = {
    orders: [],
    loading: false
}

export default (state = initialState, action) => {
    switch (action.type) {

        case OrderActionTypes.ADD_ORDERS: {
            
            return { ...state, orders: mapArrayFormDatabase(action.payload) }
        }

        case OrderActionTypes.ADD_ORDER: {
            
            return { ...state, orders: [...state.orders, action.payload] }
        }

        case OrderActionTypes.MANAGEUI : {
            return {...state, ...action.payload}
        }

        default: {
            return state;
        }
    }
}


function mapArrayFormDatabase(data: {}) {
    return Object.keys(data).map((key) => {
        return { id: key, ...data[key] };
    });
}