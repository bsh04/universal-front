/**
 * Created by misha on 27.01.19.
 */
import React, { Component } from 'react';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Index from './index';
import Footer from './footer';
import Menu from '../menu';
import LoginForm from './sign_action/login';

class PublicLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectUrl: '/my/pages',
        };
    }

    render() {
        return (
            <div>
                <Menu />
                <div className="content">
                    {/*<div className='col-md-2'></div>*/}
                    {/*<div className='col-md-12'>*/}
                        <Switch>
                            {/* <Route exact path="/register" render={() => (this.props.token !== false ?
                                (<Redirect to={this.state.redirectUrl}/>) :
                                (<RegForm/>)
                            )}/> */}
                            <Route exact path="/login" render={() => (this.props.token !== false ?
                                (<Redirect to={this.state.redirectUrl}/>) :
                                (<LoginForm/>)
                            )}/>
                        </Switch>
                    {/*</div>*/}
                    {/*<div className='col-md-2'></div>*/}
                </div>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(
    (state, ownProps) => ({
        token: state.token
    }),
    dispatch => ({})
)(PublicLayout));
