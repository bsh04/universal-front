import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { YMaps, Map, GeoObject, GeolocationControl, SearchControl, ZoomControl } from 'react-yandex-maps';
import {Helmet} from "react-helmet";

class Contact extends Component {
    render() {
        return (
            <div itemScope itemType="http://schema.org/Organization">
                <Helmet>
                    <meta charSet="utf-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <meta name="theme-color" content="#000000"/>
                    <title>Контакты - Универсал</title>
                    <meta name="keywords" content="купить хозтовары, хозяйственные товары, бытовые товары, хозяйственно-бытовые товары, товары для дома"/>
                    <meta name="description" content="Товары для дома, хозяйственные товары, спец. одежда и многое другое!"/>
                    <meta property="og:description" content="Множество товаров для дома, хозяйства, авто и многого другого!"/>
                    <meta property="og:title" content="Контакты"/>
                    <meta property="og:url" content="https://universal.tom.ru/contact"/>
                </Helmet>
                <h1>Контакты</h1>
                <p className={'text-left'}>
                    <i className={'fa fa-map-marker'}> <span itemProp="streetAddress">Адрес: г. Томск, ул. Бердская, 31 (пер. Пойменный 5)</span></i><br/>
                    <i className={'fa fa-phone'}> <span><a href={'tel:+7 (3822) 909291'} itemProp="telephone">90-92-91</a>, <a href={'tel:+7 (3822) 90-44-32'} itemProp="telephone">90-44-32</a>, <a href={'tel:+7 (3822) 902-668'} itemProp="telephone">902-668</a></span></i><br/>
                    <i className={'fa fa-envelope'}> <span><a href="mailto:razov@mail.tomsknet.ru" itemProp="email">razov@mail.tomsknet.ru</a></span></i>
                </p>

                <h3>О компании</h3>
                <p className={'text-left'}>
                    Основным направлением нашей деятельности является оптовая торговля товарами народного потребления: посуда, хозяйственные товары, инструменты. Наша цель - предоставление качественных товаров широкого ассортимента по разумным ценам.<br/><br/>
                    Большое количество товарных групп, низкие цены, взаимовыгодные условия работы, внимательное отношение к покупателям способствует росту и развитию компании.<br/><br/>
                    Мы не собираемся останавливаться на достигнутом, постоянно совершенствуем наши знания и опыт, расширяя ассортимент предлагаемых товаров.<br/><br/>
                    Приглашаем к сотрудничеству!
                </p>
                <br/>
                <hr/>
                <br/>
                <YMaps>
                    <div className={'map'}>
                        <Map defaultState={{ center: [56.51271706822828,84.94996649999996], zoom: 16 }}
                             style={{width: '80%', margin: '0 auto', height: '80vh'}}>
                            <GeolocationControl/>
                            <SearchControl/>
                            <ZoomControl/>
                            <GeoObject
                                // The geometry description.
                                geometry={{
                                    type: 'Point',
                                    coordinates: [56.51271706822828,84.94996649999996],
                                }}
                                // Properties.
                                properties={{
                                    // The placemark content.
                                    iconContent: 'Мы здесь',
                                    hintContent: 'ООО "Компания Универсал"',
                                }}
                                // Options.
                                options={{
                                    // The placemark's icon will stretch to fit its contents.
                                    preset: 'islands#blackStretchyIcon',
                                    // The placemark can be moved.
                                    draggable: false,
                                }}
                            />
                        </Map>

                    </div>
                </YMaps>
            </div>
        );
    }
}

export default Contact;
