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
            viewCount: 30,
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

    handleGet(cat)
    {
        let _this = this;
        if (cat === 'search') {
            request(
                'product/search',
                'POST',
                {data: this.props.location.search.substr(3)},
                {},
                function (response) {
                    _this.setState({products: response});
                },
            );
        }
        else {
            request(
                'product/' + cat,
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
                <h1>Товары:</h1>
                <div className="row">
                    {this.state.products.length > 0 ? this.state.products.map((item, key) => {
                        if (key < this.state.viewCount) {
                            return (
                                <div className="col-md-4" style={{paddingBottom: '10px'}}>
                                    <Card item={item} key={item.id} update={this.updateFav}
                                          favorite={this.isFavorite(item) ? true : false}/>
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
