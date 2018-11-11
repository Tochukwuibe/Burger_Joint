import * as React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import style from './burger.module.css';

export default ({ ingredients }: { ingredients: {} }) => {



    let ingredientKeys = Object.keys(ingredients).map((key) => {
        return Array(ingredients[key]).fill(null)
            .map((_, i) => <BurgerIngredient key={key + i} type={key} />);
    }).reduce((acc, curr) => acc.concat(curr), []);





    if (ingredientKeys.length <= 0) {
        ingredientKeys = [
            <div key="empty" className={style.Empty}><p >You can add ingredients</p>
            </div>
        ];
    }



    return (
        <div className={style.Burger}>
            <BurgerIngredient type='bread-top' />
            {ingredientKeys}
            <BurgerIngredient type='bread-bottom' />
        </div>
    );
};
