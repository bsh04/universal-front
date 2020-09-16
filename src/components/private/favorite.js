import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import request from '../../services/ajaxManager';
import {connect} from "react-redux";

import Breadcrumbs from '../breadcrumbs'
import ProductCard from "../public/parts/product/ProductCard";
import CircularProgress from "@material-ui/core/CircularProgress";
import Pagination from "../pagination";

class Favorite extends Component {
    constructor(props) {
        super(props);

        this.handleBasketAdd = this.handleBasketAdd.bind(this);

        this.getSizeWindow = this.getSizeWindow.bind(this)
        window.addEventListener('resize', this.getSizeWindow)

        this.state = {
            favorites: [],
            form: [],
            cardView: 'tile',
            ready: false,
            numberItems: null
        };
    }

    getSizeWindow() {

    }

    componentDidMount() {
        this.handleGet();
    }

    handleGet() {
        let _this = this;
        request(
            'product/favorite',
            'GET',
            null,
            {},
            function (response) {
                _this.setState({favorites: response, ready: true, numberItems: response.length});
            },
        );
    }

    handleDelete = (key) => {
        let data = {
            id: this.state.favorites[key].id,
        };

        let _this = this;

        request(
            'product/favorite',
            'DELETE',
            data,
            {},
            function (response) {
                let arr = _this.state.favorites;
                arr.splice(key, 1);
                _this.setState({favorites: arr});
                _this.props.onReloadMenu();
                _this.setState({numberItems: arr.length})
            },
            this.state.errorCallback
        );
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

    handleBasketAdd(key) {
        let data = {
            product: this.state.favorites[key].id,
            count: this.countInput.value,
        };

        let _this = this;

        request(
            'product/basket',
            'POST',
            data,
            {},
            function (response) {
                let form = _this.state.form;
                form.push(_this.state.favorites[key].id);
                _this.setState({message: response.message, form: form});
            },
            this.state.errorCallback
        );
    }

    handleRenderList = (start, end) => {
        this.setState({start, end})
    }

    render() {
        return (
            <div className='favorite'>
                <Breadcrumbs
                    path={[
                        {title: 'Избранные товары'}
                    ]}/>
                <h4>Избранное</h4>
                <div className='favorite-body'>
                    {this.state.favorites.length > 0 ? this.state.favorites.map((item, key) => {
                        if ((key >= this.state.start) && (key <= this.state.end)) {
                            return (
                                <div className='favorite-item' id='favorite-item' key={key}>
                                    <ProductCard item={item} index={key} update={this.updateFav}
                                                 favorite={this.isFavorite(item)}
                                                 cardView={this.state.cardView}
                                                 page={'favorite'}
                                                 handleDelete={this.handleDelete}
                                    />
                                </div>
                            );
                        }
                    }) : this.state.ready ?
                        <p>Список избранных пуст</p>
                        :
                        <CircularProgress/>
                    }
                </div>
                <div>
                    {
                    }
                    {
                        this.state.numberItems > 0
                            ?
                            <Pagination handleRenderList={this.handleRenderList}
                                        numberItems={this.state.numberItems - 1} offset={15}/>
                            :
                            null
                    }
                </div>
            </div>
        );
    }
}

export default withRouter(connect(
    (state, ownProps) => ({
        token: state.token,
    }),
    dispatch => ({
        onReloadMenu: () => {
            dispatch({type: 'RELOAD', payload: true})
        },
    })
)(Favorite));
