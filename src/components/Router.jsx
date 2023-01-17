import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Cart from '../pages/Cart/Cart';
import Shop from '../pages/Shop/Shop';
import Main from '../pages/Shop/Main/Main';
import Kitchen from '../pages/Shop/Kitchen/Kitchen';
import Folding from '../pages/Shop/Folding/Folding';
import Accessories from '../pages/Shop/Accessories/Accessories';
import Sharpeners from '../pages/Shop/Sharpeners/Sharpeners';

const Router = (props) => {
    return (
        <Routes>
            <Route path='/shop' element={<Shop />}>
                <Route path='main' element={<Main knives={props.knives} />} />
                <Route path='kitchen' element={<Kitchen knives={props.kitchen} />} />
                <Route path='folding' element={<Folding knives={props.folding} />} />
                <Route path='sharpeners' element={<Sharpeners knives={props.sharpeners} />} />
                <Route path='accessories' element={<Accessories knives={props.accessories} />} />
            </Route>
            <Route path='/cart' element={<Cart />} />
            <Route path='/*' element={<Navigate to='/shop/main' />} />
        </Routes>
    );
};

export default Router;