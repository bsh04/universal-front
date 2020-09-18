/**
 * Created by misha on 27.01.19.
 */
import React, {Component} from 'react';
import {Route, Redirect, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
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
import Header from '../header';
import LoginForm from './sign_action/login';
import RegForm from './sign_action/register';
import ResetForm from './sign_action/reset_pass';
import DeliveryAndPayment from './delivery_and_payment';
import ScrollDownButton from "./parts/scrollDownButton";
import {CategoriesContext} from "../../services/contexts";
import CategoryList from "./parts/category_list";
import {MapSection_} from './parts/mapSection_';
import ContactForm from './parts/contactForm';
import {ServiceBtn} from './parts/buttons/ServiceBtn';
import {
    ModalGallery,
    ModalBasketAddAlert,
    ModalCallbackForm,
    ModalRequestForm,
    ModalQuestionForm,
    ModalThanks
} from './parts/modal_blocks';
import ProductDetails from "./parts/product/ProductDetails";
import DeliveryAndPaymentIndexPage from "./parts/deliveryAndPayment";

class PublicLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectUrl: '/',
            showMenu: true,
            location: this.props.location.pathname,

            callbackModalVisible: false,
            questionModalVisible: false,
            requestFormModalVisible: false,

            basketAddModalVisible: false,
            galleryModalVisible: false,
            modalThanksVisible: false,
            bottomItems: [
                {id: 1, title: 'оформление заказа на сайте', image: 'laptop.png', content: ''},
                {id: 2, title: 'подтверждение заказа', image: 'support.png', content: ''},
                {id: 3, title: 'оплата', image: 'credit-card.png', content: ''},
                {id: 4, title: 'получение товара', image: 'product.png', content: ''},
            ]
        };
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            this.props.updateFrom(this.props.location.pathname);
        }
    }


    toggleModal = (name) => {
        let target = null;

        switch (name) {
            case 'basket':
                target = 'basketAddModalVisible';
                break;
            case 'thanks':
                target = 'modalThanksVisible';
                break;
            case 'gallery':
                target = 'galleryModalVisible';
                break;
            case 'callback':
                target = 'callbackModalVisible';
                break;
            case 'request':
                target = 'requestFormModalVisible';
                break;
            case 'question':
                target = 'questionModalVisible';
                break;
        }

        if (target) {
            this.setState({
                [target]: !this.state[target]
            })
        }
    }

    render() {
        return <CategoriesContext.Consumer>{contextValue => {
            let categories = null;
            let showCategoryList = null;
            let isMobile = contextValue.isMobile;

            if (contextValue.categories) {
                categories = contextValue.categories.map(item => {
                    if (item.children.length > 1) {
                        item.children = item.children.sort((current, next) => {
                            if (current.title < next.title) {
                                return -1;
                            }
                            if (current.title > next.title) {
                                return 1;
                            }
                            return 0
                        })
                    }
                    return item;
                });
            }

            showCategoryList = !!(!isMobile && categories && this.props.location.pathname !== '/catalog');

            let background = null;
            let arr = ['login', 'data/change', '/password/reset', '/order/add', 'register', '/data/change']
            arr.forEach(item => this.props.location.pathname.indexOf(item) !== -1 ? background = true : null);


            return (
                <div>
                    <Header/>
                    <div className="content row w-100">
                        <ScrollDownButton style={{zIndex: 50}}/>

                        <div className="flex-nowrap row w-100">
                            {showCategoryList
                                ? <CategoryList categories={categories} onClick={() => null}/>
                                : null}
                            <div
                                className={`content-wrapper ${background ? 'image-background' : ''} ${showCategoryList ? '' : 'mw-100 w-100'}`}>
                                <Switch>
                                    <Route exact path={'/'} component={Index}/>
                                    <Route exact path={'/contact'} component={Contact}/>
                                    <Route exact path={'/news'} component={NewsList}/>
                                    <Route exact path={'/workshop'} component={ArticleList}/>
                                    <Route exact path={'/workshop/:id'} component={Workshop}/>
                                    <Route exact path={'/catalog'} component={Catalog}/>
                                    <Route exact path={'/catalog/product/:id'} component={Product}/>
                                    <Route exact path={'/catalog/:category/:search'} component={ProductList}/>
                                    <Route exact path={'/catalog/:category'} component={ProductList}/>
                                    <Route exact path={'/deliveryandpayment'} component={DeliveryAndPayment}/>
                                    <Route exact path={'/about'} component={About}/>
                                    <Route exact path={'/product/details/:id'} component={ProductDetails}/>
                                    <Route exact path="/register" render={() => (this.props.token !== false ?
                                            (<Redirect to={'/login'}/>) :
                                            (<RegForm/>)
                                    )}/>
                                    <Route exact path="/password/reset" render={() => (this.props.token !== false ?
                                            (<Redirect to={'/login'}/>) :
                                            (<ResetForm/>)
                                    )}/>
                                    <Route exact path="/login" render={() => (this.props.token !== false ?
                                            (<Redirect
                                                to={this.props.from !== '/login' ? this.props.from : '/'}/>) :
                                            (<LoginForm/>)
                                    )}/>
                                </Switch>
                            </div>

                        </div>
                        {
                            this.props.from === '/'
                                ?
                                <div className='delivery-and-payment'>
                                    <h5>как купить?</h5>
                                    <div className='container-items'>
                                        {this.state.bottomItems.map((item, index) => <DeliveryAndPaymentIndexPage
                                            item={item} index={index}/>)}
                                    </div>
                                </div>
                                :
                                null
                        }
                        <div className={`service-btn-group ${isMobile ? '' : 'sticked'}`}>
                            <ServiceBtn icon={"mail"} onClick={() => this.toggleModal('request')}/>
                            <ServiceBtn icon={"question"} onClick={() => this.toggleModal('question')}/>
                            <ServiceBtn icon={"phone"} onClick={() => this.toggleModal('callback')}/>
                        </div>

                        <ModalGallery visible={this.state.galleryModalVisible}/>
                        <ModalBasketAddAlert visible={this.state.basketAddModalVisible}/>
                        <ModalThanks visible={this.state.modalThanksVisible}/>

                        <ModalCallbackForm visible={this.state.callbackModalVisible}
                                           handleToggle={() => this.toggleModal('callback')}/>
                        <ModalRequestForm visible={this.state.requestFormModalVisible}
                                          handleToggle={() => this.toggleModal('request')}/>
                        <ModalQuestionForm visible={this.state.questionModalVisible}
                                           handleToggle={() => this.toggleModal('question')}/>


                        <ContactForm/>
                        {this.state.location.indexOf('contact') === -1 ?
                            <MapSection_/> : null}
                    </div>
                    <ScrollUpButton style={{zIndex: 50}}/>
                    <Footer/>
                </div>
            )

        }}
        </CategoriesContext.Consumer>
    }
}

export default withRouter(connect(
    (state, ownProps) => ({
        token: state.token
    }),
    dispatch => ({})
)(PublicLayout));
