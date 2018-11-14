import * as React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import style from './burger.module.css';

export default ({ ingredients }: { ingredients: {} }) => {


    let content = null;
    const emptyContent = [
        <div key="empty" className={style.Empty}><p >You can add ingredients</p>
        </div>
    ];

    if (!ingredients) {

        content = emptyContent;

    } else {
        console.log('the ingredients in burger', ingredients);
        content = Object.keys(ingredients).map((key) => {
            return Array(ingredients[key]).fill(null)
                .map((_, i) => <BurgerIngredient key={key + i} type={key} />);
        }).reduce((acc, curr) => acc.concat(curr), []);

    }




    if (!content.length) {
        content = emptyContent;
    }


    return (
        <div className={style.Burger}>
            <BurgerIngredient type='bread-top' />
            {content}
            <BurgerIngredient type='bread-bottom' />
        </div>
    );
};
