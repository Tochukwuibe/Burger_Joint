import { orders } from "../../http/http";

export enum BuilderActionTypes {
    ADD_INGREDIENTS = 'AddIngredients',
    ADD_INGREDIENT = 'AddIngredient',
    REMOVE_INGREDIENT = 'RemoveIngredient',
    FETCH_INGREDIENTS = 'FetchIngredients',
    MANAGEUI = 'manageUi',
    RESET_ORDER = 'RESET_ORDER'
}



export const BuilderActions = {
    AddIngredient: (ing) => {
        return { type: BuilderActionTypes.ADD_INGREDIENT, payload: ing }
    },
    RemoveIngredient: (id) => {
        return { type: BuilderActionTypes.REMOVE_INGREDIENT, payload: id }
    },
    AddIngredients: (ings) => {
        return { type: BuilderActionTypes.ADD_INGREDIENTS, payload: ings }
    },

    manageUIState: (data) => {
        return { type: BuilderActionTypes.MANAGEUI, payload: data }
    },
    resetOrder: () => {
        return {type: BuilderActionTypes.RESET_ORDER}
    },
    // using thunk to handel async tasks
    fetchIngredients: () => {

        return async (dispatch) => {
            try {
                dispatch(BuilderActions.manageUIState({ loading: true }));
                const res = await orders.get('/ingredients.json');
                dispatch(BuilderActions.AddIngredients(res.data));
                dispatch(BuilderActions.manageUIState({ loading: false }));
            } catch (e) {
                dispatch(BuilderActions.AddIngredients([]))
                dispatch(BuilderActions.manageUIState({loading: false, error: true}))
            }
        }
    }
}
