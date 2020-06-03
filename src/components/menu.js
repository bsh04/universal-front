import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import request from "../services/ajaxManager";
import CategoryList from './public/parts/category_list';


class Menu extends Component {
    constructor(props) {
        super(props);

        this.menuItemRender = this.menuItemRender.bind(this);
        this.handleGet = this.handleGet.bind(this);
        this.handleLogout = this.handleLogout.bind(this);

        this.state = {
            showCatalog: false,
            redirect: null,
            like: [],
            basket: [],
            leftItems: [
                {title: 'Главная', path: '/'},
                {title: 'Новости', path: '/news'},
                {title: 'Швейный цех', path: '/workshop'},
                {title: 'Контакты', path: '/contact'},
            ],
            rightItems: [
                {
                    title: 'Админка', permission: 'admin', items: [
                        {title: 'Обновление товаров', path: '/admin/product/update'},
                        {title: 'Список товаров без изображения', path: '/admin/product/image'},
                        {title: 'Управление швейным цехом', path: '/admin/workshop'},
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
                        <div className="col-md-4">
                            <p className={'text-left'}>
                                <i className={'fa fa-map-marker'}> <span itemProp="streetAddress">Адрес: г. Томск, ул. Бердская, 31 (пер. Пойменный 5)</span></i><br/>
                                <i className={'fa fa-phone'}> <span><a href={'tel:+7 (3822) 909291'} itemProp="telephone">90-92-91</a>, <a href={'tel:+7 (3822) 90-44-32'} itemProp="telephone">90-44-32</a>, <a href={'tel:+7 (3822) 902-668'} itemProp="telephone">902-668</a></span></i><br/>
                            </p>
                        </div>
                        <div className="col-md-4">
                            <Link to="/"><h1 className="text-center">Универсал Томск</h1></Link>
                        </div>
                        <div className="col-md-4 text-right">
                            <p>
                            { this.props.token ?
                                    <Link to='/user/basket' className="iconButtons">
                                        <i className={'fa fa-shopping-cart'}> </i>&nbsp;
                                        <span className={'inRound'}>{this.state.basket.length}</span>
                                    </Link>
                                 : '' }
                            { this.props.token ?
                                    <Link to='/user/favorite' className="iconButtons">
                                        <i className={'fa fa-heart'}> </i>&nbsp;
                                        <span className={'inRound'}>{this.state.like.length}</span>
                                    </Link>
                                 : '' }
                            </p>
                        </div>
                    </div>
                    {/*<img alt='main' src={require('../images/logo-min.png')} />*/}
                </div>
                <nav className="navbar navbar-dark navbar-expand-lg fixed" style={{backgroundColor: '#28a745'}}>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <i className="navbar-toggler-icon"></i>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">


                            <li className="nav-item">
                                <a className="nav-link catalog_link"
                                        onClick={() => this.toggleMenuView()}>
                                <i className="fa fa-bars"></i>
                                    <span> Каталог</span>
                                </a>
                            </li>
                            { this.state.showCatalog 
                            ? <div className='catalog_main'>
                                
                                <CategoryList className=""/>
                            </div>
                            : ''}

                            {this.state.leftItems.map((item, key) => {
                                return this.menuItemRender(item, key);
                            })}
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
