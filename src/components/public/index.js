import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Helmet} from "react-helmet";

import request from "../../services/ajaxManager";

import {connect} from "react-redux";
import {withRouter} from "react-router";


import { CategoriesContext } from '../../services/contexts';
import { Carousel } from './parts/carousel/Carousel';
import ProductCard from './parts/product/ProductCard';
import { MainBanner } from './parts/banners/main_banner';


class Index extends Component {
    constructor(props) {
        super(props);

        this.isFavorite = this.isFavorite.bind(this);
        this.updateFav = this.updateFav.bind(this);

        this.state = {
            products: {
                new: [],
                stock: [],
                season: [],
                produced: []
            },
            favorites: [],

            showCatalogOutMenu: true,
        }
    }

    componentDidMount() {
        this.getProducts('new');
        this.getProducts('stock');
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
                const {categories} = contextValue;
                let {isMobile} = contextValue;
                return (
                    <div className="w-100">
                        <Helmet>
                            <meta charSet="utf-8"/>
                            <meta name="viewport" content="width=device-width, initial-scale=1"/>
                            <meta name="theme-color" content="#000000"/>
                            <title>Главная - Универсал</title>
                            <meta name="keywords" content="купить хозтовары, хозяйственные товары, бытовые товары, хозяйственно-бытовые товары, товары для дома"/>
                            <meta name="description" content="Товары для дома, хозяйственные товары, спец. одежда и многое другое!"/>
                            <meta property="og:description" content="Множество товаров для дома, хозяйства, авто и многого другого!"/>
                            <meta property="og:title" content="Главная"/>
                            <meta property="og:url" content="https://universal.tom.ru/"/>
                        </Helmet>
                        
                        <div className="index-page w-100">
                            <MainBanner 
                                promoName={'promo1'}
                                textSmall={'Успейте сделать покупку'}
                                textBig={'Панели ПВХ скидка 15%'}
                            />

                            { this.state.products.stock.length > 0 ?
                            <Carousel 
                                length={isMobile ? 1 : 6} 
                                isMobile={isMobile} 
                                title={'Акционные товары'} 
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

                            { this.state.products.new.length > 0 ?
                            <Carousel 
                                length={isMobile ? 1 : 6}
                                isMobile={isMobile} 
                                title={'Популярные товары'}
                                titleIcon={'new'}
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
                                title={'Сезонные товары'}
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
                                title={'Товары собственного производства'}
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
                    </div>
                )
            }
        }
        </CategoriesContext.Consumer>
    }
    
}

export default withRouter(connect(
    (state, ownProps) => ({
        token: state.token,
    }),
    dispatch => ({})
)(Index));