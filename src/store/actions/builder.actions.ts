
export enum BuilderActionTypes {
    ADD_INGREDIENTS = 'AddIngredients',
    ADD_INGREDIENT = 'AddIngredient',
    REMOVE_INGREDIENT = 'RemoveIngredient'
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
    }
}
