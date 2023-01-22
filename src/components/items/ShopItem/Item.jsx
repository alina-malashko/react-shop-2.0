import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, remember } from '../../../redux/actions';
import styles from './Item.module.scss';

const Item = (props) => {
    const dispatch = useDispatch();
    const clickedProducts = useSelector((state) => state.itemReducer.clickedProducts);
    const [count, setCount] = useState(props.counter);
    const [clicked, setClicked] = useState(props.clicked);
    const rememberClicked = (id, counter) => {
        let clickedObj = {...clickedProducts, id: id, counter: counter};
        dispatch(remember(clickedObj));
    };
    const countPrice = (event) => {
        let counter = count + 1;
        rememberClicked(props.item.id, counter);
        setClicked(true);
        setCount(counter);
        let item = {
            id: props.item.id,
            img: props.item.img,
            name: props.item.name,
            price: props.item.price,
            mark: props.item.mark,
            counter: counter,
            clicked: clicked
        };
        dispatch(addItem(item));
    };
    return (
        <figure className={styles.ItemCard} key={props.item.id} id={props.item.id}>
            <div className={styles.ItemCard__image}>
                <img src={props.item.img} alt={props.item.name} title={props.item.name}></img>
                <div className={styles.ItemCard__button} onClick={countPrice}>
                    <img title="Добавить" alt="Добавить" src="https://svgshare.com/i/oFP.svg"></img>
                </div>
            </div>
            <figcaption className={styles.ItemCard__caption}>
                <p>{props.item.name}</p>
                <div className={styles.ItemCard__caption__subcaption}>
                    <p>{props.item.price} р.</p>
                    <p className={styles.mark}>{props.item.mark}</p>
                    {clicked &&
                        <div className={styles.Item_in_cart}>
                            &#10004;
                            {count}
                        </div>
                    }
                </div>
            </figcaption>
        </figure>
    );
}

export default Item;