import { OrderActions } from './../../actions/orders';
import { connect } from 'react-redux';




const stateToProps = (store) => {
    const { orders, loading,  } = store.orders;
    const {authData, authenticated} = store.auth;
    return {
        orders,
        loading,
        token: authData.idToken,
        authenticated
    }
}

const actionsToProps = (dispatch) => {
    return {
        fetchOrders: (token) => dispatch(OrderActions.fetchOrders(token)),
    }
}



export default connect(stateToProps, actionsToProps)





