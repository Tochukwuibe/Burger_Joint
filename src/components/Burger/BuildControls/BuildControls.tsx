import * as React from 'react';
import BuildControl from './BuildControl/BuildControl';
import styles from './controles.module.css';

let controls = [
    { label: 'Salad', type: 'salad', amt: 0 },
    { label: 'Bacon', type: 'bacon', amt: 0 },
    { label: 'Cheese', type: 'cheese', amt: 0 },
    { label: 'Meat', type: 'meat', amt: 0 },
];




export default ({ addIngredient, removeIngredient, ingredients, price, checkout }: any) => {

    function more(type: string) {
        return () => addIngredient(type);
    }

    function less(type: string) {
        return () => removeIngredient(type);
    }

    controls = controls.map((control) => {
        return { ...control, amt: ingredients[control.type] };
    });

    const isEmpty = controls.reduce((acc, curr) => acc + curr.amt, 0) <= 0;


    return (<div className={styles.BuildControls}>
        <p className={styles.Price}>Total: <strong>${ Math.round(price * 100) / 100}</strong> </p>
        {controls.map(cont => < BuildControl
            more={more(cont.type)}
            less={less(cont.type)}
            key={cont.label}
            label={cont.label}
            amount={cont.amt}
        />)}

        <button disabled={isEmpty} onClick={checkout} className={styles.OrderButton}>ORDER NOW</button>
    </div>);
};




