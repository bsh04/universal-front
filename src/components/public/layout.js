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
                {
                    id: 1, title: 'оформление заказа на сайте', image: 'laptop.png', content:
                        {
                            body: 'Оформить заказ на сайте можно несколькими способами:',
                            images: [
                                {content: 'Корзина', src: 'basket.png'},
                                {content: 'Звонок менеджеру', src: 'call.png'},
                            ],
                        }
                },
                {
                    id: 2,
                    title: 'подтверждение заказа',
                    image: 'support.png',
                    content:
                        {
                            body: 'В ближайшее время после отправки заявки с сайта с Вами свяжется менеджер для подтверждения заказа '
                        }
                },
                {
                    id: 3, title: 'оплата', image: 'credit-card.png', content:
                        {
                            body: 'Варианты оплаты:',
                            images: [
                                {content: 'Наличными при самовывозе', src: 'money.png'},
                                {content: 'Расчет через терминал', src: 'withdraw.png'},
                                {content: 'Оплата на расчетный счет для юридических лиц', src: 'receive-money.png'},
                            ],
                        }
                },
                {
                    id: 4, title: 'получение товара', image: 'product.png', content:
                        {
                            images: [
                                {title: 'Самовызов', content: 'со склада по адресу г. Томск, ул. Бердская, 31, магазин Универсал ', src: 'parcel.png'},
                                {title: 'Бесплатная доставка в черте города', content: 'при заказе на сумму от 3000 Р Стоимость доставки в отдаленные районы и по области уточняйте у менеджеров', src: 'shipment.png'},
                                {title: 'Бесплатная доставка до терминала', content: 'нужной вам транспортной компании при заказе на сумму от 3000 Р', src: 'delivery.png'},
                            ],
                            addition: 'Стоимость доставки в черте города при заказе на сумму от 700 Р до 2999 Рсоставит 150 Р',
                        }
                }
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
                            ? 
                            <div className="col">
                                <CategoryList categories={categories} onClick={() => null}/>
                                <div className="side-banner side-banner-promo1">
                                    <div className="text-small">Выгодные цены на сезонный ассортимент</div>
                                    <div className="text-big">скидка 15%</div>

                                    <div className="side-banner-button">
                                        Подробнее
                                        <i className="side-banner-button__icon"> </i>
                                    </div>
                                </div>
                                <div className="side-banner side-banner-promo1">
                                    <div className="text-small">На парники и  комплектующие</div>
                                    <div className="text-big">скидка 15%</div>

                                    <div className="side-banner-button">
                                        Подробнее
                                        <i className="side-banner-button__icon"> </i>
                                    </div>
                                </div>
                            </div>
                            : null}
                            <div className={`content-wrapper ${background ? 'image-background' : ''} ${showCategoryList ? '' : 'mw-100 w-100'}`}>
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
                                            item={item} index={index}/>
                                        )}
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

                        {this.props.location.pathname === '/' ?
                            <div className="about-company">
                                <img src={require('../../images/about-company.png')}/>
                                <div className="about-company-content">
                                    <h4 className="page-title">О компании</h4>
                                    <p className="about-company-content__text">
                                    Основным направлением нашей деятельности является оптовая торговля товарами народного потребления: посуда, хозяйственные товары, инструменты. Наша цель - предоставление качественных товаров широкого ассортимента по разумным ценам.
                                    </p>
                                    <p className="about-company-content__text">
                                    Большое количество товарных групп, низкие цены, взаимовыгодные условия работы, внимательное отношение к покупателям способствует росту и развитию компании. Мы не собираемся останавливаться на достигнутом, постоянно совершенствуем наши знания и опыт, расширяя ассортимент предлагаемых товаров.
                                    </p>
                                    <br/>

                                    <b>Приглашаем к сотрудничеству!</b>
                                    <div className="about-company-content__button unselectable" onClick={() => null}>
                                        Подробнее
                                    </div>
                                </div>
                            </div>
                        : null}
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
