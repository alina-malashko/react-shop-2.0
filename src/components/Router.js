import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Cart from './Cart.js';
import ShopMain from './ShopMain.js';
import ShopKitchen from './ShopKitchen.js';
import ShopFolding from './ShopFolding.js';
import ShopAccessories from './ShopAccessories.js';
import ShopSharpeners from "./ShopSharpeners.js";

class Router extends React.Component {
    state = {
        category: "all"
    };
    selectCategory = (id) => {
        this.setState({category: id});
    };
    render() {
        return (
            <Routes>
                <Route path="/" element={<ShopMain knives={this.props.knives}></ShopMain>}></Route>
                <Route path="/kitchen" element={<ShopKitchen knives={this.props.kitchen}></ShopKitchen>}></Route>
                <Route path="/folding" element={<ShopFolding knives={this.props.folding}></ShopFolding>}></Route>
                <Route path="/sharpeners" element={<ShopSharpeners knives={this.props.sharpeners}></ShopSharpeners>}></Route>
                <Route path="/accessories" element={<ShopAccessories knives={this.props.accessories}></ShopAccessories>}></Route>
                <Route path="/cart" element={<Cart></Cart>}></Route>
            </Routes>
        );
    };
}

export default Router;