import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import $ from 'jquery';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import 'font-awesome/css/font-awesome.min.css';
import { default as store } from './reducers/store';
import App from './App';
import * as serviceWorker from './serviceWorker';

window.jQuery = $;
window.$ = $;
global.jQuery = $;
require('bootstrap/dist/js/bootstrap.min.js');

let str = store();
window.store = str;

ReactDOM.render(
    <Provider store={str.store}>
        <PersistGate loading={null} persistor={str.persistor}>
            <Router>
                <Switch>
                    <Route path="/*" component={App}/>
                </Switch>
            </Router>
        </PersistGate>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

let h_hght = $(window).height() * 0.5 + 56; // высота шапки
let h_mrg = 0;     // отступ когда шапка уже не видна
$(function(){
    $(window).scroll(function(){
        let top = $(this).scrollTop();
        let elem = $('nav.fixed');
        if (top+h_mrg < h_hght) {
            elem.css('top', (h_hght-top));
        } else {
            elem.css('top', h_mrg);
        }
    });

    window.scroll(0, $(window).height() + 1);
});