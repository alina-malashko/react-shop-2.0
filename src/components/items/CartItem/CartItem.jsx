import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteItem, changeQty } from '../../../redux/actions';
import styles from './CartItem.module.scss';

const CartItem = (props) => {
    const dispatch = useDispatch();
    const delItem = () => {
        dispatch(deleteItem(props.item));
    };
    const change = (event) => {
        let value = event.target.value;
        if (event.target.value === '') value = 0;
        let item = {...props.item};
        let newPrice = item.singleItemPrice * Number(value);
        item.price = newPrice;
        item.counter = Number(value);
        dispatch(changeQty(item));
    };
    return (
        <div className={styles.CartItem}>
            <img src={props.item.img}
                alt={props.item.name} 
                title={props.item.name} 
            />
            <p>{props.item.name}</p>
            <input type='text'
                defaultValue={props.item.counter} 
                onChange={change} 
                id={props.item.id} 
            />
            <p>{props.item.price} р.</p>
            <img src='https://svgshare.com/i/oMR.svg'
                alt='Удалить'
                title='Удалить'
                onClick={delItem} 
                id={props.item.id}
            />
        </div>
    );
};

export default CartItem;