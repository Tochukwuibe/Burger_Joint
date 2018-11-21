import { BuilderActionTypes } from '../../actions/builder';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 3
};

const initialState = {
    ingredients: null,
    currentIngredients: null,
    price: 4,
    loading: false,
    error: false
}

export default (state = initialState, action) => {
    console.log('the action ', action);
    switch (action.type) {

        case BuilderActionTypes.ADD_INGREDIENTS: {
            return { ...state, ingredients: action.payload }
        }

        case BuilderActionTypes.ADD_INGREDIENT: {
            const currentIngredients = { ...(state.currentIngredients || {}) }
            const currentCount = currentIngredients[action.payload] ? currentIngredients[action.payload] : 0;
            const nextcount = currentCount + 1;
            currentIngredients[action.payload] = nextcount;

            const price = getPrice(currentIngredients) + 4;

            console.log('the state after add ', { ...state, currentIngredients, price })
            return { ...state, currentIngredients, price }
        }

        case BuilderActionTypes.REMOVE_INGREDIENT: {

            const currentIngredients = { ...(state.currentIngredients || {}) }
            const currentCount = currentIngredients[action.payload] ? currentIngredients[action.payload] : 0;
            const nextcount = currentCount - 1;
            currentIngredients[action.payload] = nextcount >= 0 ? nextcount : 0;

            if (!currentIngredients[action.payload]) { delete currentIngredients[action.payload] }

            const price = getPrice(currentIngredients) + 4;

            console.log('the state after add ', { ...state, currentIngredients, price })
            return { ...state, currentIngredients, price }
        }

        
        case BuilderActionTypes.RESET_ORDER: {
            return {...state, ...initialState, ingredients: state.ingredients}
        }


        case BuilderActionTypes.MANAGEUI: {
            return {
                ...state,
                ...action.payload
            }
        }


        default: {
            return state;
        }
    }
}


function getPrice(ingredients: { [key: string]: number }) {
    return Object.keys(ingredients).map(key => {
        return ingredients[key] * INGREDIENT_PRICES[key];
    })
        .reduce((acc, curr) => acc + curr, 0);
}