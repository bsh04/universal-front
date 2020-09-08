import React, { Component } from 'react';

import balloon from '../../../images/map_balloon.png';

import { YMaps, Map, Placemark, withYMaps } from 'react-yandex-maps';

class TemplateProvider extends Component {
    constructor() {
        super();
        this.state = { 
            template: null,
            
        };
    }
  
    componentDidMount() {
        this.setState({
            template: this.props.ymaps.templateLayoutFactory.createClass(
                `<div class="user-balloon__wrapper">
                    
                    <span class="user-balloon">Томск, ул. Бердская, 31 (пер. Пойменный 5)</span>
                </div>
                `
            ),
        });

      
    }
  
    render() {
        return this.props.children({ template: this.state.template });
    }
}

const ConnectedTemplateProvider = withYMaps(TemplateProvider, true, [
    'templateLayoutFactory',
]);

export const MapSection_ = () => {
    const mapState = {
        coordinates: [
            [56.512946, 84.949956],
            [56.512946, 84.949956]
        ],
        mapData: {
            center: [56.512946, 84.949956],
            zoom: 17
        }
    }


    return (
        <div className="map-section">
            <YMaps>
                <ConnectedTemplateProvider>
                    {({ template }) => (
                        <Map 
                            state={mapState.mapData}
                            width={'100%'}
                            height={450}
                        >
                            {mapState.coordinates.map((coordinate, index) => {
                                return <Placemark
                                    key={(coordinate[0] * index).toString()}
                                    geometry={coordinate}
                                    options={{
                                        balloonLayout: template,
                                        iconLayout: 'default#image',
                                        iconImageHref: balloon,
                                        iconImageSize: [30, 40],
                                        iconImageOffset: [-20, -45],
                                        draggable: true,
                                        hasBaloon: true,
                                        openBalloon: true,
                                    }}
                        
                                    // Load balloon addon for all geo objects
                                    modules={['geoObject.addon.balloon']}
                                    instanceRef={ref => {
                                        ref && ref.balloon.open();
                                    }}
                                />
                            })}
                            
                        </Map>
                    )}
                </ConnectedTemplateProvider>
            </YMaps>
        </div>
    )
}