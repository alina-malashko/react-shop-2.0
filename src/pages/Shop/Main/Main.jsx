import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from '../Shop.module.scss';
import Item from '../../../components/items/ShopItem/Item';
import Categories from '../../../components/categories/Categories';

const Main = (props) => {
    const clickedProducts = useSelector((state) => state.itemReducer.clickedProducts);
    const [sortedKnives, setSortedKnives] = useState(props.knives);
    const [sorted, setSorted] = useState('all');
    const sort = (event) => {
        let allKnives = [...props.knives];
        if (event.target.id === 'new') {
            let option = 'Новинка';
            let sortedKnives = allKnives.filter(item => item.mark === option);
            setSorted('new');
            setSortedKnives(sortedKnives);
        };
        if (event.target.id === 'all') {
            setSorted('all');
            setSortedKnives(allKnives);
        };
        if (event.target.id === 'price') {
            let sortedKnives = allKnives.sort((a, b) => a.price - b.price);
            setSorted('price');
            setSortedKnives(sortedKnives);
        };
    };
    return (
        <>
            <section className={styles.Shop__categories}>
                <Categories sort={sort} sorted={sorted} />
            </section>
            <main className={styles.Shop__content}>
                {sortedKnives.map(el => {
                    let newId = el.id.toString();
                    if (clickedProducts.hasOwnProperty(newId)) {
                        return <Item 
                                    key={el.id}
                                    item={el} 
                                    counter={clickedProducts[newId]} 
                                    clicked={true} 
                                />
                    } else {
                        return <Item 
                                    key={el.id} 
                                    item={el} 
                                    counter={0} 
                                    clicked={false}
                                />
                    }
                })}
            </main>
        </>
    );
};

export default Main;