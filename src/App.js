import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import PublicLayout from './components/public/layout';
import PrivateLayout from './components/admin/layout';
import UserLayout from './components/private/layout';
import ErrorBoundary from './components/errorBoundary';
import Modal from './components/modal';

import { CategoriesContext } from './services/contexts';
import request from './services/ajaxManager';

class App extends Component {
    constructor(props) {
        super(props);

        this.updateFrom = this.updateFrom.bind(this);

        this.state = {
            from: props.location.pathname,
            categories: []
        };
    }

    updateFrom(from) {
        this.setState({from: from});
    }
    
    componentDidMount(){
        let _this = this;

        request(
            'product/categories',
            'GET',
            null,
            {},
            (response) => {
                _this.setState({categories: response})
                console.log('from_App:',response)
            },
            (err) => console.log(err)
        )
    }

    render() {
        return (
            <div className="App">
                <ErrorBoundary>
                    <Router>
                        <CategoriesContext.Provider value={this.state.categories}>
                            <Switch>
                                <Route path="/admin" component={() => <PrivateLayout updateFrom={this.updateFrom} />}/>
                                <Route path="/user" component={() => <UserLayout updateFrom={this.updateFrom} />}/>
                                <Route path="/" render={() => <PublicLayout from={this.state.from}
                                                                            updateFrom={this.updateFrom} />}/>
                            </Switch>
                        </CategoriesContext.Provider>
                    </Router>
                    <Modal />
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
