import * as React from 'react';
import Logo from '../../Logo/Logo';
import Navitems from '../NavItems/Navitems';
import styles from './toolbar.module.css';

export default ({ open }: any) => {

    return (
        <header className={styles.Toolbar}>
            <div onClick={open}>Menu</div>
            <div className={styles.LogoContainer}>
                <Logo />
            </div>
            <nav>
                <Navitems/>
            </nav>
        </header>
    );
};