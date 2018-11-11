import * as React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import  styles from './summary.module.css';

export const CheckOutSummarty = ({ ingredients, proceed, cancel }) => {
    return (
        <div className={styles.Summary}>
            <h1>Your Order</h1>

            <div className={styles.Burger}>
                <Burger ingredients={ingredients} />
            </div>

            <div>
                <Button clicked={proceed} btnType="Success">PROCEED</Button>
                <Button clicked={cancel} btnType='Danger'>CANCEL</Button>

            </div>
        </div>
    );
};