import * as React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import styles from './logo.module.css';

export default () => (
    <div className={styles.Logo}>
        <div className={styles.ImgContainer}>
            <img className={styles.Image} src={burgerLogo} alt="my burger" />
        </div>

    </div>
);