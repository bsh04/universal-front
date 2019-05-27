import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import request from "../../services/ajaxManager";
import {connect} from "react-redux";
import { withRouter } from "react-router";

import Card from './parts/card';

class ProductList extends Component {
    constructor(props) {
        super(props);

        this.isFavorite = this.isFavorite.bind(this);
        this.updateFav= this.updateFav.bind(this);

        this.state = {
            products: [],
            favorites: [],
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
        this.handleGet(props.match.params.category);
    }

    handleGet(cat)
    {
        let _this = this;
        request(
            'product/' + cat,
            'GET',
            null,
            {},
            function (response)
            {
                _this.setState({products: response});
            },
        );
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
                <h1>Товары:</h1>
                <div className="card-columns">
                    {this.state.products.map((item) => {
                        return (
                            <Card item={item} key={item.id} update={this.updateFav}
                                  favorite={this.isFavorite(item) ? true : false}/>
                        );
                    })}
                </div>
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
