import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { YMaps, Map, GeoObject, GeolocationControl, SearchControl, ZoomControl } from 'react-yandex-maps';

class Contact extends Component {
    render() {
        return (
            <div>
                <h1>Контакты</h1>
                <p className={'text-left'}>
                    <i className={'fa fa-map-marker'}> Адрес: г. Томск, ул. Бердская, 31 (пер. Пойменный 5)</i><br/>
                    <i className={'fa fa-phone'}> <a href={'tel:+7 (3822) 909291'}>90-92-91</a>, <a href={'tel:+7 (3822) 90-44-32'}>90-44-32</a>, <a href={'tel:+7 (3822) 902-668'}>902-668</a></i><br/>
                    <i className={'fa fa-envelope'}> <a href="mailto:razov@mail.tomsknet.ru">razov@mail.tomsknet.ru</a></i>
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
