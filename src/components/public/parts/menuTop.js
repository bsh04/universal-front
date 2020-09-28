import React, {Component, useEffect, useState} from 'react';
import {Link, withRouter} from 'react-router-dom';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import QueryBuilderOutlinedIcon from '@material-ui/icons/QueryBuilderOutlined';
import PhoneInTalkOutlinedIcon from '@material-ui/icons/PhoneInTalkOutlined';
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SearchIcon from "@material-ui/icons/Search";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MenuIcon from "@material-ui/icons/Menu";
import {connect} from "react-redux";
import Modal from "@material-ui/core/Modal";
import {ItemExit} from './navbarDropItems'


const MenuTop = props => {

    const handleLogout = () => {
        props.onDeleteUser();
        props.onDeleteToken();
    }

    const [amountBasket, setAmountBasket] = useState(null);
    
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if(props.basket.length > 0) {
            let sum = props.basket.reduce((acc, item) => acc + item.product.price, 0);
            
            setAmountBasket(sum);
            
            setReady(true);
        }
        
        
    }, [props.reload, props.basket])


    const defaultMenu = () => {
        return (
            <div
                className="d-flex justify-content-around text-left bg-white align-items-center fixed-top mainImage container-fluid defaultTopMenu">
                <Link to="/">
                    <div className={'d-flex flex-column text-center'}>
                        <h1>Универсал</h1>
                        <h6>хозяйственные товары</h6>
                    </div>
                </Link>
                <div className='row'>
                    <LocationOnOutlinedIcon className='menuItems'/>
                    <p style={{paddingLeft: 5}} className='menuText'>
                        Адрес:
                        г. Томск, ул. Бердская, 31
                        <br/>
                        Работаем по РФ
                    </p>
                </div>

                <div className='row'>
                    <QueryBuilderOutlinedIcon className='menuItems'/>
                    <p className='menuText'>
                        пн-пт - 9:00 - 17:00
                        <br/>
                        сб - 9:00 - 14:00, вс - выходной
                    </p>
                </div>

                <div className="row">
                    <p>
                        <PhoneInTalkOutlinedIcon className='menuItems'/>
                        <a className='menuTextPhone' href={'tel:+7 (3822) 90-92-91'}
                           itemProp="telephone">
                            +7 (3822) 90-92-91
                        </a>
                        <br/>

                        <PhoneInTalkOutlinedIcon className='menuItems'/>
                        <a className='menuTextPhone' href={'tel:+7 (3822) 90-44-32'}
                           itemProp="telephone">
                            +7 (3822) 90-44-32
                        </a>
                    </p>
                </div>
                <div>
                    <p>
                        <PhoneInTalkOutlinedIcon className='menuItems'/>
                        <a className='menuTextPhone' href={'tel:+7 (3822) 90-26-68'}
                           itemProp="telephone">
                            +7 (3822) 90-26-68
                        </a>
                        <br/>
                        <MailOutlineOutlinedIcon className='menuItems'/>
                        <a className='menuText' href={'email:razov@mail.tomsknet.ru'}
                           itemProp="email">razov@mail.tomsknet.ru
                        </a>
                        <br/>
                    </p>
                </div>
                <div className='d-flex flex-row align-items-center'>
                    <div>
                        <Link to={'/user/basket'}>
                            <div className="iconButtons">
                                <ShoppingCartIcon/>
                            </div>
                        </Link>
                    </div>
                    {
                        props.basket.length > 0 && ready
                            ?
                            <div className='d-flex flex-column basket'>
                                <span>
                                    {Number(amountBasket).toFixed() + ' Р'}
                                </span>
                                <p className='menuText'>
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
                            </div>
                            : ready ?
                            <p className='basket'>У Вас нет
                                товаров<br/>в
                                корзине</p>
                            : null
                    }
                    <div style={{
                        width: 1,
                        height: 50,
                        backgroundColor: '#b0b0b0b0',
                        marginLeft: 15,
                        marginRight: 15
                    }}/>
                    <div className="flex-column align-items-center d-flex"  style={{width: 83}}>
                        <Link to={'/user/favorite'}>
                            <FavoriteIcon style={{color: '#219ed1', width: 30, height: 30}}/>
                        </Link>
                        <p className='menuText pl-0'>Избранное</p>
                    </div>
                </div>
            </div>
        )
    }

    const reduceMenu = () => {
        return (
            <div
                className="d-flex flex-row justify-content-around text-left bg-light align-items-center container-fluid fixed-top mainImage minTopMenu"
            >
                <Link to="/">
                    <div className={'d-flex flex-row align-items-center text-center'}>
                        <h1>Универсал</h1>
                        <h6>хозяйственные товары</h6>
                    </div>
                </Link>
                <div className='d-flex align-items-center'>
                    <p>
                        <PhoneInTalkOutlinedIcon className='menuItems'/>
                        <a className='menuTextPhone pr-5' href={'tel:+7 (3822) 90-92-91'} itemProp="telephone">
                            +7 (3822) 90-92-91
                        </a>
                    </p>
                    <p className='px-4'>
                        <PhoneInTalkOutlinedIcon className='menuItems'/>
                        <a className='menuTextPhone' href={'tel:+7 (3822) 90-44-32'} itemProp="telephone">
                            +7 (3822) 90-44-32
                        </a>
                    </p>
                    <p>
                        <PhoneInTalkOutlinedIcon className='menuItems pl-5'/>
                        <a className='menuTextPhone' href={'tel:+7 (3822) 90-26-68'} itemProp="telephone">
                            +7 (3822) 90-26-68
                        </a>
                    </p>
                </div>
                <div className='d-flex flex-row align-items-center'>
                    <div>
                        <Link to={'/user/basket'}>
                            <div className="iconButtonsReducer">
                                <ShoppingCartIcon/>
                            </div>
                        </Link>
                    </div>
                    {
                        props.basket.length > 0 && ready
                            ?
                            <div className='d-flex flex-row basket'>
                                <span>
                                    {Number(amountBasket).toFixed() + ' Р'}
                                </span>
                                <p className='menuText'>
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
                            </div>
                            : ready ?
                            <p className='basket'>У Вас нет
                                товаров<br/>в
                                корзине</p>
                            : null
                    }
                    <div style={{
                        width: 1,
                        height: 30,
                        backgroundColor: '#b0b0b0b0',
                        marginLeft: 15,
                        marginRight: 15
                    }}/>

                    <div className="flex-row align-items-center d-flex">
                        <Link to={'/user/favorite'}>
                            <FavoriteIcon style={{color: '#219ed1', width: 30, height: 30}}/>
                        </Link>

                        <p style={{color: 'black', fontWeight: 'normal', marginLeft: 10}}>Избранное</p>
                    </div>
                </div>
            </div>
        )
    }

    const minMenu = () => {
        return (
            <div
                className="d-flex justify-content-around text-left bg-white align-items-center fixed-top mainImage container-fluid defaultTopMenu" style={reduce ? {height: 50} : null}>
                <Link to="/">
                    <div className={reduce ? 'd-flex flex-row align-items-center text-center' : 'd-flex flex-column text-center'}>
                        <h1>Универсал</h1>
                        <h6>хозяйственные товары</h6>
                    </div>
                </Link>
                {
                    reduce ?
                        <>
                            <div className='row'>
                                    <p>
                                        <PhoneInTalkOutlinedIcon className='menuItems'/>
                                        <a className='menuTextPhone mr-2' href={'tel:+7 (3822) 90-92-91'}
                                           itemProp="telephone">
                                            +7 (3822) 90-92-91
                                        </a>
                                        <PhoneInTalkOutlinedIcon className='menuItems'/>
                                        <a className='menuTextPhone mr-2' href={'tel:+7 (3822) 90-44-32'}
                                           itemProp="telephone">
                                            +7 (3822) 90-44-32
                                        </a>
                                    </p>
                            </div>
                        </>
                        :
                        <>
                            <div className='d-flex flex-column justify-content-center'>
                                <div className='row'>
                                    <LocationOnOutlinedIcon className='menuItems'/>
                                    <p style={{paddingLeft: 5}} className='menuText'>
                                        Адрес:
                                        г. Томск, ул. Бердская, 31
                                        <br/>
                                    </p>
                                </div>
                                <div className='row'>
                                    <QueryBuilderOutlinedIcon className='menuItems'/>
                                    <p className='menuText'>
                                        пн-пт - 9:00 - 17:00
                                        <br/>
                                        сб - 9:00 - 14:00, вс - выходной
                                    </p>
                                </div>
                            </div>
                            <div className='d-flex flex-column justify-content-center'>
                                <div className="row">
                                    <p>
                                        <PhoneInTalkOutlinedIcon className='menuItems'/>
                                        <a className='menuTextPhone' href={'tel:+7 (3822) 90-92-91'}
                                           itemProp="telephone">
                                            +7 (3822) 90-92-91
                                        </a>
                                        <br/>

                                        <PhoneInTalkOutlinedIcon className='menuItems'/>
                                        <a className='menuTextPhone' href={'tel:+7 (3822) 90-44-32'}
                                           itemProp="telephone">
                                            +7 (3822) 90-44-32
                                        </a>
                                    </p>
                                </div>
                                <div className='row'>
                                    <p>
                                        <PhoneInTalkOutlinedIcon className='menuItems'/>
                                        <a className='menuTextPhone' href={'tel:+7 (3822) 90-26-68'}
                                           itemProp="telephone">
                                            +7 (3822) 90-26-68
                                        </a>
                                        <br/>
                                        <MailOutlineOutlinedIcon className='menuItems'/>
                                        <a className='menuText' href={'email:razov@mail.tomsknet.ru'}
                                           itemProp="email">razov@mail.tomsknet.ru
                                        </a>
                                        <br/>
                                    </p>
                                </div>
                            </div>
                        </>
                }

                <div className='d-flex flex-row align-items-center'>
                    <div>
                        <Link to={'/user/basket'}>
                            <div className={reduce ? "basketMobile text-white" : "iconButtons"}>
                                <ShoppingCartIcon/>
                            </div>
                        </Link>
                    </div>
                    {
                        reduce ?
                            <div className='line' style={{height: 30}}/>
                            :
                            <div className='line'/>
                    }
                    <div className="flex-column align-items-center d-flex">
                        <Link to={'/user/favorite'}>
                            <FavoriteIcon style={{color: '#219ed1', width: 30, height: 30}}/>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    const mobileMenu = () => {
        return (
            <div
                className="d-flex flex-row px-3 bg-light text-left align-items-center justify-content-center fixed-top mainImage"
                style={{height: 70}}>
                <div className='d-flex flex-column align-items-left w-50'>
                    <Link to="/" className="align-items-center text-center">
                        <h1>универсал</h1>
                        <h6>хозяйственные товары</h6>
                    </Link>
                </div>
                <div className='d-flex justify-content-around align-items-center px-0 mx-0 text-black-50 w-50'>
                    <ExitToAppIcon className='mx-1' onClick={() => props.setDropItem('exit')}/>
                    <SearchIcon className='mx-1' onClick={() => props.setDropItem('search')}/>
                    <PhoneInTalkOutlinedIcon className='mx-1' onClick={() => props.setDropItem('phone')}/>
                    <MenuIcon className='mx-1' onClick={() => props.setDropItem('menu')}/>
                </div>
            </div>
        )
    }

    let reduce = props.reduceTopMenu
    let mobile = props.mobileMode
    let minimal = props.minimalMode

    return (
        mobile && reduce ?
            null
            :
            mobile ?
                mobileMenu()
                :
                minimal ?
                    minMenu()
                    :
                    reduce
                        ?
                        reduceMenu()
                        :
                        defaultMenu()
    )
}

export default withRouter(connect(
    (state) => ({
        token: state.token,
        user: state.user,
        reload: state.reload
    }),
    dispatch => ({
        onDeleteToken: (token) => {
            dispatch({type: 'DELETE_TOKEN', payload: token})
        },
        onDeleteUser: (user) => {
            dispatch({type: 'DELETE_USER', payload: user})
        },
    })
)(MenuTop));