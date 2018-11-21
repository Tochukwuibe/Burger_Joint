import { connect } from 'react-redux';
import { CheckoutActions } from '../../actions/checkout';




const stateToProps = ({ builder, checkout, auth }) => {
    const { price, currentIngredients } = builder;
    const { loading, complete } = checkout;
    return {
        ingredients: currentIngredients,
        price,
        loading,
        complete,
        token: auth.authData.idToken
    }
}

const actionsToProps = (dispatch) => {
    return {
        makeOrder: (order, token) => dispatch(CheckoutActions.make_Order(order, token))
    }
}



export default connect(stateToProps, actionsToProps)

