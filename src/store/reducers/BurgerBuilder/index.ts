import { connect } from 'react-redux';
import { BuilderActions } from '../../actions/builder.actions'


// @ts-ignore
const stateToProps = ({ builder }) => {
    const { ingredients, price, currentIngredients } = builder;
    return {
        ingredients,
        price,
        currentIngredients
    }
}

const actionsToProps = (dispatch) => {
    return {
        addIngredients: (ingredients) => dispatch(BuilderActions.AddIngredients(ingredients)),
        addIngredient: (key) => dispatch(BuilderActions.AddIngredient(key)),
        removeIngredient: (key) => dispatch(BuilderActions.RemoveIngredient(key)),
    }
}



export default connect(stateToProps, actionsToProps)

