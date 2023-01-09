import React from "react";
import "./css/Shop.css";
import { NavLink } from 'react-router-dom';
import CartBtn from "./CartBtn";

class Header extends React.Component {
    render() {
        return (
            <header className="Shop__banner">
                <div className="Shop__header">
                    <a href="tel:89811201117"><img src="https://svgshare.com/i/oHH.svg" alt="Позвонить"></img></a>
                    <NavLink to="/">
                        <img src="https://i.postimg.cc/D0bQc1Yj/logo.png" alt="Логотип"></img>
                    </NavLink>
                    <NavLink to="/cart">
                        <CartBtn></CartBtn>
                    </NavLink>
                </div>
                <div>
                    <h1 className="Shop__heading">
                        Исключительное качество без компромиссов
                    </h1>
                    <p className="Shop__subheading">
                        Ножи «Tuotown» – это главный инструмент поваров и секрет кулинарного мастерства
                    </p>
                </div>
            </header>
        );
    };
};

export default Header;