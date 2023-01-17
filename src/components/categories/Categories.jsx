import React from 'react';
import styles from '../../pages/Shop/Shop.module.scss';

const Categories = (props) => {
  return (
    <ul>
      <li onClick={props.sort} id='all' className={props.sorted === 'all' ? styles.sort : ''}>
        Все
      </li>
      <li onClick={props.sort} id='new' className={props.sorted === 'new' ? styles.sort : ''}>
        Новинки
        </li>
      <li onClick={props.sort} id='price' className={props.sorted === 'price' ? styles.sort : ''}>
        По цене
      </li>
    </ul>
  );
};

export default Categories;