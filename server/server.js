import express from "express";
import fs from "fs";
import path from "path";

import React from "react";
import ReactDOMServer from "react-dom/server";

import App from "../src/App";
import {Route, StaticRouter, Router} from "react-router-dom";
import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";
import {createStore} from "redux";
import {persistReducer} from "redux-persist";
import reducers from "../src/reducers";
import storage from "redux-persist/lib/storage";
import {createMemoryHistory} from "history";

const history = createMemoryHistory();

const PORT = 8000;

const app = express();

// app.use(express.static('static'))

// This is fired every time the server side receives a request
app.get('/*', (req, res) => handleRender(req, res))

// We are going to fill these out in the sections to follow
function handleRender(req, res) {
    // Create a new Redux store instance
    const store = createStore(reducers)

    const context = {}
    // Render the component to a string
    const html = ReactDOMServer.renderToString(
        <Router history={history}>
            <Provider store={store}>
                <App/>
            </Provider>
        </Router>
    )

    // Grab the initial state from our Redux store
    const preloadedState = store.getState()

    // Send the rendered page back to the client
    res.send(data.replace(
        '<script>REDUX</script>',
        `<script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // https://redux.js.org/recipes/server-rendering/#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
            /</g,
            '\\u003c'
        )}
        </script>`,
        '<div id="root"></div>',
        `<div id="root">${html}</div>`
        ),
    )
}

app.listen(PORT, () => {
    console.log(`App launched on ${PORT}`);
});
