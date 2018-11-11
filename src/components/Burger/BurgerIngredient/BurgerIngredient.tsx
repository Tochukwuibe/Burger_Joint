import * as React from 'react';
import  styles from './ingredient.module.css';

export default ({ type }: { type: string }) => {
    let ingredient: any = null;

    switch (type) {
        case 'bread-bottom': {
            ingredient = <div className={styles.BreadBottom} />;
            break;
        }

        case 'bread-top': {
            ingredient = (
                <div className={styles.BreadTop}>
                    <div className={styles.Seeds1} />>
                    <div className={styles.Seeds2} />
                </div>
            );
            break;
        }

        case 'meat': {
            ingredient = (
                ingredient = <div className={styles.Meat} />
            );
            break;
        }

        case 'cheese': {
            ingredient = (
                ingredient = <div className={styles.Cheese} />
            );
            break;
        }

        case 'bacon': {
            ingredient = (
                ingredient = <div className={styles.Bacon} />
            );
            break;
        }

        case 'salad': {
            ingredient = (
                ingredient = <div className={styles.Salad} />
            );
            break;
        }

       default: {
           ingredient = null;
       }
    }

    return ingredient;

};