import React, {useEffect, useRef, useState} from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import CatalogList from "./catalogList";
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PhoneInTalkOutlinedIcon from "@material-ui/icons/PhoneInTalkOutlined";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import {ItemExit, ItemSearch, ItemPhone, ItemMenu} from './navbarDropItems'
import {clientId, clientSecret, loginUrl} from "../../../services/parameters";
import request from "../../../services/ajaxManager";
import MoreVertIcon from '@material-ui/icons/MoreVert';

const NavbarTop = (props) => {

    const token = window.store.store.getState().token

    const [changeColor, setChangeColor] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [dropItem, setDropItem] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [search, setSearch] = useState('')
    const [isOpenCatalog, setIsOpenCatalog] = useState(false)
    const [amountBasket, setAmountBasket] = useState(null)
    const [ready, setReady] = useState(false)
    const [openMore, setOpenMore] = useState(false)
    const [list, setList] = useState([])

    const leftItems = [
        {title: 'Швейный цех', path: '/workshop'},
        {title: 'Новости', path: '/news'},
        {title: 'Оплата и доставка', path: '/deliveryandpayment'},
        {title: 'Контакты', path: '/contact'},
    ]

    const rightItems =
        [
            {title: 'Мои заказы', path: '/user/order'},
            {title: 'Изменить данные', path: '/user/data/change'},
            {title: 'Изменить пароль', path: '/user/password/change'},
        ]

    const adminPanel = [
        {title: 'Обновление товаров', path: '/admin/product/update'},
        {title: 'Список товаров без изображения', path: '/admin/product/image'},
        {title: 'Управление швейным цехом', path: '/admin/workshop'},
        {title: 'Оплата и доставка', path: '/admin/deliveryandpayment'},
        {title: 'Управление новостями', path: '/admin/news'},
        {title: 'Управление акциями', path: '/admin/stocks'},
        {title: 'Управление боковыми баннерами', path: '/admin/sidebanners'},
        {title: 'Экспорт данных', path: '/admin/export'},
        {title: 'Добавление типа товара', path: '/admin/product/type'},
    ]

    const allItems =
        props.token ?
            [
                {title: 'Швейный цех', path: '/workshop'},
                {title: 'Новости', path: '/news'},
                {title: 'Оплата и доставка', path: '/deliveryandpayment'},
                {title: 'Контакты', path: '/contact'},
                {title: 'Мои заказы', path: '/user/order'},
                {title: 'Изменить данные', path: '/user/data/change'},
                {title: 'Изменить пароль', path: '/user/password/change'},
                {title: 'Выход', path: '/'},
            ]
            :
            [
                {title: 'Швейный цех', path: '/workshop'},
                {title: 'Новости', path: '/news'},
                {title: 'Оплата и доставка', path: '/deliveryandpayment'},
                {title: 'Контакты', path: '/contact'},
                {title: 'Регистрация', path: '/register'},
                {title: 'Вход', path: '/login'},
            ]

    useEffect(() => {
        const ac = new AbortController();
        openWindow(props.dropItem)
        return () => ac.abort()
    }, [props.dropItem])

    useEffect(() => {
        const ac = new AbortController();
        if (!props.reduceTopMenu) {
            setIsOpen(false)
            setIsOpenCatalog(false)
        }
        closeWindow()
        return () => ac.abort()
    }, [props.reduceTopMenu])

    useEffect(() => {
        const ac = new AbortController();
        if (props.basket) {
            if (props.basket.length > 0) {
                props.basket.map((item, index) => {
                    setAmountBasket(prev => prev + item.product.price)
                    if (index === props.basket.length - 1) setReady(true)
                })
            } else {
                setReady(true)
            }
            return () => {
                setAmountBasket(null)
            }
        }
        return () => ac.abort()
    }, [props])

    useEffect(() => {
        getData();

    }, [])

    const getData = () => {
        request(
            'product/categories',
            'GET',
            {},
            {},
            function (response) {
                setList(response)
            },
            function (err) {
                console.log(err)
            }
        )
    }

    const handleLogout = () => {
        props.onDeleteUser();
        props.onDeleteToken();
    }

    const menuItemRenderProfile = (item, index) => {
        return (
            <button key={index} className="dropdown-item" type="button">
                <Link
                    className="rounded-0 m-0 d-flex align-items-center"
                    to={item.path}
                >
                    {item.title}
                </Link>
            </button>
        )
    }

    const menuItemRender = (item, index, dropdown) => {
        if (dropdown) {
            return (
                <button key={index} className="dropdown-item" type="button">
                    <Link
                        className="rounded-0 m-0 d-flex align-items-center"
                        to={item.path}
                        onClick={() => item.title === 'Выход' ? handleLogout() : null}
                    >
                        {item.title}
                    </Link>
                </button>
            )
        } else {
            return (
                <div className='nav-item' key={index}>
                    <Link
                        className="rounded-0 nav-link m-0 text-light d-flex align-items-center"
                        to={item.path}
                    >
                        {item.title}
                    </Link>
                </div>
            )
        }
    }

    const handleSubmit = () => {

        let data = {
            'grant_type': 'password',
            'username': username,
            'password': password,
            'client_id': clientId,
            'client_secret': clientSecret,
        };

        request(
            loginUrl,
            'POST',
            data,
            {},
            function (response) {
                updateUser(response.access_token, () => props.onAddToken(response.access_token));
            },
        );
    }

    const updateUser = (token, callback) => {
        request(
            'user/get',
            'GET',
            null,
            {"Authorization": 'Bearer ' + token},
            function (response) {
                props.onAddUser(response);
                callback();
            }
        );
    }

    const openWindow = value => {
        if (value === 'catalog') {
            setIsOpenCatalog(true)
        } else {
            setIsOpen(true)
        }
        setDropItem(value)
    }

    const closeWindow = () => {
        props.setDropItem('')
        setDropItem('')
        setIsOpen(false)
        setIsOpenCatalog(false)
    }

    const handleSearch = (e) => {
        if (!mobile) {
            e.preventDefault();
        }

        let parts = window.location.pathname.split('/');

        /* if (searchInCat) {
            props.history.push('/' + parts[1] + '/' + parts[2] + '/' + search, {searchValue: search});
        } */

        props.history.push('/catalog/search?q=' + search, {searchValue: search});
    }

    const renderWindow = () => {
        switch (dropItem) {
            case "exit":
                return (
                    <ItemExit token={props.token} closeWindow={closeWindow} handleLogout={handleLogout}
                              setUsername={setUsername} setPassword={setPassword} handleSubmit={handleSubmit}/>
                )
            case "search":
                return (
                    <ItemSearch closeWindow={closeWindow} search={search} setSearch={setSearch}
                                handleSearch={handleSearch}/>
                )
            case "phone":
                return (
                    <ItemPhone closeWindow={closeWindow}/>
                )
            case "menu":
                return (
                    <ItemMenu closeWindow={closeWindow}/>
                )
            case "":
                setIsOpen(false)
        }
    }


    const defaultNavbar = () => {
        return (
            <nav
                className="navbar navbar-expand-lg p-0 d-flex align-items-center justify-content-between fixed-top defaultNavbarMenu"
                style={props.reduceTopMenu ? {marginTop: 50, height: 55} : null}
            >
                <div className="nav-item dropdown h-100">
                    <div className="catalog nav-link text-light d-flex align-items-center h-100"
                         id="navbarDropdown"
                         role="button"
                         aria-haspopup="true" aria-expanded="false"
                         onClick={() => setIsOpenCatalog(!isOpenCatalog)}
                    >
                        <MenuIcon className='mr-2'/>
                        Каталог товаров
                        <ExpandLessIcon className='iconLess ml-2'/>
                        <ExpandMoreIcon className='iconMore ml-2'/>
                    </div>
                    {
                        isOpenCatalog
                            ?
                            <div className="my-dropdown">

                                <CatalogList setIsOpenCatalog={setIsOpenCatalog} history={props.history} list={list}
                                             mobile={mobile}/>
                                <CloseIcon className='close-icon' onClick={() => setIsOpenCatalog(false)}/>
                            </div>
                            :
                            null
                    }
                </div>
                {
                    leftItems.map((item, index) => menuItemRender(item, index))
                }
                <form className="form-inline search-input">
                    <div
                        className="input-group bg-light rounded-pill align-items-center justify-content-between w-100">
                        <div className='d-flex ml-2 align-items-center flex-grow-1'>
                            <SearchIcon style={{color: 'grey'}}/>
                            <div className="input-group w-100">
                                <input className='form-control shadow-none bg-light border-0' type="text"
                                       placeholder='Что Вы ищете?'
                                       aria-label="Radio button for following text input"
                                       onChange={(e) => {
                                           setSearch(e.target.value)
                                       }}
                                />
                            </div>
                        </div>
                        <div>
                            <CloseIcon/>
                            <button
                                onClick={(e) => handleSearch(e)}
                                className="btn btn-outline-success my-1 mr-1 border-0 rounded-pill text-white search"
                                type="submit">найти
                            </button>
                        </div>
                    </div>
                </form>

                {
                    token ?
                        <div className='d-flex align-items-center text-white ml-4'
                             style={props.user.roles.includes("ROLE_ADMIN") ? {width: 390} : null}>
                            {
                                props.user && props.user.roles && props.user.roles.includes("ROLE_ADMIN")
                                    ?
                                    <div className='d-flex align-items-center dropdown icon-more-less'
                                         onClick={() => setOpenMore(!openMore)}>
                                        <div className="nav-link text-white pr-0"
                                             type="button" data-display="static" aria-haspopup="true"
                                             aria-expanded="false"
                                             data-toggle="dropdown"
                                        >Админка
                                        </div>
                                        <div className="dropdown-menu dropdown-menu-lg-right">
                                            {
                                                adminPanel.map((item, index) => menuItemRenderProfile(item, index, true))
                                            }
                                        </div>
                                        <ExpandLessIcon className='icon-less'/>
                                        <ExpandMoreIcon className='icon-more'/>
                                    </div>
                                    :
                                    null
                            }

                            <div className='d-flex align-items-center dropdown icon-more-less'
                                 onClick={() => setOpenMore(!openMore)}>
                                <div className="nav-link text-white pr-0"
                                     type="button" data-display="static" aria-haspopup="true"
                                     aria-expanded="false"
                                     data-toggle="dropdown"
                                >Профиль
                                </div>
                                <div className="dropdown-menu dropdown-menu-lg-right">
                                    {
                                        rightItems.map((item, index) => menuItemRenderProfile(item, index, true))
                                    }
                                </div>
                                <ExpandLessIcon className='icon-less'/>
                                <ExpandMoreIcon className='icon-more'/>
                            </div>
                            <div style={{
                                width: 1,
                                height: 50,
                                backgroundColor: '#f5f5f5',
                                marginLeft: 15,
                                marginRight: 15
                            }}/>
                            <ExitToAppIcon/>
                            <Link className="nav-link text-white pl-1" onClick={() => handleLogout()}
                                  to={''}>Выход</Link>
                        </div>
                        :
                        <div className='d-flex align-items-center text-white ml-4'>
                            <div className='d-flex align-items-center'>
                                <ExitToAppIcon/>
                                <Link className="nav-link text-white pl-1" to={'/login'}>Вход</Link>
                            </div>
                            <div style={{
                                width: 1,
                                height: 50,
                                backgroundColor: '#f5f5f5',
                                marginLeft: 15,
                                marginRight: 15
                            }}/>
                            <div>
                                <Link className="nav-link text-white" to={'/register'}>Регистрация</Link>
                            </div>
                        </div>
                }
            </nav>
        )
    }

    const minNavbar = () => {
        return (
            <nav
                className="navbar navbar-expand-lg p-0 d-flex align-items-center justify-content-between fixed-top defaultNavbarMenu"
                style={props.reduceTopMenu ? {marginTop: 50, height: 55} : null}
            >
                <div className="nav-item dropdown h-100">
                    <div className="catalog nav-link text-light d-flex align-items-center h-100"
                         id="navbarDropdown"
                         role="button"
                         aria-haspopup="true" aria-expanded="false"
                         onClick={() => setIsOpenCatalog(!isOpenCatalog)}
                    >
                        <MenuIcon className='mr-2'/>
                        Каталог товаров
                        <ExpandLessIcon className='iconLess ml-2'/>
                        <ExpandMoreIcon className='iconMore ml-2'/>
                    </div>
                    {
                        isOpenCatalog
                            ?
                            <div className="my-dropdown">
                                <CatalogList setIsOpenCatalog={setIsOpenCatalog} history={props.history} list={list}
                                             mobile={mobile}/>
                                <CloseIcon className='close-icon' onClick={() => setIsOpenCatalog(false)}/>

                            </div>
                            :
                            null
                    }
                </div>

                <form className="form-inline w-50">
                    <div
                        className="input-group bg-light rounded-pill align-items-center justify-content-between w-100">
                        <div className='d-flex ml-2 align-items-center flex-grow-1'>
                            <SearchIcon style={{color: 'grey'}}/>
                            <div className="input-group w-100">
                                <input className='form-control shadow-none bg-light border-0' type="text"
                                       placeholder='Что Вы ищете?'
                                       aria-label="Radio button for following text input"
                                       onChange={(e) => {
                                           setSearch(e.target.value)
                                       }}
                                />
                            </div>
                        </div>
                        <div>
                            <CloseIcon/>
                            <button
                                onClick={(e) => handleSearch(e)}
                                className="btn btn-outline-success my-1 mr-1 border-0 rounded-pill text-white search"
                                type="submit">найти
                            </button>
                        </div>
                    </div>
                </form>
                <div>
                    <div className="btn-group d-flex align-items-center">
                        {
                            props.user && props.user.roles && props.user.roles.includes("ROLE_ADMIN")
                                ?
                                <div className='d-flex align-items-center dropdown icon-more-less pr-3'
                                     onClick={() => setOpenMore(!openMore)}>
                                    <div className="nav-link text-white pr-0"
                                         type="button" data-display="static" aria-haspopup="true"
                                         aria-expanded="false"
                                         data-toggle="dropdown"
                                    >Админка
                                    </div>
                                    <div className="dropdown-menu dropdown-menu-lg-right">
                                        {
                                            adminPanel.map((item, index) => menuItemRenderProfile(item, index, true))
                                        }
                                    </div>
                                    <ExpandLessIcon className='icon-less text-white'/>
                                    <ExpandMoreIcon className='icon-more text-white'/>
                                </div>
                                :
                                null
                        }

                        <div className='dropdown'>
                            <MoreVertIcon type="button" data-display="static" aria-haspopup="true"
                                          data-toggle="dropdown"
                                          aria-expanded="false" className='text-white mr-3'/>
                            <div className="dropdown-menu dropdown-menu-lg-right">
                                {
                                    allItems.map((item, index) => menuItemRender(item, index, true))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }

    const mobileNavbar = () => {
        if (isOpen) {
            return (
                <div
                    className="d-flex flex-row justify-content-between bg-light text-center align-items-center fixed-top w-100"
                    style={{marginTop: 70}}
                >
                    {renderWindow()}
                </div>
            )
        } else {
            return (
                <div
                    className="d-flex flex-row justify-content-between bg-light text-left align-items-center fixed-top w-100"
                    style={{marginTop: 70, height: 50}}
                >
                    {
                        isOpenCatalog ?
                            <div className="nav-link h-100 mx-0 w-100 py-0 px-0" id="navbarDropdown"
                                 role="button"
                                 aria-haspopup="true" aria-expanded="false"
                            >
                                <div
                                    className="dropdown ml-0 pl-0 h-100 d-flex justify-content-between align-items-center mobile-catalog-open">
                                    <div className='d-flex align-items-center text-white w-100 mx-0 px-0'>
                                        <MenuIcon className='mx-2'/>
                                        <button
                                            className="btn px-0 h-100 ml-0 text-white d-flex  d-flex mobile-catalog-open justify-content-center align-items-center"
                                            type="button">
                                            КАТАЛОГ
                                        </button>
                                    </div>
                                    <CloseIcon className='exit-icon mr-2 text-white' onClick={() => closeWindow()}/>
                                </div>
                                <div className='mobile-catalog-dropdown shadow bg-light'>
                                    <CatalogList setIsOpenCatalog={setIsOpenCatalog} history={props.history} list={list}
                                                 reduce={true}/>
                                </div>
                            </div>
                            :
                            <>
                                <div className="dropdown w-50 h-100 mr-2">
                                    <button
                                        onClick={() => openWindow('catalog')}
                                        className="btn btn-secondary h-100 ml-0 mobile-catalog d-flex w-100 d-flex justify-content-center align-items-center"
                                        type="button">
                                        <MenuIcon className='mr-2'/>
                                        КАТАЛОГ
                                        <ExpandLessIcon className='iconLess ml-2'/>
                                        <ExpandMoreIcon className='iconMore ml-2'/>
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        {/*<CatalogList mobile={mobile}/>*/}
                                    </div>
                                </div>
                                <div className='justify-content-between d-flex w-50 h-100'>
                                    <div className="dropdown w-100 h-100">
                                        <button
                                            className="btn ml-0 rounded-pill mobile-shopping d-flex text-white w-100 d-flex justify-content-center align-items-center h-100"
                                            type="button"
                                            id="dropdownMenuButton"
                                            aria-haspopup="true" aria-expanded="false">
                                            <Link to='/user/basket'>
                                                <ShoppingCartIcon className='text-white'/>
                                            </Link>
                                            <ExpandLessIcon className='iconLess ml-2'/>
                                            <ExpandMoreIcon className='iconMore ml-2'/>
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <div>
                                                {
                                                    props.basket.length > 0 && ready
                                                        ?
                                                        <div
                                                            className='d-flex flex-column dropdown-basket justify-content-center align-items-center'>
                                            <span>
                                                {amountBasket + ' Р'}
                                            </span>
                                                            <p>
                                                                {
                                                                    props.basket.length === 1
                                                                        ? props.basket.length + ' товар'
                                                                        : props.basket.length === 2
                                                                        ?
                                                                        props.basket.length + ' товара'
                                                                        :
                                                                        props.basket.length + ' товаров'
                                                                }
                                                            </p>
                                                            <button className='btn rounded-pill w-100 '>
                                                                ОФОРМИТЬ ЗАКАЗ
                                                            </button>
                                                        </div>
                                                        : ready ?
                                                        <div
                                                            className='d-flex flex-column dropdown-basket justify-content-center align-items-center'>
                                                            <p className='basket'>У Вас нет
                                                                товаров<br/>в
                                                                корзине</p>
                                                            <button className='btn rounded-pill w-100 '>
                                                                ОФОРМИТЬ ЗАКАЗ
                                                            </button>
                                                        </div>
                                                        : null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        className='btn mobile-favorite mr-0 py-0 ml-2 w-100 d-flex justify-content-center align-items-center'>
                                        <Link to='/user/favorite'>
                                            <div>
                                                <FavoriteIcon style={{color: '#fff', width: 30, height: 30}}/>
                                            </div>
                                        </Link>
                                    </button>
                                </div>
                            </>
                    }
                </div>
            )
        }
    }

    const reduceMobileNavbar = () => {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light p-0 fixed-top w-100">
                <ul className="navbar-nav mr-auto d-flex flex-row align-items-center justify-content-between w-100">
                    {
                        isOpenCatalog ?
                            <li className="nav-item dropdown w-100 ">
                                <div className="nav-link h-100 py-0" id="navbarDropdown" role="button"
                                     aria-haspopup="true" aria-expanded="false"
                                >
                                    <div
                                        className="dropdown h-100 d-flex justify-content-between align-items-center w-100 mobile-catalog-open">
                                        <div className='d-flex align-items-center text-white'>
                                            <MenuIcon className='mx-2 '/>
                                            <button
                                                onClick={() => openWindow('catalog')}
                                                className="btn px-0 h-100 ml-0 text-white d-flex w-100 d-flex mobile-catalog-open justify-content-center align-items-center"
                                                type="button"
                                                id="dropdownMenuButton"
                                                aria-haspopup="true" aria-expanded="false">
                                                КАТАЛОГ
                                            </button>
                                        </div>
                                        <CloseIcon className='exit-icon mr-2 text-white' onClick={() => closeWindow()}/>
                                    </div>
                                    <div className='mobile-catalog-dropdown'>
                                        <CatalogList setIsOpenCatalog={setIsOpenCatalog} history={props.history}
                                                     list={list} reduce={true}/>
                                    </div>
                                </div>
                            </li>
                            :
                            isOpen ?
                                <Link to="/" className='custom-brand ml-2 '>
                                    <div className='d-flex flex-column align-items-start'>
                                        <h1 className={'pr-3  pb-0 mb-0'}>Универсал</h1>
                                        <h6>хозяйственные товары</h6>
                                    </div>
                                </Link>
                                :
                                <>
                                    <li className="nav-item dropdown">
                                        <div className="nav-link" id="navbarDropdown" role="button"
                                             aria-haspopup="true" aria-expanded="false"
                                        >
                                            <div className="dropdown h-100">
                                                <button
                                                    onClick={() => openWindow('catalog')}
                                                    className="btn px-0 btn-secondary h-100 ml-0 mobile-catalog d-flex w-100 d-flex justify-content-center align-items-center"
                                                    type="button"
                                                    id="dropdownMenuButton"
                                                    aria-haspopup="true" aria-expanded="false">
                                                    <MenuIcon className='mr-1'/>
                                                    КАТАЛОГ
                                                    <ExpandLessIcon className='iconLess ml-1'/>
                                                    <ExpandMoreIcon className='iconMore ml-1'/>
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <div className="nav-link" id="navbarDropdown" role="button"
                                             aria-haspopup="true" aria-expanded="false">
                                            <div className='basketMobile'>
                                                <Link to='/user/basket'>
                                                    <ShoppingCartIcon className='text-white'/>
                                                </Link>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <div className="nav-link" id="navbarDropdown"
                                             role="button"
                                             aria-haspopup="true" aria-expanded="false">
                                            <div className='mobileFavoriteReduce'>
                                                <Link to='/user/favorite'>
                                                    <FavoriteIcon className='text-white'/>
                                                </Link>
                                            </div>
                                        </div>
                                    </li>
                                </>
                    }
                    {
                        isOpenCatalog ?
                            null
                            :
                            <>
                                <li className="nav-item dropdown">
                                    <a className="nav-link " id="navbarDropdown" role="button"
                                       aria-haspopup="true" aria-expanded="false">
                                        <ExitToAppIcon onClick={() => openWindow('exit')} className='text-black-50'/>
                                    </a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link" id="navbarDropdown" role="button"
                                       aria-haspopup="true" aria-expanded="false">
                                        <SearchIcon onClick={() => openWindow('search')} className='text-black-50'/>
                                    </a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link " id="navbarDropdown" role="button"
                                       aria-haspopup="true" aria-expanded="false">
                                        <PhoneInTalkOutlinedIcon onClick={() => openWindow('phone')}
                                                                 className='text-black-50'/>
                                    </a>
                                </li>
                                <li className="nav-item dropdown mr-2">
                                    <a className="nav-link" id="navbarDropdown" role="button"
                                       aria-haspopup="true" aria-expanded="false">
                                        <MenuIcon onClick={() => openWindow('menu')} className='text-black-50'/>
                                    </a>
                                </li>
                            </>
                    }
                </ul>
                {
                    isOpen ?
                        renderWindow()
                        :
                        null
                }
            </nav>
        )
    }

    let mobile = props.mobileMode
    let reduce = props.reduceTopMenu
    let minimal = props.minimalMode

    return (
        mobile ?
            reduce ?
                reduceMobileNavbar()
                :
                mobileNavbar()
            :
            minimal ?
                minNavbar()
                :
                defaultNavbar()
    )
}

export default withRouter(connect(
    (state) => ({
        token: state.token,
        user: state.user,
        reload: state.reload,
    }),
    dispatch => ({
        onAddToken: (token) => {
            dispatch({type: 'ADD_TOKEN', payload: token})
        },
        onAddUser: (user) => {
            dispatch({type: 'ADD_USER', payload: user})
        },
        onDeleteToken: (token) => {
            dispatch({type: 'DELETE_TOKEN', payload: token})
        },
        onDeleteUser: (user) => {
            dispatch({type: 'DELETE_USER', payload: user})
        },
        onReloadedMenu: () => {
            dispatch({type: 'RELOADED', payload: true})
        },
    })
)(NavbarTop));