import { connect } from 'react-redux';
import { CheckoutActions } from '../../actions/checkout';




const stateToProps = ({ builder, checkout }) => {
    const { price, currentIngredients } = builder;
    const { loading, complete } = checkout;
    return {
        ingredients: currentIngredients,
        price,
        loading,
        complete
    }
}

const actionsToProps = (dispatch) => {
    return {
        makeOrder: (order) => dispatch(CheckoutActions.make_Order(order))
    }
}



export default connect(stateToProps, actionsToProps)

