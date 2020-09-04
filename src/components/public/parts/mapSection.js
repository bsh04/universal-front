import React, { Component } from 'react';

import balloon from '../../../images/map_balloon.png';

import { YMaps, Map, Placemark } from 'react-yandex-maps';


export default class MapSection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            coordinates: [
                [56.512946, 84.949956]
            ],
            mapData: {
                center: [56.512946, 84.949956],
                zoom: 17
            }
        }
    }


    render() {
        return (
            <YMaps>
            <div className="map-section">
                <Map 
                    defaultState={this.state.mapData} 
                    width={'100%'}
                    height={450}
                >
                    {this.state.coordinates.map((coordinate, key) => {
                            return <Placemark key={key.toString()}
                                        geometry={coordinate}
                                        properties={{
                                            iconContent: '',
                                            
                                            balloonContentBody: 'Томск, ул. Бердская, 31 (пер. Пойменный 5)',
                                            hintContent: 'Томск, ул. Бердская, 31 (пер. Пойменный 5) '
                                        }}
                                        
                                        options={{
                                            iconLayout: 'default#image',
                                            iconImageHref: balloon,
                                            iconImageSize: [30, 40],
                                            iconImageOffset: [-20, -45],
                                            draggable: false,
                                            hasBaloon: true,
                                            openBalloon: true,
                                        }}
                                        modules={
                                            ['geoObject.addon.balloon', 'geoObject.addon.hint']
                                        }
                                    />
                        }
                    )}
                </Map>
                
            </div>
            </YMaps>
        )
    }
}