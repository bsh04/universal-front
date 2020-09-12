import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {YMaps, Map, GeoObject, GeolocationControl, SearchControl, ZoomControl} from 'react-yandex-maps';
import {Helmet} from "react-helmet";
import Breadcrumbs from '../breadcrumbs';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import QueryBuilderOutlinedIcon from '@material-ui/icons/QueryBuilderOutlined';
import PhoneInTalkOutlinedIcon from '@material-ui/icons/PhoneInTalkOutlined';
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';

import MapSection from './parts/mapSection';

class Contact extends Component {
    render() {
        return (
            <div className='contacts' itemScope itemType="http://schema.org/Organization">
                <Helmet>
                    <meta charSet="utf-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <meta name="theme-color" content="#000000"/>
                    <title>Контакты - Универсал</title>
                    <meta name="keywords"
                          content="купить хозтовары, хозяйственные товары, бытовые товары, хозяйственно-бытовые товары, товары для дома"/>
                    <meta name="description"
                          content="Товары для дома, хозяйственные товары, спец. одежда и многое другое!"/>
                    <meta property="og:description"
                          content="Множество товаров для дома, хозяйства, авто и многого другого!"/>
                    <meta property="og:title" content="Контакты"/>
                    <meta property="og:url" content="https://universal.tom.ru/contact"/>
                </Helmet>
                <Breadcrumbs path={[{title: 'Контакты'}]}/>
                <h4>Контакты</h4>
                <div className='contacts-items'>
                    <div className='location'>
                        <div  className='first'>
                            <LocationOnOutlinedIcon className='mr-2 icon'/>
                        </div>
                        <div className='second'>
                            <span
                                itemProp="streetAddress">Адрес: г. Томск, ул. Бердская, 31<br/> (пер. Пойменный 5)</span>
                        </div>
                    </div>
                    <div className='phone'>
                        <div className='first'>
                            <PhoneInTalkOutlinedIcon className='mr-2 icon'/>
                        </div>
                        <div className='second'>
                            <a href={'tel:+7 (3822) 909291'} itemProp="telephone">+7 (3822) 90-92-91,</a>
                            <a href={'tel:+7 (3822) 90-44-32'} itemProp="telephone">+7 (3822) 90-44-32<br/></a>
                            <a href={'tel:+7 (3822) 902-668'} itemProp="telephone">+7 (3822) 90-26-68</a>
                        </div>
                    </div>
                    <div className='mail'>
                        <div className='first'>
                            <MailOutlineOutlinedIcon className='mr-2 icon'/>
                        </div>
                        <div className='second'>
                            <a href="mailto:razov@mail.tomsknet.ru" itemProp="email">razov@mail.tomsknet.ru</a>
                        </div>
                    </div>
                </div>

                <div className='map'>
                    <MapSection/>
                </div>

                <div className='about'>
                    <h3>О компании</h3>
                    <hr/>
                </div>
                <p className={'about-text'}>
                    Основным направлением нашей деятельности является оптовая торговля товарами народного потребления:
                    посуда, хозяйственные товары, инструменты. Наша цель - предоставление качественных товаров широкого
                    ассортимента по разумным ценам.<br/><br/>
                    Большое количество товарных групп, низкие цены, взаимовыгодные условия работы, внимательное
                    отношение к покупателям способствует росту и развитию компании.
                    Мы не собираемся останавливаться на достигнутом, постоянно совершенствуем наши знания и опыт,
                    расширяя ассортимент предлагаемых товаров.<br/><br/>
                    <strong>Приглашаем к сотрудничеству!</strong>
                </p>
            </div>
        );
    }
}

export default Contact;
