import React, { useEffect, useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../redux/redux-store';
import Router from './Router';
import styles from '../pages/Shop/Shop.module.scss'

const App = () => {
    const [knives, setKnives] = useState('');
    const [kitchen, setKitchen] = useState('');
    const [folding, setFolding] = useState('');
    const [sharpeners, setSharpeners] = useState('');
    const [accessories, setAccessories] = useState('');
    const [data, setData] = useState(false);
    const load = async () => {
        const ajaxHandlerScript='https://fe.it-academy.by/AjaxStringStorage2.php';
        let sp = new URLSearchParams();
        sp.append('f', 'READ');
        sp.append('n', 'MALASHKO_REACT_SHOP');
        try {
            let response = await fetch(ajaxHandlerScript,{ method: 'post', body: sp });
            let data = await response.json();
            let dataItem = data.result;
            let obj = JSON.parse(dataItem);
            setKnives(obj);
            setKitchen([...obj].splice(0, 15));
            setFolding([...obj].splice(15, 15));
            setSharpeners([...obj].splice(30, 15));
            setAccessories([...obj].splice(45));
            setData(true);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        load();
    }, []);
    return (
        <>
            {data ? (
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <BrowserRouter>
                            <Router 
                                knives={knives} 
                                kitchen={kitchen} 
                                folding={folding} 
                                sharpeners={sharpeners} 
                                accessories={accessories}
                            />
                        </BrowserRouter>
                    </PersistGate>
                </Provider>
            ) : (
                <h1 className={styles.Shop__heading}>
                    Загрузка...
                </h1>
            )}
        </>
    );
};

export default App;
