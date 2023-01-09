import React from "react";
import "./css/Shop.css";
import {connect} from "react-redux";

class intCartBtn extends React.Component {
    state = {
        totalPrice: this.props.totalPrice,
    };
    render() {
        return (
            <div className="Shop__header__cart">
                <img src="https://svgshare.com/i/oHS.svg" alt="Корзина"></img>
                {this.props.totalPrice !== 0 ? 
                    <p>{this.props.totalPrice} р.</p>
                : ""
                }
            </div>
        );
    };
};

const mapStateToProps = function(state) {
    return {
        totalPrice: state.knives.totalPrice
    };
};

const CartBtn = connect(mapStateToProps)(intCartBtn);

export default CartBtn;