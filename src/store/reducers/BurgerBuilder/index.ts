import { connect } from 'react-redux';
import { BuilderActions } from '../../actions/builder'
import { CheckoutActions } from '../../actions/checkout';



const stateToProps = ({ builder, auth }) => {
    const { ingredients, price, currentIngredients, loading, error } = builder;
    return {
        ingredients,
        price,
        currentIngredients,
        loading,
        error,
        authenticated: auth.authenticated
    }
}

const actionsToProps = (dispatch) => {
    return {
        fetchIngredients: () => dispatch(BuilderActions.fetchIngredients()),
        addIngredient: (key) => dispatch(BuilderActions.AddIngredient(key)),
        removeIngredient: (key) => dispatch(BuilderActions.RemoveIngredient(key)),
        initCheckout: () => dispatch(CheckoutActions.initCheckout())
    }
}



export default connect(stateToProps, actionsToProps)

