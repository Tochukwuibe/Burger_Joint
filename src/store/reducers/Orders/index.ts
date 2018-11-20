import { OrderActions } from './../../actions/orders';
import { connect } from 'react-redux';




const stateToProps = (store) => {
    const { orders, loading,  } = store.orders;
    return {
        orders,
        loading,
    }
}

const actionsToProps = (dispatch) => {
    return {
        fetchOrders: () => dispatch(OrderActions.fetchOrders()),
    }
}



export default connect(stateToProps, actionsToProps)





