import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import './App.css';
import PublicLayout from './components/public/layout';
import PrivateLayout from './components/admin/layout';
import UserLayout from './components/private/layout';
import ErrorBoundary from './components/errorBoundary';
import Modal from './components/modal';

import {CategoriesContext} from './services/contexts';
import request from './services/ajaxManager';
import login from "./components/public/sign_action/login";

class App extends Component {
    constructor(props) {
        super(props);

        this.updateFrom = this.updateFrom.bind(this);
        this.checkSizeWindow = this.checkSizeWindow.bind(this)

        this.state = {
            from: props.location.pathname,
            categories: [],
            mobileMode: false
        };
    }

    updateFrom(from) {
        this.setState({from: from});
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.checkSizeWindow.bind(this))
    }

    checkSizeWindow() {
        if (window.innerWidth > 767) {
            this.setState({mobileMode: false})
        } else {
            this.setState({mobileMode: true})
        }
    }

    componentDidMount() {
        this.checkSizeWindow()
        window.addEventListener("resize", this.checkSizeWindow.bind(this));

        let _this = this;

        request(
            'product/categories',
            'GET',
            null,
            {},
            (response) => {
                _this.setState({categories: response})
            },
            (err) => console.log(err)
        )
    }

    render() {
        return (
            <div className="App">
                <ErrorBoundary>
                    <Router>
                        <CategoriesContext.Provider value={{categories: this.state.categories, isMobile: this.state.mobileMode}}>
                            <Switch>
                                <Route path="/admin"
                                        component={() => <PrivateLayout updateFrom={this.updateFrom}/>}/>
                                <Route path="/user"
                                        component={() => <UserLayout updateFrom={this.updateFrom}/>}/>
                                <Route path="/" render={() => <PublicLayout from={this.state.from}
                                                                            updateFrom={this.updateFrom}/>}/>
                            </Switch>
                        </CategoriesContext.Provider>
                    </Router>
                    <Modal/>
                </ErrorBoundary>
            </div>
        );
    }
}

export default withRouter(connect(
    (state) => ({
        loc: state.location
    }),
    dispatch => ({})
)(App));
