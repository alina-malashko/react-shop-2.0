import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { CSSTransition,TransitionGroup } from 'react-transition-group';
import { cleanCart } from '../../redux/actions';
import styles from './Cart.module.scss';
import CartItem from '../../components/items/CartItem/CartItem';

const Cart = () => {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.itemReducer.items);
    const totalPrice = useSelector((state) => state.itemReducer.totalPrice);
    const [content, setContent] = useState('cart');
    const [orderInfo, setOrderInfo] = useState('');
    const inputName = useRef('');
    const inputPhone = useRef('');
    const inputEmail = useRef('');
    const clean = () => {if (totalPrice === 0) dispatch(cleanCart())};
    const sendInfoToServer = () => {
        const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
        const PHONE_REGEXP = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/iu;
        if (inputName.current.value === '' || inputPhone.current.value === '' || inputEmail.current.value === '') {
            alert('Вы не ввели данные!');
        } else if (!EMAIL_REGEXP.test(inputEmail.current.value)) {
            alert('Неверно указан email!');
        } else if (!PHONE_REGEXP.test(inputPhone.current.value)) {
            alert('Неверно указан номер телефона!');
        } else if (totalPrice === 0) {
            alert('В корзине нет товаров');
        } else {
            let info = {
                name: inputName.current.value,
                phone: inputPhone.current.value,
                email: inputEmail.current.value,
                items: [...items],
            }
            let user = info.email.split('@')[0] + Math.floor(Math.random() * 1000);
            if (user.includes('.')) user = user.replace('.', '_');
            setContent('loader');
            dispatch(cleanCart());
            sendUserInfo(info, user);
        };
    };
    const sendUserInfo = async (info, user) => {
        const ajaxHandlerScript = 'https://fe.it-academy.by/AjaxStringStorage2.php';
        let sp = new URLSearchParams();
        sp.append('f', 'INSERT');
        sp.append('n', user);
        sp.append('v', JSON.stringify(info));
        try {
            let response = await fetch(ajaxHandlerScript,{ method: 'post', body: sp });
            let data = await response.json();
            showOrder(user);
        }
        catch (error) {
            console.error(error);
        }
    };
    const showOrder = async (user) => {
        const ajaxHandlerScript = 'https://fe.it-academy.by/AjaxStringStorage2.php';
        let sp = new URLSearchParams();
        sp.append('f', 'READ');
        sp.append('n', user);
        try {
            let response = await fetch(ajaxHandlerScript,{ method: 'post', body: sp });
            let data = await response.json();
            let obj = JSON.parse(data.result);
            setOrderInfo(obj);
            setContent('thankyou');
        }
        catch (error) {
            console.error(error);
        }
    };
    return (
        <div className={styles.wrapper}>
            <header>
                <div className={styles.Cart__header}>
                    <a href='tel:89811201117'>
                        <img src='https://svgshare.com/i/oHH.svg' alt='Позвонить' />
                    </a>
                    <NavLink to='/'>
                        <img src='https://i.postimg.cc/D0bQc1Yj/logo.png' alt='Логотип' onClick={clean} />
                    </NavLink>
                </div>
            </header>
            <main>
                {content === 'loader' &&
                    <p className={styles.Cart__heading}>
                        Загрузка...
                    </p>
                }
                {content === 'cart' && items.length === 0 &&
                    <div className={styles.Cart__heading}>
                        Ваша корзина пуста!
                    </div>
                }
                {content === 'cart' && items.length !== 0 &&
                    <div>
                        <h1 className={styles.Cart__heading}>
                            Корзина
                        </h1>
                        <div className={styles.Cart__list}>
                            <TransitionGroup>
                                {items.map(el => 
                                    <CSSTransition key={el.id} timeout={200}>
                                        <CartItem key={el.id} id={el.id} item={el} />
                                    </CSSTransition>
                                )}
                            </TransitionGroup>
                            <div className={styles.Cart__list__price}>
                                <p>К оплате:</p>
                                <p className={styles.Cart__list__price__total}>{totalPrice} р.</p>
                            </div>
                        </div>
                        <div className={styles.Cart__form}>
                            <p className={styles.Cart__form__heading}>
                                Для подтверждения заказа - введите ваши данные и мы перезвоним вам
                            </p>
                            <div className={styles.Cart__form__content}>
                                <form>
                                    <div className={styles.Cart__form__content__input}>
                                        <input ref={inputName} type='text' defaultValue='' placeholder='Имя Фамилия' />
                                    </div>
                                    <div className={styles.Cart__form__content__input}>
                                        <input ref={inputPhone} type='tel' defaultValue='' placeholder='+7(___)___-__-__' />
                                    </div>
                                    <div className={styles.Cart__form__content__input}>
                                        <input ref={inputEmail} type='email' defaultValue='' placeholder='Ваша почта' />
                                    </div>
                                </form>
                                <div className={styles.Cart__form__confirm}>
                                    <p>
                                        Нажимая «Отправить форму», подтверждаю, что я ознакомлен с условиями 
                                        <a href='https://github.com/alina-malashko/'>Публичного договора оферты</a>
                                         и 
                                        <a href='https://github.com/alina-malashko/'>Политикой конфиденциальности</a>
                                    </p>
                                    <input type='button' value='ОТПРАВИТЬ ФОРМУ' onClick={sendInfoToServer} />
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {content === 'thankyou' &&
                    <div className={styles.Order__info}>
                        <p className={styles.Order__info__heading}>Благодарим за заказ, {orderInfo.name}!</p>
                        <p>С вами свяжутся по номеру {orderInfo.phone}</p>
                        <p>Детали заказа отправлены на {orderInfo.email}</p>
                        <p>В Вашем заказе:</p>
                        <ul>
                            {orderInfo.items.map(el => 
                                <li key={el.id}>
                                    {el.name} в количестве <span>{el.counter}</span> шт. стоимостью <span>{el.price}</span> p.
                                </li>
                            )}
                        </ul>
                    </div>
                }
            </main>
            <footer className={styles.Cart__footer}>
                <p>© 2022 Все права защищены и принадлежат правообладателям.</p>
            </footer>
        </div>
    );
};

export default Cart;