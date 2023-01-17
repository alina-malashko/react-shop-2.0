import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './Shop.module.scss';
import NavMenu from '../../components/navigation/NavMenu';
import Header from '../../components/header/Header';

const Shop = (props) => {
    return (
        <div className={styles.Shop}>
            <Header />
            <NavMenu />
            <Outlet />
            <footer className={styles.Shop__footer}>
                <p>© 2022 Все права защищены и принадлежат правообладателям.</p>
            </footer>
        </div>
    );
};

export default Shop;