import React from "react";
import Router from "./components/Router.js";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import itemReducer from "./components/itemReducer.js";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import { PersistGate } from 'redux-persist/integration/react';
import "./components/css/Shop.css";

const persistConfig = {
    key: 'root',
    storage,
};

let combinedReducers = combineReducers({
    knives: itemReducer
});

const persistedReducer = persistReducer(persistConfig, combinedReducers);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);

class App extends React.Component {
    state = {
        knives: "",
        kitchen: "",
        folding: "",
        sharpeners: "",
        accessories: "",
        dataLoaded: false
    };
    componentDidMount() {
        this.load();
    }
    load = async () => {
        var ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
        let sp = new URLSearchParams();
        sp.append('f', 'READ');
        sp.append('n', 'MALASHKO_REACT_SHOP');
        try {
            let response = await fetch(ajaxHandlerScript,{ method: 'post', body: sp });
            let data = await response.json();
            let dataItem = data.result;
            let obj = JSON.parse(dataItem);
            this.setState({dataLoaded: true, knives: obj, kitchen: [...obj].splice(0, 15), folding: [...obj].splice(15, 15), sharpeners: [...obj].splice(30, 15), accessories: [...obj].splice(45)});
        }
        catch ( error ) {
            console.error(error);
        }
    }
    render() {
        if (this.state.dataLoaded) {
            return (
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <BrowserRouter>
                            <Router knives={this.state.knives} kitchen={this.state.kitchen} folding={this.state.folding} sharpeners={this.state.sharpeners} accessories={this.state.accessories}></Router>
                        </BrowserRouter>
                    </PersistGate>
                </Provider>
            );
        } else {
            return (
                <h1 className="Shop__heading">Загрузка...</h1>
            );
        };
    };
};

export default App;
