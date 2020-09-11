import React, {Component} from 'react';

import request from "../../services/ajaxManager";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {Helmet} from "react-helmet";
import Breadcrumbs from '../breadcrumbs';
import Loading from '../loading';
import {CategoriesContext} from '../../services/contexts';

import Card from './parts/card';
import ProductCard from './parts/product/ProductCard';
import { SubCategoriesRow } from './parts/SubCategoriesRow';

class ProductList extends Component {
    constructor(props) {
        super(props);

        this.isFavorite = this.isFavorite.bind(this);
        this.updateFav = this.updateFav.bind(this);

        this.state = {
            loading: false,
            limitAll: false,
            totalItems: 50,
            products: [],
            favorites: [],
            cardView: 'tile',
            limit: 50,
            offset: 0,
            catList: [],
            sort: ['title', 'asc'],
            request: false,
            path: null
        };
    }

    loadMore() {
        if (this.productListInnerContainer.getBoundingClientRect().bottom + 50 < window.innerHeight && this.state.limitAll && this.state.products.length < this.state.totalItems) {

            this.setState({
                loading: true,
                limit: (this.state.limit + 50)
            }, () => this.handleGet(this.props.match.params.category))
        }
    }

    setCategory(cat) {
        if (cat === 'new') {
            return 'Новые товары';
        } else if (cat === 'stock') {
            return 'Товары по акции';
        } else if (this.state.products && this.state.products[0]) {
            return this.state.products[0].category.title;
        }
    }

