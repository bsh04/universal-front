import React, {Component} from 'react';

import request from "../../services/ajaxManager";

import {CategoriesContext} from '../../services/contexts';
import { MainCatalogItem } from './parts/main_catalog/MainCatalogItem';
import { Carousel } from './parts/carousel/Carousel';

class Catalog extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return <CategoriesContext.Consumer>{contextValue => {
            const {categories} = contextValue;

            return (
                <div>
                    <h3 className="page-title">Каталог</h3>
                    
                    <div className="main-catalog-list">
                        {categories.map(item => {
                            return (
                                <MainCatalogItem item={item} key={item.id}/>
                            );
                        })}
                    </div>

                    <Carousel length={6} title={'Товары по акции'}>
                        {categories.map(item => {
                            return (
                                <MainCatalogItem item={item} key={item.id}/>
                            );
                        })}
                    </Carousel>
                </div>
            );
        }}
        </CategoriesContext.Consumer>
    }
}

export default Catalog;
