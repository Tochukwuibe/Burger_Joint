import * as React from 'react';
import styles from './Order.module.css';

export const Order = ({ order }) => {

    function mapIngredients(ings: any) {
        return Object.keys(ings).map((key, index) => {
            return { key: key + index, name: key, amount: ings[key] };
        })
            .map((ing) => <p className={styles.Chip} key={ing.key}>{ing.name} ({ing.amount})</p>);
    }

    return (
        <div className={styles.Order} >
            <div className={styles.Ingredients}>
               <p className={styles.Label}>Ingredients:</p>  {mapIngredients(order.ingredients)}
            </div>
            <p>Price: <strong>USD ${order.price.toFixed(2)}</strong> </p>
        </div>
    );
};