import { OrderActions } from './../../actions/orders';
import { connect } from 'react-redux';




const stateToProps = (store) => {
    const { orders, loading, } = store.orders;
    const { authData, authenticated } = store.auth;
    return {
        orders,
        loading,
        token: !!authData ? authData.idToken : '',
        authenticated,
        userId: !!authData ? authData.localId : ''
    }
}

const actionsToProps = (dispatch) => {
    return {
        fetchOrders: (token, userId) => dispatch(OrderActions.fetchOrders(token, userId)),
    }
}



export default connect(stateToProps, actionsToProps)





