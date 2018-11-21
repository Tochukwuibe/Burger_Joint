import * as React from 'react';
import NavItem from '../NavItem/NavItem';
import styles from './items.module.css';


export default (props) => {
    const { row, authenticated } = props
    const classes = `${styles.Items} ${row ? styles.Row : styles.Col}`;
    return (
        <ul className={classes}>
            <NavItem exact={true} link='/builder'>Builder</NavItem>
            {authenticated ? <NavItem link='/orders'>Orders</NavItem> : null}
            {!authenticated ? <NavItem link='/auth'>Login</NavItem> : <NavItem link='/logout'>Logout</NavItem>}
        </ul>
    );
};


