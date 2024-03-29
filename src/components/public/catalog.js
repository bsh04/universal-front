import React, {Component} from 'react';

import request from "../../services/ajaxManager";

import {connect} from "react-redux";
import {withRouter} from "react-router";

import {CategoriesContext} from '../../services/contexts';
import { MainCatalogItem } from './parts/main_catalog/MainCatalogItem';
import { Carousel } from './parts/carousel/Carousel';
import ProductCard from './parts/product/ProductCard';

class Catalog extends Component {
    constructor(props) {
        super(props);

        this.isFavorite = this.isFavorite.bind(this);
        this.updateFav = this.updateFav.bind(this);

        this.state = {
            products: {
                new: [],
                stock: [],
                season: [],
                produced: [],
                popular: []
            },
            favorites: []
        }
    }

    componentDidMount() {
        this.getProducts('new');
        this.getProducts('stock');
        //this.getProducts('season');
        //this.getProducts('produced');
        //this.getProducts('popular');
    }
    
    getProducts = (path) => {
        let _this = this;

        request(
            `product/${path}`,
            'GET',
            {},
            {},
            function(response) {
                /* if(!response.data) {
                    return null
                } */
                
                let obj = {
                    [path]: response
                }
                
                _this.setState({
                    products: { ..._this.state.products, ...obj}
                });
            },
            function(err) {}
        )

    }

    getFavorites() {
        if (this.props.token !== false) {

            let _this = this;

            request(
                'product/favorite',
                'GET',
                null,
                {},
                function (response) {
                    _this.setState({favorites: response});
                },
            );
        }
    }


    updateFav(obj) {
        let arr = this.state.favorites;
        let result;

        if (this.isFavorite(obj)) {
            result = this.state.favorites.filter(item => {
                return obj.id !== item.id;
            });
        } else {
            result = arr;
            result.push(obj);
        }

        this.setState({favorites: result});
    }

    isFavorite(obj) {
        let result = this.state.favorites.filter(item => {
            return obj.id === item.id;
        });

        return result.length > 0;
    }


    render() {

        
        return <CategoriesContext.Consumer>{contextValue => {
            let {categories} = contextValue;
            let {isMobile} = contextValue;
            
            categories = categories.filter(item => !Object.keys(this.state.products).find(key => item.id === key));
            
            return (
                <div className="w-100">
                    <h3 className="page-title">Каталог</h3>
                    
                    <div className="main-catalog-list">
                        <MainCatalogItem item={{title: "НАШЕ ПРОИЗВОДСТВО", id: 'workshop'}} to="/workshop"/>
                        {categories.map(item => {
                            return (
                                <MainCatalogItem item={item} key={item.id}/>
                            );
                        })}
                    </div>

                    { this.state.products.stock.length > 0 ?
                    <Carousel 
                        length={isMobile ? 1 : 6} 
                        isMobile={isMobile} 
                        title={{text: 'Акционные товары', link: 'catalog/stock'}}
                        titleIcon={'stock'}
                        interval={4000}
                    >
                        {this.state.products.stock.map((item, key) => {
                            return (
                                <ProductCard item={item} key={'stock' + item.id} update={this.updateFav}
                                    favorite={this.isFavorite(item) ? true : false}
                                />
                            );
                        })}
                    </Carousel>
                    : null}

                    { this.state.products.popular.length > 0 ?
                    <Carousel 
                        length={isMobile ? 1 : 6}
                        isMobile={isMobile} 
                        title={{text: 'Популярные товары', link: 'catalog/popular'}}
                        titleIcon={'popular'}
                    >
                        {this.state.products.new.map((item, key) => {
                            return (
                                <ProductCard item={item} key={('new' + item.id )} update={this.updateFav}
                                    favorite={this.isFavorite(item) ? true : false}
                                />
                            );
                        })}
                    </Carousel>
                    : null}

                    { this.state.products.season.length > 0 ?
                    <Carousel 
                        length={isMobile ? 1 : 6}
                        isMobile={isMobile}
                        title={{text: 'Сезонные товары', link: 'catalog/season'}}
                        titleIcon={'season'}
                    >
                        {this.state.products.season.map((item, key) => {
                            return (
                                <ProductCard item={item} key={'season' + item.id} update={this.updateFav}
                                    favorite={this.isFavorite(item) ? true : false}
                                />
                            );
                        })}
                    </Carousel>
                    : null}

                    { this.state.products.produced.length > 0 ?
                    <Carousel 
                        length={isMobile ? 1 : 6}
                        isMobile={isMobile}
                        title={{text: 'Товары собственного производства', link: 'catalog/produced'}} 
                        titleIcon={'produced'}
                    >
                        {this.state.products.produced.map((item, key) => {
                            return (
                                <ProductCard item={item} key={'produced' + item.id} update={this.updateFav}
                                    favorite={this.isFavorite(item) ? true : false}
                                />
                            );
                        })}
                    </Carousel>
                    : null}
                </div>
            );
        }}
        </CategoriesContext.Consumer>
    }
}

export default withRouter(connect(
    (state, ownProps) => ({
        token: state.token,
    }),
    dispatch => ({})
)(Catalog));