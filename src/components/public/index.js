import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Helmet} from "react-helmet";

import request from "../../services/ajaxManager";

import {connect} from "react-redux";
import {withRouter} from "react-router";


import {CategoriesContext} from '../../services/contexts';
import {Carousel} from './parts/carousel/Carousel';
import ProductCard from './parts/product/ProductCard';
import {MainBanner} from './parts/banners/main_banner';


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
                produced: [],
                popular: []
            },
            favorites: [],
            stocks: [],
            showCatalogOutMenu: true,
        }
    }

    getNews() {
        let _this = this;

        request(
            `news/stocks`,
            'GET',
            {},
            {},
            function (response) {
                _this.setState({stocks: response.data});

            },
            function (err) {
                alert('Ошибка запроса', 'Ошибка запроса списка акций')
            }
        )
    }

    componentDidMount() {
        this.getNews();
        this.getProducts('new');
        this.getProducts('stock');
        this.getProducts('produced');
        this.getProducts('season');
        this.getProducts('popular');
    }

    getProducts = (path) => {
        let _this = this;

        request(
            `product/${path}`,
            'GET',
            {},
            {},
            function (response) {
                /* if(!response.data) {
                    return null
                } */

                let obj = {
                    [path]: response
                }

                _this.setState({
                    products: {..._this.state.products, ...obj}
                });
            },
            function (err) {
            }
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
                        <meta name="keywords"
                              content="купить хозтовары, хозяйственные товары, бытовые товары, хозяйственно-бытовые товары, товары для дома"/>
                        <meta name="description"
                              content="Товары для дома, хозяйственные товары, спец. одежда и многое другое!"/>
                        <meta property="og:description"
                              content="Множество товаров для дома, хозяйства, авто и многого другого!"/>
                        <meta property="og:title" content="Главная"/>
                        <meta property="og:url" content="https://universal.tom.ru/"/>
                    </Helmet>

                    <div className="index-page w-100">
                        {this.state.stocks.length > 0 ?
                            <Carousel
                                banner={true}
                                length={1}
                                isMobile={isMobile}
                                interval={5000}
                            >
                                {this.state.stocks.map((item, key) => {
                                    return <MainBanner
                                        key={key}
                                        item={item}
                                        isMobile={isMobile}
                                        onLinkClick={() => this.props.history.push(item.link)}
                                    />
                                })}
                            </Carousel>
                            : null}

                        {this.state.products.stock.length > 1 ?
                            <Carousel
                                length={isMobile ? 1 : 6}
                                isMobile={isMobile}
                                title={{text: 'Акционные товары', link: 'catalog/stock'}}
                                titleIcon={'stock'}
                                interval={10000}
                            >
                                {this.state.products.stock.map((item, key) => {
                                    if (key !== this.state.products.stock.length - 1) {
                                        return (
                                            <ProductCard item={item} key={'stock' + item.id} update={this.updateFav}
                                                         favorite={this.isFavorite(item) ? true : false}
                                            />
                                        );
                                    }
                                })}
                            </Carousel>
                            : null}

                        {this.state.products.popular.length > 1 ?
                            <Carousel
                                length={isMobile ? 1 : 6}
                                isMobile={isMobile}
                                title={{text: 'Популярные товары', link: 'catalog/popular'}}
                                titleIcon={'new'}
                                interval={7000}
                            >
                                {this.state.products.popular.map((item, key) => {
                                    if (key !== this.state.products.popular.length - 1) {
                                        return (
                                            <ProductCard item={item} key={('new' + item.id + key).toString()}
                                                         update={this.updateFav}
                                                         favorite={this.isFavorite(item) ? true : false}
                                            />
                                        );
                                    }
                                })}
                            </Carousel>
                            : null}

                        {this.state.products.season.length > 0 ?
                            <Carousel
                                length={isMobile ? 1 : 6}
                                isMobile={isMobile}
                                title={{text: 'Сезонные товары', link: 'catalog/season'}}
                                titleIcon={'season'}
                                interval={8500}
                            >
                                {this.state.products.season.map((item, key) => {
                                    if (key !== this.state.products.season.length - 1) {
                                        return (
                                            <ProductCard item={item} key={'season' + item.id} update={this.updateFav}
                                                         favorite={this.isFavorite(item) ? true : false}
                                            />
                                        );
                                    }
                                })}
                            </Carousel>
                            : null}

                        {this.state.products.produced.length > 0 ?
                            <Carousel
                                length={isMobile ? 1 : 6}
                                isMobile={isMobile}
                                title={{text: 'Товары собственного производства', link: 'catalog/produced'}}
                                titleIcon={'produced'}
                                interval={6000}
                            >
                                {this.state.products.produced.map((item, key) => {
                                    if (key !== this.state.products.produced.length - 1) {
                                        return (
                                            <ProductCard item={item} key={'produced' + item.id} update={this.updateFav}
                                                         favorite={this.isFavorite(item) ? true : false}
                                            />
                                        );
                                    }
                                })}
                            </Carousel>
                            : null}

                        {this.state.products.new.length > 0 ?
                            <Carousel
                                length={isMobile ? 1 : 6}
                                isMobile={isMobile}
                                title={{text: 'Новинки', link: 'catalog/new'}}
                                titleIcon={'new'}
                                interval={7500}
                            >
                                {this.state.products.new.map((item, key) => {
                                    if (key !== this.state.products.new.length - 1) {
                                        return (
                                            <ProductCard item={item} key={'new' + item.id} update={this.updateFav}
                                                         favorite={this.isFavorite(item) ? true : false}
                                            />
                                        );
                                    }
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