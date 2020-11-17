import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import reducers from "../reducers";
import Provider from "react-redux";
import App from "../App";
import ReactDOMServer from 'react-dom/server'
import React from "react";

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);
const enhancer = typeof window !== "undefined" ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : null

export default () => {
    let store = createStore(
        persistedReducer,
        enhancer
    );
    let persistor = persistStore(store);
    return { store, persistor }
}