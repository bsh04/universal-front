/**
 * Created by misha on 27.01.19.
 */
import React, { Component } from 'react';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";

import Index from './index';
import Contact from './contacts';
import NewsList from './news_list';
import ArticleList from './workshop/workshop_list';
import About from './about';
import ProductList from './product_list';
import Product from './product';
import Workshop from './workshop/workshop';
import Catalog from './catalog';
import Footer from './footer';
import Menu from '../menu';
import LoginForm from './sign_action/login';
import RegForm from './sign_action/register';
import ResetForm from './sign_action/reset_pass';
import DeliveryAndPayment from './delivery_and_payment';
import ScrollDownButton from "./parts/scrollDownButton";
import {MapSection_} from './parts/mapSection_';
import ContactForm from './parts/contactForm';

class PublicLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectUrl: '/',
            showMenu: true,
            location: this.props.location.pathname,
        };
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            this.props.updateFrom(this.props.location.pathname);
        }
    }

    render() {
        return (
            <div>
                <Menu />
                <div className="content row">
                <ScrollDownButton style={{zIndex: 50}}/>
                    <div className={`col-md-12`}>
                        {this.state.location}
                        <Switch>
                            <Route exact path={'/'} component={Index}/>
                            <Route exact path={'/contact'} component={Contact}/>
                            <Route exact path={'/news'} component={NewsList}/>
                            <Route exact path={'/workshop'} component={ArticleList}/>
                            <Route exact path={'/workshop/:id'} component={Workshop}/>
                            <Route exact path={'/catalog'} component={Catalog}/>
                            <Route exact path={'/catalog/product/:id'} component={Product} />
                            <Route exact path={'/catalog/:category/:search'} component={ProductList}/>
                            <Route exact path={'/catalog/:category'} component={ProductList}/>
                            <Route exact path={'/deliveryandpayment'} component={DeliveryAndPayment}/>
                            <Route exact path={'/about'} component={About}/>
                            <Route exact path="/register" render={() => (this.props.token !== false ?
                                (<Redirect to={'/login'}/>) :
                                (<RegForm/>)
                            )}/>
                            <Route exact path="/password/reset" render={() => (this.props.token !== false ?
                                (<Redirect to={'/login'}/>) :
                                (<ResetForm/>)
                            )}/>
                            <Route exact path="/login" render={() => (this.props.token !== false ?
                                (<Redirect to={this.props.from !== '/login' ? this.props.from : '/'}/>) :
                                (<LoginForm/>)
                            )}/>
                        </Switch>
                    </div>
                    {/*<div className='col-md-2'></div>*/}
                    <ContactForm />
                    {this.state.location.indexOf('contact') === -1 ?
                        <MapSection_ /> : null}
                </div>
                <ScrollUpButton style={{zIndex: 50}}/>
                
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
