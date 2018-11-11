import * as React from 'react';
import { NavLink } from 'react-router-dom'
import  styles  from './item.module.css';

export default ({ children, link, exact }: any) => (
    <li className={styles.Item}>
        <NavLink
            to={link}
            activeClassName={styles.active}
            exact={exact}
            >
            {children}
        </NavLink>
    </li>
);