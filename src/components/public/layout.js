/**
 * Created by misha on 27.01.19.
 */
import React, { Component } from 'react';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Index from './index';
import Contact from './contacts';
import NewsList from './news_list';
import About from './about';
import ProductList from './product_list';
import Catalog from './catalog';
import Footer from './footer';
import CategoryList from './parts/category_list';
import Menu from '../menu';
import LoginForm from './sign_action/login';
import RegForm from './sign_action/register';

class PublicLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectUrl: '/user/basket',
        };
    }

    render() {
        return (
            <div>
                <Menu />
                <div className="content row">
                    <div className='col-md-3'>
                        <CategoryList/>
                    </div>
                    <div className='col-md-9'>
                        <Switch>
                            <Route exact path={'/'} component={Index}/>
                            <Route exact path={'/contact'} component={Contact}/>
                            <Route exact path={'/news'} component={NewsList}/>
                            <Route exact path={'/catalog'} component={Catalog}/>
                            <Route exact path={'/catalog/:category'} component={ProductList}/>
                            <Route exact path={'/about'} component={About}/>
                            <Route exact path="/register" render={() => (this.props.token !== false ?
                                (<Redirect to={this.state.redirectUrl}/>) :
                                (<RegForm/>)
                            )}/>
                            <Route exact path="/login" render={() => (this.props.token !== false ?
                                (<Redirect to={this.state.redirectUrl}/>) :
                                (<LoginForm/>)
                            )}/>
                        </Switch>
                    </div>
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