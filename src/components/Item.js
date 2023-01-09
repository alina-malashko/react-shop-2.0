import React from "react";
import "./css/Item.css";

class Item extends React.Component {
    state = {
        id: this.props.item.id,
        img: this.props.item.img,
        name: this.props.item.name,
        price: this.props.item.price,
        mark: this.props.item.mark,
        counter: this.props.counter,
        clicked: this.props.clicked
    };
    countPrice = (event) => {
        let counter = this.state.counter + 1;
        this.props.rememberClicked(this.state.id, this.state.counter + 1);
        this.setState({clicked: true, counter: counter});
        let item = {
            id: this.props.item.id,
            img: this.props.item.img,
            name: this.props.item.name,
            price: this.props.item.price,
            mark: this.props.item.mark,
            counter: this.state.counter + 1,
            clicked: true
        };
        this.props.addInCart(item);
    };
    render() {
        return (
            <figure className="ItemCard" key={this.state.id} id={this.state.id}>
                <div className="ItemCard__image">
                    <img src={this.state.img} alt={this.state.name} title={this.state.name}></img>
                    <div className="ItemCard__add-button" onClick={this.countPrice}>
                        <img title="Добавить" alt="Добавить" src="https://svgshare.com/i/oFP.svg"></img>
                    </div>
                </div>
                <figcaption className="ItemCard__caption">
                    <p>{this.state.name}</p>
                    <div className="ItemCard__caption__subcaption">
                        <p>{this.state.price} р.</p>
                        <p className="mark">{this.state.mark}</p>
                        {this.state.clicked === true ?
                        <div className="Item__in-cart">
                            &#10004;
                            {this.state.counter}
                        </div>
                        : ""
                        }
                    </div>
                </figcaption>
            </figure>
        );
    };
}

export default Item;