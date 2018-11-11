import * as React from 'react';
import NavItem from '../NavItem/NavItem';
import styles from './items.module.css';


export default ({ row }: any) => {

    const classes = `${styles.Items} ${row ? styles.Row : styles.Col}`;
    return (
        <ul className={classes}>
            <NavItem exact={true} link='/builder'>Builder</NavItem>
            <NavItem link='/orders'>Orders</NavItem>
        </ul>
    );
};