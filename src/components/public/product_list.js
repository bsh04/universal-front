import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import request from "../../services/ajaxManager";
import {connect} from "react-redux";
import { withRouter } from "react-router";
import {Helmet} from "react-helmet";

import Card from './parts/card';

class ProductList extends Component {
    constructor(props) {
        super(props);

        this.isFavorite = this.isFavorite.bind(this);
        this.updateFav= this.updateFav.bind(this);

        this.state = {
            products: [],
            favorites: [],
            cardView: 'tile',
            viewCount: 30,
            limit: 50,
            sort: ['title', 'asc'],
            request: false,
        };
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

    componentWillReceiveProps(props) {
        this.setState({viewCount: 30});
        this.handleGet(props.match.params.category);
    }

    handleGet(cat) {
        console.log('from product list:',cat)
        let obj = {
            cat: cat,
            limit: this.state.limit,
            sort_field: `${this.state.sort[0]}`,
            sort: `${this.state.sort[1]}`
        }
        let str = "";
        for(let key in obj) {
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
                    'product/search',
                    'POST',
                    {
                        data: (/%[0-9a-f]{2}/i.test(this.props.location.search.substr(3)) ?
                            decodeURI(this.props.location.search.substr(3)) :
                            this.props.location.search.substr(3))
                    },
                    {},
                    function (response) {
                        _this.setState({products: response, request: false});
                    },
                );
            }
        }
        else {
            request(
                'product/' + cat + '?' + str + (this.props.match.params.search ? '&data=' + this.props.match.params.search : ''),
                'GET',
                null,
                {},
                function (response) {
                    _this.setState({products: response});
                },
            );
        }
    }

    updateFav(obj) {
        let arr = this.state.favorites;
        let result;

        if (this.isFavorite(obj)) {
            result =  this.state.favorites.filter(item => {
                return obj.id !== item.id;
            });
        }
        else {
            result = arr;
            result.push(obj);
        }

        this.setState({favorites: result});
    }

    isFavorite(obj) {
        let result =  this.state.favorites.filter(item => {
            return obj.id === item.id;
        });

        return result.length > 0;
    }

    setLimit = (e) => {
        let limit = e.target.getAttribute('data');
        this.setState({
            limit: limit
        }, () => {this.handleGet(this.props.match.params.category)})
    }
    setSort = (e) => {
        let sort = e.target.getAttribute('data').split(',');
        this.setState({
            sort: sort
        }, () => {this.handleGet(this.props.match.params.category)})
    }

    sortSelectedLabel() {
        let param = this.state.sort.join('-')

        switch(param) {
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

    render() {
        return (
            <div>
                <Helmet>
                    <meta charSet="utf-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <meta name="theme-color" content="#000000"/>
                    <title>Каталог - Универсал</title>
                    <meta name="keywords" content="купить хозтовары, хозяйственные товары, бытовые товары, хозяйственно-бытовые товары, товары для дома"/>
                    <meta name="description" content="Товары для дома, хозяйственные товары, спец. одежда и многое другое!"/>
                    <meta property="og:description" content="Множество товаров для дома, хозяйства, авто и многого другого!"/>
                    <meta property="og:title" content="Каталог"/>
                    <meta property="og:url" content="https://universal.tom.ru/catalog/*"/>
                </Helmet>
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
                                        <span className="products-toolbar-item__selected">{this.state.limit ? this.state.limit : 'Все'}</span>
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                        <a className="dropdown-item" href="#" data="50"
                                            onClick={(e) => this.setLimit(e)}>50</a>
                                        <a className="dropdown-item" href="#" data="100"
                                            onClick={(e) => this.setLimit(e)}>100</a>
                                        <a className="dropdown-item" href="#" data={null}
                                            onClick={(e) => this.setLimit(e)}>Все</a>
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
                                        <span className="products-toolbar-item__selected">{this.sortSelectedLabel()}</span>
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
                <div className="row">
                    {this.state.products.length > 0 ? this.state.products.map((item, key) => {
                        if (key < this.state.viewCount) {
                            return (
                                <div className={this.state.cardView === 'tile' ? "col-md-3" : 'col-md-12'} 
                                      style={{paddingBottom: '10px'}} 
                                      key={key}>
                                    <Card item={item} key={item.id} update={this.updateFav}
                                          favorite={this.isFavorite(item) ? true : false}
                                          cardView={this.state.cardView}/>
                                </div>
                            );
                        }
                        else {
                            return;
                        }
                    }) : <p className={'text-center'}>Товары не найдены</p>}
                </div>
                { this.state.viewCount < this.state.products.length ?
                    <button className={'btn btn-success'}
                            onClick={() => {this.setState({viewCount: (this.state.viewCount + 30)})}}>
                        <i className={'fa fa-cloud-download-alt'}> <span>Загрузить еще</span></i>
                    </button> : null }
            </div>
        );
    }
}

export default withRouter(connect(
    (state, ownProps) => ({
        token: state.token,
    }),
    dispatch => ({})
)(ProductList));
