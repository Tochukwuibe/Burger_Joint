import * as React from 'react';
import  styles from './backdrop.module.css';

export default ({ show, clicked }: any) => {
    return show ? <div onClick={clicked}  className={styles.Backdrop} /> : null;
};
