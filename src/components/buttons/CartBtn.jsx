import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../../pages/Shop/Shop.module.scss';

const CartBtn = () => {
    const totalPrice = useSelector((state) => state.itemReducer.totalPrice);
    return (
        <div className={styles.Shop__header__cart}>
            <img src='https://svgshare.com/i/oHS.svg' alt='Корзина' />
            {totalPrice !== 0 &&
                <p>{totalPrice} р.</p>
            }
        </div>
    );
};

export default CartBtn;