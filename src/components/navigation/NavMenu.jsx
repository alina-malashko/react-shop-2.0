import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../../pages/Shop/Shop.module.scss';

const NavMenu = () => {
    const isActiveLink = ({ isActive }) => (isActive ? styles.active : '');
    return (
        <nav>
        <ul className={styles.Shop__Nav}>
            <NavLink to='/shop/kitchen' className={isActiveLink}>
                <li className={styles.Shop__Nav__btn} id='kitchen'>
                    <img src='https://svgshare.com/i/oG5.svg' alt='Кухонные ножи' />
                    <p>Кухонные ножи</p>
                </li>
            </NavLink>
            <NavLink to='/shop/folding' className={isActiveLink}>
                <li className={styles.Shop__Nav__btn} id='folding'>
                    <img src='https://svgshare.com/i/oH5.svg' alt='Складные ножи' />
                    <p>Складные ножи</p>
                </li>
            </NavLink>
            <NavLink to='/shop/sharpeners' className={isActiveLink}>
                <li className={styles.Shop__Nav__btn} id='sharpeners'>
                    <img src='https://svgshare.com/i/oH6.svg' alt='Точилки для ножей' />
                    <p>Точилки для ножей</p>
                </li>
            </NavLink>
            <NavLink to='/shop/accessories' className={isActiveLink}>
                <li className={styles.Shop__Nav__btn} id='accessories'>
                    <img src='https://svgshare.com/i/oGQ.svg' alt='Аксессуары для ножей' />
                    <p>Аксессуары для кухни</p>
                </li>
            </NavLink>
        </ul>
    </nav>
    );
};

export default NavMenu;