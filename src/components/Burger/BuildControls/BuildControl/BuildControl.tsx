import * as React from 'react';
import  styles from './control.module.css';

export default ({ label, more, less, amount }: any) => (
    <div className={styles.BuildControl}>
        <div className={styles.label}>{label}</div>
        <div>{amount}</div>
        <button disabled={amount <= 0} onClick={less} className={styles.Less}>Less</button>
        <button onClick={more} className={styles.More}>More</button>
    </div>
);