import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import request from "../services/ajaxManager";
import CategoryList from './public/parts/category_list';
import Search from './public/parts/search';


class Menu extends Component {
    constructor(props) {
        super(props);

        this.menuItemRender = this.menuItemRender.bind(this);
        this.handleGet = this.handleGet.bind(this);
        this.handleLogout = this.handleLogout.bind(this);

        this.state = {
            showCatalog: false,
            categories: [],
            redirect: null,
            like: [],
            basket: [],
            leftItems: [
                {title: 'Главная', path: '/'},
                {title: 'Новости', path: '/news'},
                {title: 'Швейный цех', path: '/workshop'},
                {title: 'Контакты', path: '/contact'},
                {title: 'Оплата и доставка', path: '/deliveryandpayment'}
            ],
            rightItems: [
                {
                    title: 'Админка', permission: 'admin', items: [
                        {title: 'Обновление товаров', path: '/admin/product/update'},
                        {title: 'Список товаров без изображения', path: '/admin/product/image'},
                        {title: 'Управление швейным цехом', path: '/admin/workshop'},
                        {title: 'Оплата и доставка', path: '/admin/deliveryandpayment'},
                        {title: 'Управление новостями', path: '/admin/news'},
                        {title: 'Управление акциями', path: '/admin/stocks'},
                        {title: 'Экспорт данных', path: '/admin/export'},
                    ]
                },
                {
                    title: 'Профиль', items: [
                        {title: 'Корзина', path: '/user/basket'},
                        {title: 'Избранное', path: '/user/favorite'},
                        {title: 'Мои заказы', path: '/user/order'},
                        {title: 'Изменить данные', path: '/user/data/change'},
                        {title: 'Изменить пароль', path: '/user/password/change'},
                    ]
                },
            ],
        }
    };

    componentDidMount() {
        this.handleGet();
        this.handleGetCategories();
    }