    componentWillMount() {
        this.handleGet(this.props.match.params.category);

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

    componentWillUnmount() {
        window.removeEventListener("scroll", this.loadMore.bind(this));
    }

    componentWillReceiveProps(props) {
        this.handleGet(props.match.params.category);

        let path = this.setCategory(props.match.params.category)
        this.setState({
            path: path
        })
    }

    handleGet(cat) {
        let obj = {
            cat: cat,
            limit: this.state.limit,
            sort_field: `${this.state.sort[0]}`,
            sort: `${this.state.sort[1]}`,
            offset: this.state.offset
        }
        let str = "";
        for (let key in obj) {
            if (str != "") {
                str += "&";
            }
            str += key + "=" + encodeURIComponent(obj[key]);
        }

        let _this = this;
        let res;
        if (cat === 'search') {
            if (!this.state.request && this.props.location.search.length > 0) {
                this.setState({request: true});
                request(
                    'product/search' + '?' + str + (this.props.match.params.search ? '&data=' + this.props.match.params.search : ''),
                    'POST',
                    {
                        data: (/%[0-9a-f]{2}/i.test(this.props.location.search.substr(3)) ?
                            decodeURI(this.props.location.search.substr(3)) :
                            this.props.location.search.substr(3))
                    },
                    {},
                    function (response) {
                        let totalItems = response[response.length - 1].count;

                        response.splice(-1, 1);
                        _this.setState({products: response, catList: [], totalItems: totalItems, request: false});
                    },
                );
            }
        } else {
            request(
                'product/' + cat + '?' + str + (this.props.match.params.search ? '&data=' + this.props.match.params.search : ''),
                'GET',
                null,
                {},
                function (response) {

                    let totalItems = response[response.length - 1].count;

                    response.splice(-1, 1);
                    let categories = [];
                    response.map(item => {
                        let tmp = {id: item.category.id, title: item.category.title}
                        if (categories.find((element) => {
                            return tmp.id === element.id
                        }) === undefined) {
                            categories.push(tmp);
                        }
                    });
                    _this.setState({products: response}, () => {
                        _this.setState({
                            path: _this.setCategory(_this.props.match.params.category),
                            totalItems: totalItems,
                            loading: false,
                        })
                    });
                }
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

    setLimit = (e, all = false) => {
        let limit = e.target.getAttribute('data');
        this.setState({
            limit: limit,
            offset: 0,
            limitAll: all
        }, () => {
            this.handleGet(this.props.match.params.category)
        });
        if (all) {
            window.addEventListener("scroll", this.loadMore.bind(this));
        }

    }
    setSort = (e) => {
        let sort = e.target.getAttribute('data').split(',');
        this.setState({
            sort: sort
        }, () => {
            this.handleGet(this.props.match.params.category)
        })
    }

    sortSelectedLabel() {
        let param = this.state.sort.join('-')

        switch (param) {
            case 'title-asc':
                return 'названию А-Я'
            case 'title-desc':
                return 'названию Я-А'
            case 'price-asc':
                return 'цене по возрастанию'
            case 'price-desc':
                return 'цене по убыванию'
        }
    }

    paginationItems() {
        let arr = new Array(Math.ceil(this.state.totalItems / this.state.limit)).fill('');

        return arr.map((item, key) => {
            return (
                <li key={key} className="page-item">
                    <a className="page-link" href="#" onClick={() => this.setState({offset: (this.state.limit * key)})}>
                        {key + 1}
                    </a>
                </li>
            )
        });
    }

    render() {
        return (
            <CategoriesContext.Consumer>
                {contextValue => {
                
                let catList = [];
                
                if(contextValue && contextValue.length > 0 && this.props.match.params.category !== 'new' 
                    && this.props.match.params.category !== 'stock' && this.props.match.params.category !== 'search'){

                    let obj = contextValue.find(item => item.id === this.props.match.params.category);
                    
                    if(obj && obj.children !== undefined){
                        catList = obj.children;

                    } else {
                        let obj = contextValue.find(item => {
                            if(item.children !== undefined && item.children.length > 0
                                && item.children.find(item => item.id === this.props.match.params.category)) {
                                    return item;
                            }
                        });
                        catList = obj.children;
                    }

                } else {
                    catList = this.state.catList;
                }
                    
                return <div>
                <Helmet>
                    <meta charSet="utf-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <meta name="theme-color" content="#000000"/>
                    <title>Каталог - Универсал</title>
                    <meta name="keywords"
                          content="купить хозтовары, хозяйственные товары, бытовые товары, хозяйственно-бытовые товары, товары для дома"/>
                    <meta name="description"
                          content="Товары для дома, хозяйственные товары, спец. одежда и многое другое!"/>
                    <meta property="og:description"
                          content="Множество товаров для дома, хозяйства, авто и многого другого!"/>
                    <meta property="og:title" content="Каталог"/>
                    <meta property="og:url" content="https://universal.tom.ru/catalog/*"/>
                </Helmet>

                {this.state.path && this.state.products.length > 0
                    ?
                    <Breadcrumbs
                        path={[{title: 'Каталог', link: '/catalog'}].concat(
                            this.props.match.params.category !== 'new'
                            && this.props.match.params.category !== 'stock'
                            && this.state.products[0].category.parent
                            && this.state.products[0].category.parent.id !== this.props.match.params.category ?
                                [{
                                    title: this.state.products[0].category.parent.title,
                                    link: ('/catalog/' + this.state.products[0].category.parent.id)
                                }] : [],
                            [
                                this.state.products[0].category.parent
                                && this.state.products[0].category.parent.id === this.props.match.params.category ?
                                    {title: this.state.products[0].category.parent.title} :
                                    {title: this.state.path}]
                        )}/>
                    : null}

                {this.props.match.params.category !== 'new' && this.props.match.params.category !== 'stock'
                && this.props.match.params.category !== 'search' && catList.length > 0 ?
                    <SubCategoriesRow catList={catList} location={this.props.location}/> 
                : null}

                <div className="products-toolbar mb-2 col-12">
                    <ul className="products-toolbar-group row justify-content-between" style={{paddingRight: 0}}>
                        <ul className="row col-xl-3 col-lg-3 col-md-3 col-sm-12 justify-content-center">
                            <li className="products-toolbar-item mr-2">
                                <a href="#"
                                   className={this.state.cardView === 'tile' ? 'text-success' : 'text-secondary'}
                                   onClick={() => {
                                       this.setState({
                                           cardView: 'tile'
                                       })
                                   }}>
                                    <i className="fa fa-th"></i>
                                </a>
                            </li>
                            <li className="products-toolbar-item">
                                <a href="#"
                                   className={this.state.cardView === 'list' ? 'text-success' : 'text-secondary'}
                                   onClick={() => {
                                       this.setState({
                                           cardView: 'list'
                                       })
                                   }}>
                                    <i className="fa fa-list"></i>
                                </a>
                            </li>
                        </ul>
                        
                        <ul className="row col-xl-8 col-lg-8 col-md-8 col-sm-12 justify-content-center">
                            <li className="products-toolbar-item mr-1">
                                <div className="dropdown">
                                    <span className="products-toolbar-item__text">Товаров на странице: </span>
                                    <a className="dropdown-toggle"
                                       href="#"
                                       role="button"
                                       id="dropdownMenuLink"
                                       data-toggle="dropdown"
                                       aria-haspopup="true"
                                       aria-expanded="false">
                                        <span
                                            className="products-toolbar-item__selected">{this.state.limitAll ? 'Все' : this.state.limit}</span>
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                        <a className="dropdown-item" href="#" data="50"
                                           onClick={(e) => this.setLimit(e, false)}>50</a>
                                        <a className="dropdown-item" href="#" data="100"
                                           onClick={(e) => this.setLimit(e, false)}>100</a>
                                        <a className="dropdown-item" href="#" data="50"
                                           onClick={(e) => this.setLimit(e, true)}>Все</a>
                                    </div>
                                </div>

                            </li>
                            <li className="products-toolbar-item mr-1">
                                <div className="dropdown">
                                    <span className="products-toolbar-item__text">Сортировать по: </span>
                                    <a className="dropdown-toggle products-toolbar-item__text"
                                       href="#"
                                       role="button"
                                       id="dropdownMenuLink"
                                       data-toggle="dropdown"
                                       aria-haspopup="true"
                                       aria-expanded="false">
                                        <span
                                            className="products-toolbar-item__selected">{this.sortSelectedLabel()}</span>
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                        <a className="dropdown-item" href="#" data="title,asc"
                                           onClick={(e) => this.setSort(e)}>названию А-Я</a>
                                        <a className="dropdown-item" href="#" data="title,desc"
                                           onClick={(e) => this.setSort(e)}>названию Я-А</a>
                                        <a className="dropdown-item" href="#" data="price,asc"
                                           onClick={(e) => this.setSort(e)}>цене по возрастанию</a>
                                        <a className="dropdown-item" href="#" data="price,desc"
                                           onClick={(e) => this.setSort(e)}>цене по убыванию</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </ul>
                </div>
                
                <div className="row" ref={(target) => this.productListInnerContainer = target}>
                    {this.state.products.length > 0 ? this.state.products.map((item, key) => {
                        if (key < this.state.limit) {
                            return (
                                <ProductCard item={item} key={key} update={this.updateFav}
                                    favorite={this.isFavorite(item) ? true : false}
                                    cardView={this.state.cardView}
                                />
                            );
                        } else {
                            return null;
                        }
                    }) : <p className={'text-center'}>Товары не найдены</p>}
                </div>

                {!this.state.limitAll && parseInt(this.state.limit) < parseInt(this.state.totalItems)
                    ? <nav aria-label="Page navigation example" className="row justify-content-center">
                        <ul className="pagination">
                            <li className="page-item">
                                <a className="page-link" href="#" aria-label="Previous"
                                   onClick={() => {
                                       if (this.state.offset > 0) {
                                           this.setState({
                                               offset: (this.state.offset - this.state.limit)
                                           })
                                       }
                                   }}>
                                    <span aria-hidden="true">&laquo;</span>
                                    <span className="sr-only">Previous</span>
                                </a>
                            </li>

                            {this.paginationItems()}

                            <li className="page-item">
                                <a className="page-link" href="#" aria-label="Next"
                                   onClick={() => {
                                       if (this.state.offset < this.state.totalItems) {
                                           this.setState({
                                               offset: (this.state.offset + this.state.limit)
                                           })
                                       }
                                   }}>
                                    <span aria-hidden="true">&raquo;</span>
                                    <span className="sr-only">Next</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                    : null}
                {this.state.loading ? <Loading/> : null}
            </div>}}
            </CategoriesContext.Consumer>
        );
    }
}

export default withRouter(connect(
    (state, ownProps) => ({
        token: state.token,
    }),
    dispatch => ({})
)(ProductList));
