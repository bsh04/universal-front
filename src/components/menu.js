import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import request from "../services/ajaxManager";

class Menu extends Component {
    constructor(props) {
        super(props);

        this.menuItemRender = this.menuItemRender.bind(this);
        this.handleGet = this.handleGet.bind(this);
        this.handleLogout = this.handleLogout.bind(this);

        this.state = {
            redirect: null,
            like: [],
            basket: [],
            leftItems: [
                {title: 'Главная', path: '/'},
                {title: 'Новости', path: '/news'},
                {title: 'Контакты', path: '/contact'},
            ],
            rightItems: [
                {
                    title: 'Админка', permission: 'admin', items: [
                        {title: 'Обновление товаров', path: '/admin/product/update'},
                        {title: 'Список товаров без изображения', path: '/admin/product/image'},
                        {title: 'Управление швейным цехом', path: '/admin/workshop'},
                        {title: 'Управление новостями', path: '/admin/news'},
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

    render() {
        return (
            <div>
                <div className='mainImage'>
                    <div></div>
                    {/*<img alt='main' src={require('../images/logo-min.png')} />*/}
                </div>
                <nav className="navbar navbar-dark navbar-expand-lg fixed" style={{backgroundColor: '#28a745'}}>
                    <a className="navbar-brand" href="#">"Универсал Томск"</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <i className="navbar-toggler-icon"></i>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            {this.state.leftItems.map((item, key) => {
                                return this.menuItemRender(item, key);
                            })}
                        </ul>

                        <ul className="navbar-nav ml-auto">
                            { this.props.token ? <li className={"nav-item"}>
                                <Link className="nav-link" to='/user/basket'>
                                    <i className={'fa fa-shopping-cart'}> </i>
                                    <span className={'inRound'}>{this.state.basket.length}</span>
                                </Link>
                            </li> : '' }
                            { this.props.token ? <li className={"nav-item"}>
                                <Link className="nav-link" to='/user/favorite'>
                                    <i className={'fa fa-heart'}> </i>
                                    <span className={'inRound'}>{this.state.like.length}</span>
                                </Link>
                            </li> : '' }
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
    }),
    dispatch => ({
        onDeleteToken: (token) => {
            dispatch({type: 'DELETE_TOKEN', payload: token})
        },
        onDeleteUser: (user) => {
            dispatch({type: 'DELETE_USER', payload: user})
        },
    })
)(Menu));