    handleLogout() {
        this.props.onDeleteUser();
        this.props.onDeleteToken();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.reload.reload) {
            nextProps.onReloadedMenu();
            this.handleGet();
        }
    }

    handleGetCategories() {
        let _this = this;
        request(
            'product/categories',
            'GET',
            null,
            {},
            function (response) {
                let sorted = response.map(item => {
                    
                    if(item.children.length > 1){
                        item.children = item.children.sort((current, next) => {
                            if(current.title < next.title) {
                                return -1;
                            }
                            if(current.title > next.title) {
                                return 1;
                            }
                            return 0
                        })
                    }
                    return item;                    
                })

                _this.setState({categories: sorted});
            },
        );
    }

    handleGet() {
        let _this = this;

        if (this.props.token) {
            request(
                'product/basket',
                'GET',
                null,
                {},
                function (response)
                {
                    _this.setState({basket: response});
                },
            );

            request(
                'product/favorite',
                'GET',
                null,
                {},
                function (response)
                {
                    _this.setState({like: response});
                },
            );
        }
    }

    menuItemRender(item, key) {
        if (item.permission === undefined || (item.permission == 'admin' && this.props.user.roles && this.props.user.roles.indexOf('ROLE_ADMIN') !== -1)) {
            if (Array.isArray(item.items)) {
                let active = false;
                item.items.map((sub) => {
                    if (sub.path === window.location.pathname) {
                        active = true;
                    }
                });
                if (item.path) {
                    return (
                        <li className={"nav-item dropdown" + (active ? ' active' : '')} key={key}>
                            <a href="#" className="nav-link dropdown-toggle" id={"navbarDropdown" + key}
                               role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                               onClick={() => this.handleGoTo(item.path)}>
                                {item.title}
                            </a>
                            <div className="dropdown-menu" aria-labelledby={"navbarDropdown" + key}>
                                {item.items.map((subItem, key2) => {
                                    return (
                                        <a
                                            className={"dropdown-item" + (subItem.path === window.location.pathname ? ' active' : '')}
                                            href={item.path + subItem.path} key={key2}>{subItem.title}</a>
                                    );
                                })}
                            </div>
                        </li>
                    );
                }

                return (
                    <li className={"nav-item dropdown" + (active ? ' active' : '')} key={key}>
                        <a className="nav-link dropdown-toggle" href='#' id={"navbarDropdown" + key} role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {item.title}
                        </a>
                        <div className="dropdown-menu" aria-labelledby={"navbarDropdown" + key}>
                            {item.items.map((subItem, key2) => {
                                return (
                                    <Link
                                        className={"dropdown-item" + (subItem.path === window.location.pathname ? ' active' : '')}
                                        to={subItem.path} key={key2}>{subItem.title}</Link>
                                );
                            })}
                        </div>
                    </li>
                );
            }

            return (
                <li key={key} className={"nav-item" + (item.path === window.location.pathname ? ' active' : '')}>
                    <Link className="nav-link" to={item.path}>{item.title}</Link>
                </li>
            );
        }
    }

    toggleMenuView() {
        const showCatalog = this.state.showCatalog;

        this.setState({
            showCatalog: !showCatalog
        })
    }

    render() {
        return (
            <div>
                <div className='mainImage'>
                    <div className="row">
                        <div className="col-md-3 my-3 my-md-0">
                            <Link to="/">
                                <h1 className="text-center">Универсал</h1>
                                <h2 className="text-center">Хозяйственные товары</h2>
                            </Link>
                        </div>
                        <div className="col-md-2 my-3 my-md-0">
                            <p className={'text-md-left text-center'}>
                                <span>
                                    <i className={'fa fa-phone'}> <a href={'tel:+7 (3822) 909291'} itemProp="telephone">+7 (3822) 90-92-91</a></i><br/>
                                    <i className={'fa fa-phone'}> <a href={'tel:+7 (3822) 90-44-32'} itemProp="telephone">+7 (3822) 90-44-32</a></i><br/>
                                    <i className={'fa fa-phone'}> <a href={'tel:+7 (3822) 902-668'} itemProp="telephone">+7 (3822) 902-668</a></i>
                                </span>
                                <br/>
                            </p>
                        </div>
                        <div className="col-md-3 text-md-left text-center my-3 my-md-0">
                            <i className={'fa fa-envelope '}> <a href={'email:razov@mail.tomsknet.ru'} itemProp="email">razov@mail.tomsknet.ru</a></i><br/>
                            <p className="street-addres" itemProp="streetAddress"><i className={'fa fa-map-marker'}></i> Адрес: г. Томск, ул. Бердская, 31 <br/>(пер. Пойменный 5)</p>
                        </div>
                        <div className="col-md-2 my-3 my-md-0">
                            <div className="shedule">
                                График работы
                            </div>
                            <div className="shedule-tooltip">
                                <p><b>ПН-ПТ</b> <span>9:00 - 17:00</span></p>
                                <p><b>СБ</b> <span>9:00 - 14:00</span></p>
                                <p><b>ВС</b> <span>ВЫХОДНОЙ</span></p>
                            </div>
                        </div>
                        <div className="col-md-2 text-md-right text-center my-3 my-md-0">
                            <p>
                            { this.props.token ?
                                    <Link to='/user/basket' className="iconButtons">
                                        <i className={'fa fa-shopping-cart'}> </i>
                                        {this.state.basket.length > 0 ? <span className={'badge badge-danger'}>{this.state.basket.length}</span> : null}
                                    </Link>
                                 : '' }
                            { this.props.token ?
                                    <Link to='/user/favorite' className="iconButtons">
                                        <i className={'fa fa-heart'}> </i>
                                        {this.state.like.length > 0 ? <span className={'badge badge-danger'}>{this.state.like.length}</span> : null}
                                    </Link>
                                 : '' }
                            </p>
                        </div>
                    </div>
                    {/*<img alt='main' src={require('../images/logo-min.png')} />*/}
                </div>

                <nav className="navbar navbar-light navbar-expand-lg fixed">
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <i className="navbar-toggler-icon"></i>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">

                            <li className="nav-item">
                                <a className="catalog_link nav-link"
                                        onClick={() => this.toggleMenuView()}>
                                <i className="fa fa-bars"></i>
                                    <span> Каталог</span>
                                </a>
                            </li>
                            { this.state.showCatalog 
                            ? <li className='nav-item catalog_main'>
                                <CategoryList categories={this.state.categories}/>
                            </li>
                            : ''}

                            {this.state.leftItems.map((item, key) => {
                                return this.menuItemRender(item, key);
                            })}
                        </ul>

                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Search />
                            </li>
                        </ul>

                        <ul className="navbar-nav ml-auto">
                            { this.props.token ? (
                                    this.state.rightItems.map((item, key) => {
                                        return this.menuItemRender(item, key)
                                    })
                                ) : '' }
                            { this.props.token ? (
                                    <li className="nav-item">
                                        <a href='#' className="nav-link" onClick={this.handleLogout}>Выход</a>
                                    </li> ) : <li className={"nav-item" + ('/login' === window.location.pathname ? ' active' : '')}>
                                        <Link className="nav-link" to={'/login'}>Войти</Link>
                                    </li> }
                            { this.props.token ? '' : <li className={"nav-item" + ('/register' === window.location.pathname ? ' active' : '')}>
                                <Link className="nav-link" to={'/register'}>Регистрация</Link>
                            </li> }
                        </ul>
                    </div>
                </nav>
                <div style={{height: "56px"}}></div>
            </div>
        );
    }
}

export default withRouter(connect(
    (state) => ({
        token: state.token,
        user: state.user,
        reload: state.reload,
    }),
    dispatch => ({
        onDeleteToken: (token) => {
            dispatch({type: 'DELETE_TOKEN', payload: token})
        },
        onDeleteUser: (user) => {
            dispatch({type: 'DELETE_USER', payload: user})
        },
        onReloadedMenu: () => {
            dispatch({ type: 'RELOADED', payload: true })
        },
    })
)(Menu));
