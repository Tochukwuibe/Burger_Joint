import * as React from 'react';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/Navitems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import  styles from './drawer.module.css';

export default ({ show, close, authenticated }: any) => {

    const classes = `${styles.SideDrawer} ${show ? styles.Open : styles.Closed }`;
    const props = {row: true, authenticated};
    return (
        <>
            <Backdrop clicked={close} show={show} />
            <div className={classes}>
                <div className={styles.Logo}>
                    <Logo />
                </div>

                <nav>
                    <NavItems {...props} />
                </nav>

            </div>
        </>

    );
};