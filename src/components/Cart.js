import React from "react";
import "./css/Cart.css";
import CartItem from "./CartItem.js";
import { NavLink } from 'react-router-dom';
import {CSSTransition,TransitionGroup} from 'react-transition-group';
import {connect} from "react-redux";

class intCart extends React.Component {
    constructor(props) {
        super(props)
        this.inputName = React.createRef();
        this.inputPhone = React.createRef();
        this.inputEmail = React.createRef();
    };
    state = {
        knives: this.props.knives,
        totalPrice: this.props.totalPrice,
        content: "cart",
        orderInfo: "",
    };
    delete = (item) => {
        this.props.dispatch({type: "DELETE_ITEM", data: item});
    };
    changeQty = (item) => {
        this.props.dispatch({type: "CHANGE_QTY", data: item});
    };
    cleanCart = (event) => {
        if (this.props.totalPrice === 0) {
            this.props.dispatch({type: "CLEAN_CART"});
        }
    };
    sendInfoToServer = () => {
        const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
        const PHONE_REGEXP = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/iu;
        if (this.inputName.current.value === "" || this.inputPhone.current.value === "" || this.inputEmail.current.value === "") {
            alert("Вы не ввели данные!");
        } else if (!EMAIL_REGEXP.test(this.inputEmail.current.value)) {
            alert("Неверно указан email!");
        } else if (!PHONE_REGEXP.test(this.inputPhone.current.value)) {
            alert("Неверно указан номер телефона!");
        } else if (this.props.totalPrice === 0) {
            alert("В корзине нет товаров");
        } else {
            let info = {
                name: this.inputName.current.value,
                phone: this.inputPhone.current.value,
                email: this.inputEmail.current.value,
                items: [...this.state.knives],
            }
            let user = info.email.split("@")[0] + Math.floor(Math.random() * 1000);
            if (user.includes(".")) user = user.replace(".", "_");
            this.setState({content: "loader"});
            this.props.dispatch({type: "CLEAN_CART"});
            this.sendUserInfo(info, user);
        };
    };
    sendUserInfo = async (info, user) => {
        let ajaxHandlerScript = "https://fe.it-academy.by/AjaxStringStorage2.php";
        let sp = new URLSearchParams();
        sp.append('f', 'INSERT');
        sp.append('n', user);
        sp.append('v', JSON.stringify(info));
        try {
            let response = await fetch(ajaxHandlerScript,{ method: 'post', body: sp });
            let data = await response.json();
            data.result === "" ? alert("Что-то пошло не так!") : alert("Заказ ушел на сервер!");
            this.showOrder(user);
        }
        catch (error) {
            console.error(error);
        }
    };
    showOrder = async (user) => {
        let ajaxHandlerScript = "https://fe.it-academy.by/AjaxStringStorage2.php";
        let sp = new URLSearchParams();
        sp.append('f', 'READ');
        sp.append('n', user);
        try {
            let response = await fetch(ajaxHandlerScript,{ method: 'post', body: sp });
            let data = await response.json();
            let obj = JSON.parse(data.result);
            this.setState({orderInfo: obj, content: "thankyou"});
        }
        catch (error) {
            console.error(error);
        }
    };
    render() {
        return (
            <div className="wrapper">
                <header>
                    <div className="Cart__header">
                        <a href="tel:89811201117"><img src="https://svgshare.com/i/oHH.svg" alt="Позвонить"></img></a>
                        <NavLink to="/">
                            <img src="https://i.postimg.cc/D0bQc1Yj/logo.png" alt="Логотип" onClick={this.cleanCart}></img>
                        </NavLink>
                    </div>
                </header>
                <main>
                    {this.state.content === "loader" ?
                        <p className="Cart__heading">Загрузка...</p>
                    : ""}
                    {this.state.content === "cart" && this.props.knives.length === 0 ?
                        <div className="Cart__heading">Ваша корзина пуста!</div>
                    : ""}
                    {this.state.content === "cart" && this.props.knives.length !== 0 ?
                        <div>
                            <h1 className="Cart__heading">Корзина</h1>
                            <div className="Cart__items-list">
                                <TransitionGroup>
                                    {this.props.knives.map(el => 
                                        <CSSTransition key={el.id} timeout={200} classNames="CartItem">
                                            <CartItem key={el.id} id={el.id} item={el} delete={this.delete} changeQty={this.changeQty}></CartItem>
                                        </CSSTransition>
                                    )}
                                </TransitionGroup>
                                <div className="Cart__items-list__price">
                                    <p>К оплате:</p>
                                    <p className="Cart__items-list__price__total">{this.props.totalPrice} р.</p>
                                </div>
                            </div>
                            <div className="Cart__form">
                                <p className="Cart__form__heading">Для подтверждения заказа - введите ваши данные и мы перезвоним вам</p>
                                <div className="Cart__form__content">
                                    <form>
                                        <div className="Cart__form__content__input">
                                            <input type="text" defaultValue="" placeholder="Имя Фамилия" ref={this.inputName}></input>
                                        </div>
                                        <div className="Cart__form__content__input">
                                            <input type="tel" defaultValue="" placeholder="+7(___)___-__-__" ref={this.inputPhone}></input>
                                        </div>
                                        <div className="Cart__form__content__input">
                                            <input type="email" defaultValue="" placeholder="Ваша почта" ref={this.inputEmail}></input>
                                        </div>
                                    </form>
                                    <div className="Cart__form__confirm">
                                        <p>Нажимая «Отправить форму», подтверждаю, что я ознакомлен с условиями <a href="#">Публичного договора оферты</a> и <a href="#">Политикой конфиденциальности</a></p>
                                        <input type="button" value="ОТПРАВИТЬ ФОРМУ" onClick={this.sendInfoToServer}></input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    : ""}
                    {this.state.content === "thankyou" ?
                        <div className="Order__info">
                            <p className="Order__info__heading">Благодарим за заказ, {this.state.orderInfo.name}!</p>
                            <p>С вами свяжутся по номеру {this.state.orderInfo.phone}</p>
                            <p>Детали заказа отправлены на {this.state.orderInfo.email}</p>
                            <p>В Вашем заказе:</p>
                            <ul>
                                {this.state.orderInfo.items.map(el => 
                                    <li key={el.id}>
                                        {el.name} в количестве <span>{el.counter}</span> шт. стоимостью <span>{el.price}</span> p.
                                    </li>
                                )}
                            </ul>
                        </div>
                    : ""}
                </main>
                <footer className="Cart__footer">
                    <p>© 2022 Все права защищены и принадлежат правообладателям.</p>
                </footer>
            </div>
        );
    };
}

const mapStateToProps = function(state) {
    return {
        knives: state.knives.items,
        totalPrice: state.knives.totalPrice,
    };
};

const Cart = connect(mapStateToProps)(intCart);

export default Cart;