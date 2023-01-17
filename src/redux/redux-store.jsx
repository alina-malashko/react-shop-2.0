import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { itemReducer } from './reducers/itemReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const combinedReducers = combineReducers({
  itemReducer
});

const rootReducer = (state, action) => {
  return combinedReducers(state, action);
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  compose(applyMiddleware(thunk))
);

export const persistor = persistStore(store);