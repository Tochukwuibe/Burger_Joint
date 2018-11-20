import * as React from 'react';
import styles from './button.module.css';

export default ({ children, clicked, btnType, disabled, type }: any) => {

    const classes = [styles.Button, styles[btnType]].join(' ');

    return (
        <button  type={type} disabled={disabled} onClick={clicked} className={classes} >{children}</button>
    );
};
