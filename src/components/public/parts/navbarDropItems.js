import React, {useState} from 'react';
import login from "../sign_action/login";
import CloseIcon from '@material-ui/icons/Close';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import {Link} from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import PhoneInTalkOutlinedIcon from "@material-ui/icons/PhoneInTalkOutlined";
import MailOutlineOutlinedIcon from "@material-ui/icons/MailOutlineOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import QueryBuilderOutlinedIcon from "@material-ui/icons/QueryBuilderOutlined";

export const ItemExit = (props) => {

    if (props.token) {
        return (
            <div className='custom-dropdown-item w-100'>
                <CloseIcon className='exit-icon' onClick={() => props.closeWindow()}/>
                <h5 className=''>ПРОФИЛЬ</h5>
                <Link to={'/user/basket'}>
                    <p>Корзина</p>
                </Link>
                <Link to={'/user/favorite'}>
                    <p>Избранное</p>
                </Link>
                <Link to={'/user/order'}>
                    <p>Мои заказы</p>
                </Link>
                <Link to={'/user/data/change'}>
                    <p>Изменить данные</p>
                </Link>
                <Link to={'/user/password/change'}>
                    <p>Изменить пароль</p>
                </Link>
                <div className='d-flex justify-content-center w-100 '>
                    <button className='btn d-flex align-items-center justify-content-center rounded-pill'
                            onClick={() => props.handleLogout()}>
                        <ExitToAppIcon className='mr-2'/>
                        ВЫХОД
                    </button>
                </div>
            </div>
        )
    } else {
        return (
            <div className='custom-dropdown-item w-100'>
                <CloseIcon className='exit-icon' onClick={() => props.closeWindow()}/>
                <h5>ВХОД</h5>
                <div className="input-group mb-3 d-flex flex-column align-items-center justify-content-center w-100">
                    <h6>E-mail</h6>
                    <input type="text" className="form-control rounded-pill w-100" placeholder="E-mail"
                           aria-label="Username"
                           aria-describedby="basic-addon1"
                           onChange={(e) => props.setUsername(e.target.value)}
                    />
                </div>
                <div className="input-group mb-3 d-flex flex-column align-items-center justify-content-center w-100">
                    <h6>Пароль</h6>
                    <input type="password" className="form-control rounded-pill w-100" placeholder="Пароль"
                           aria-label="password"
                           aria-describedby="basic-addon1"
                           onChange={(e) => props.setPassword(e.target.value)}
                    />
                </div>
                <div className='d-flex justify-content-center w-100 '>
                    <button className='btn d-flex align-items-center justify-content-center rounded-pill'
                            onClick={() => props.handleSubmit()}>
                        <ExitToAppIcon className='mr-2'/>
                        ВОЙТИ
                    </button>
                </div>
                <Link to={'/password/reset'}>
                    <u>
                        ВОССТАНОВИТЬ ПАРОЛЬ
                    </u>
                </Link>

                <div className='d-flex justify-content-center w-100'>
                    <Link to={'/register'}>
                        <button
                            className='btn d-flex align-items-center justify-content-center rounded-pill registration'
                            onClick={() => props.handleLogout()}>
                            <PersonOutlineIcon className='mr-2'/>
                            ЗАРЕГИСТРИРОВАТЬСЯ
                        </button>
                    </Link>
                </div>
            </div>
        );
    }
}

export const ItemSearch = (props) => {
    return (
        <div className='custom-dropdown-item w-100'>
            <CloseIcon className='exit-icon' onClick={() => props.closeWindow()}/>
            <h5 className=''>ПОИСК</h5>
            <div className="input-group custom-input rounded-pill d-flex align-items-center mt-4 mb-1">
                <div className="input-group-prepend ml-2">
                    <SearchIcon className='search-icon'/>
                </div>
                <input type="text" className="form-control border-0 rounded-pill" placeholder="Что Вы ищете?"
                       aria-label="text"
                       aria-describedby="basic-addon1"
                       value={props.search}
                       onChange={(e) => props.setSearch(e.target.value)}
                />
                <CloseIcon className='exit-icon' onClick={() => props.setSearch('')}/>
            </div>
            <div className='d-flex justify-content-center w-100'>
                <button className='btn registration d-flex align-items-center justify-content-center rounded-pill'
                        onClick={() => props.handleSearch()}>
                    НАЙТИ
                </button>
            </div>
        </div>
    );
}
export const ItemPhone = (props) => {
    return (
        <div className='custom-dropdown-item w-100'>
            <CloseIcon className='exit-icon' onClick={() => props.closeWindow()}/>
            <h5 className=''>КОНТАКТЫ</h5>
            <div className='d-flex justify-content-center mb-4'>
                <PhoneInTalkOutlinedIcon className='search-icon mr-2 mt-2'/>
                <div className='d-flex align-items-center flex-column'>
                    <p className='pb-0 mb-0'>
                        <a className='text-phone' href={'tel:+7 (3822) 90-92-91'} itemProp="telephone">
                            +7 (3822) 90-92-91
                        </a>
                    </p>
                    <p className='pb-0 mb-0'>
                        <a className='text-phone' href={'tel:+7 (3822) 90-44-32'} itemProp="telephone">
                            +7 (3822) 90-44-32
                        </a>
                    </p>
                    <p className='pb-0 mb-0'>
                        <a className='text-phone' href={'tel:+7 (3822) 90-26-68'} itemProp="telephone">
                            +7 (3822) 90-26-68
                        </a>
                    </p>
                </div>
            </div>
            <div className='mb-3'>
                <MailOutlineOutlinedIcon className='search-icon'/>
                <a className='mail-text' href={'email:razov@mail.tomsknet.ru'}
                   itemProp="email">razov@mail.tomsknet.ru
                </a>
            </div>
            <div className='d-flex justify-content-center'>
                <LocationOnOutlinedIcon className='search-icon mt-2'/>
                <p className='mail-text'>
                    г. Томск, ул. Бердская, 31
                </p>
            </div>
            <div className='d-flex justify-content-center'>
                <QueryBuilderOutlinedIcon className='search-icon mt-2'/>
                <p className='mail-text'>
                    пн-пт - 9:00 - 17:00
                    <br/>
                    сб - 9:00 - 14:00
                    <br/>
                    вс - выходной
                </p>
            </div>
        </div>
    );
}

export const ItemMenu = (props) => {
    return (
        <div className='custom-dropdown-item w-100'>
            <CloseIcon className='exit-icon' onClick={() => props.closeWindow()}/>
            <h5 className=''>МЕНЮ</h5>
            <Link to={'/workshop'}>
                <p>
                    Швейный цех
                </p>
            </Link>
            <Link to={'/news'}>
                <p>Новости</p>
            </Link>
            <Link to={'/deliveryandpayment'}>
                <p>Оплата и доставка</p>
            </Link>
            <Link to={'/contact'}>
                <p>Контакты</p>
            </Link>
        </div>
    );
}



