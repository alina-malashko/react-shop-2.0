import React from "react";
import "./css/CartItem.css";

class CartItem extends React.Component {
    state = {
        item: this.props.item,
    };
    delete = (event) => {
        this.props.delete(this.state.item);
    };
    changeQty = (event) => {
        let value = event.target.value;
        if (event.target.value === "") {
            value = 0;
        }
        let item = {...this.state.item};
        let newPrice = item.singleItemPrice * Number(value);
        item.price = newPrice;
        item.counter = Number(value);
        this.props.changeQty(item);
    };
    render() {
        return (
            <div className="CartItem">
                <img src={this.state.item.img} alt={this.state.item.name} title={this.state.item.name}></img>
                <p>{this.state.item.name}</p>
                <input type="text" defaultValue={this.state.item.counter} onChange={this.changeQty} id={this.state.item.id}></input>
                <p>{this.state.item.price} р.</p>
                <img src="https://svgshare.com/i/oMR.svg" alt="Удалить" title="Удалить" onClick={this.delete} id={this.state.item.id}></img>
            </div>
        );
    };
};

export default CartItem;