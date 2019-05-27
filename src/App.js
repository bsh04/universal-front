import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import PublicLayout from './components/public/layout';
import PrivateLayout from './components/admin/layout';
import UserLayout from './components/private/layout';
import ErrorBoundary from './components/errorBoundary';
import Modal from './components/modal';

class App extends Component {
    render() {
        return (
            <div className="App">
                <ErrorBoundary>
                    <Router>
                        <Switch>
                            <Route path="/admin" component={PrivateLayout}/>
                            <Route path="/user" component={UserLayout}/>
                            <Route path="/" component={PublicLayout}/>
                        </Switch>
                    </Router>
                    <Modal />
                </ErrorBoundary>
            </div>
        );
    }
}

export default withRouter(connect(
    (state) => ({}),
    dispatch => ({})
)(App));
