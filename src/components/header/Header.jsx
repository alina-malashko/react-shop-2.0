import React from 'react';
import styles from '../../pages/Shop/Shop.module.scss';
import { NavLink } from 'react-router-dom';
import CartBtn from '../buttons/CartBtn';

const Header = () => {
    return (
        <header className={styles.Shop__banner}>
            <div className={styles.Shop__header}>
                <a href='tel:89811201117'>
                    <img src='https://svgshare.com/i/oHH.svg' alt='Позвонить' />
                </a>
                <NavLink to='/'>
                    <img src='https://i.postimg.cc/D0bQc1Yj/logo.png' alt='Логотип' />
                </NavLink>
                <NavLink to='/cart'>
                    <CartBtn />
                </NavLink>
            </div>
            <div>
                <h1 className={styles.Shop__heading}>
                    Исключительное качество без компромиссов
                </h1>
                <p className={styles.Shop__subheading}>
                    Ножи «Tuotown» – это главный инструмент поваров и секрет кулинарного мастерства
                </p>
            </div>
        </header>
    );
};

export default Header;