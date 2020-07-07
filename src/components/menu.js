import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import request from "../services/ajaxManager";
import CategoryList from './public/parts/category_list';
import Search from './public/parts/search';
import MenuTop from './public/parts/menuTop';

import {CategoriesContext} from '../services/contexts';

class Menu extends Component {
    constructor(props) {
        super(props);

        this.menuItemRender = this.menuItemRender.bind(this);
        this.handleGet = this.handleGet.bind(this);
        this.handleLogout = this.handleLogout.bind(this);

        this.state = {
            showCatalog: false,
            showNavbar: false,
            searchInMenu: true,
            showCatalogOutMenu: true,
            navFix: false,
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
        
        this.checkWidnowSizeMD();
        window.addEventListener("resize", this.checkWidnowSizeMD.bind(this));
        window.addEventListener("scroll", this.navbarFixed.bind(this));
    }

    navbarFixed() {
        let fixed;
        if(window.pageYOffset > this.menuMainImage.clientHeight
            && window.innerHeight < (document.body.clientHeight - this.navBar.clientHeight)) {
            fixed = true;
        } else {
            fixed = false;
        }

        this.setState({
            navFix: fixed
        })

    }

    checkWidnowSizeMD() {
        if(window.innerWidth >= 992) {
            this.setState({
                searchInMenu: false
            })
        }
        if(this.props.location.pathname === '/'){
            if(window.innerWidth <= 1200) {
                this.setState({
                    showCatalogOutMenu: false
                })
            } else if(window.innerWidth > 1200) {
                this.setState({
                    showCatalogOutMenu: true
                })
            }
            if(window.innerWidth <= 992) {
                this.setState({
                    showCatalogOutMenu: true
                })
            }
        }
    }


    componentWillUnmount() {
        window.removeEventListener("resize", this.checkWidnowSizeMD.bind(this));
        window.removeEventListener("scroll", this.navbarFixed.bind(this));
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
        this.setState({
            showNavbar: false,
            showCatalog: false,
        })
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
                <li key={key} className={"nav-item" + (item.path === window.location.pathname ? ' active' : '')}
                onClick={() => this.toggleNavbarView()}>
                    <Link className="nav-link" to={item.path}>{item.title}</Link>
                </li>
            );
        }
    }

    toggleCatalogView() {
        const showCatalog = this.state.showCatalog;

        this.setState({
            showCatalog: !showCatalog
        })
    }

    hideCatalog() {
        this.setState({
            showCatalog: false
        })
    }

    toggleNavbarView() {
        const showNavbar = this.state.showNavbar;
        this.hideCatalog();
        if(showNavbar){
            this.setState({
                showNavbar: false,
                showCatalog: false
            })
        }
    }

    render() {
        return <CategoriesContext.Consumer>{contextValue => {
            const categories = contextValue.map(item => {
                    
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
            
            return (
                <div ref={(target) => this.navBar = target}>
                    <div className='mainImage' ref={(target) => this.menuMainImage = target}>
                        <MenuTop basket={this.state.basket} like={this.state.like} token={this.props.token} />
                    </div>
                    
                        
                    <nav className={"navbar navbar-light navbar-expand-lg " + (this.state.navFix ? 'fixed-top' : '')}>
                        <button className={this.state.showNavbar ? "navbar-toggler" : "navbar-toggler collapsed"} type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded={this.state.showNavbar ? "false" : "true"} aria-label="Toggle navigation"
                                onClick={() => this.setState({showNavbar: true})}>
                            <i className="navbar-toggler-icon"></i>
                        </button>

                        { this.state.searchInMenu
                        ? <ul className="navbar-nav ml-auto mt-2 w-75">
                                <li className="nav-item">
                                    <Search onFocus={() => this.hideCatalog()}/>
                                </li>
                            </ul>
                        : null }
                        

                        <div className={this.state.showNavbar ? "collapse navbar-collapse show" : "collapse navbar-collapse"} id="navbarSupportedContent">
                            <ul className="navbar-nav">
                                {this.state.showCatalogOutMenu 
                                ? <li className="nav-item catalog_link">
                                    <a className="nav-link"
                                            onClick={() => {
                                                this.toggleCatalogView();
                                            }}>
                                    <i className="fa fa-bars"></i>
                                        <span> Каталог</span>
                                    </a>
                                
                                    { this.state.showCatalog
                                    ? <CategoryList categories={categories} onClick={() => this.hideCatalog()}/>
                                    : ''}
                                </li>
                                : null }
                                {this.state.leftItems.map((item, key) => {
                                    return this.menuItemRender(item, key);
                                })}
                            </ul>
                            { !this.state.searchInMenu
                            ? <ul className="navbar-nav container-fluid p-0 ">
                                <li className="nav-item w-100">
                                    <Search onFocus={() => this.hideCatalog()}/>
                                </li>
                            </ul>
                            : null}
                            <ul className="navbar-nav">
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
                    <div className="empty"></div>
                </div>
        );}}
        </CategoriesContext.Consumer>
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
