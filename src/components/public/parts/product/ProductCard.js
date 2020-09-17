import React, { Component } from 'react';

import {connect} from "react-redux";
import {withRouter} from "react-router";

import { productImageUrl } from '../../../../services/parameters';
import request from '../../../../services/ajaxManager';
import { ProductBasketAdd } from './ProductBasketAdd';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';


class ProductCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cardView: this.props.cardView ? this.props.cardView : 'tile', // tile || list
            form: true,
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.cardView !== this.props.cardView) {
            this.setState({cardView: this.props.cardView})
        }
    }

    renderIcons() {
        let arr = ['stock', 'new', 'produced', 'season' ]
        return arr.map((item, key) => {
            return <i className={`product-card__icons-row-icon product-card__icons-row-icon_${item}`} key={key}/>
        })
    }

    handleFavoriteClick = () => {
        console.log('token',this.props.token)
        if (!this.props.favorite) {
            if (!this.props.token) {
                this.props.onError({
                    show: true,
                    title: 'Необходимо войти в личный кабинет',
                    content: 'Для добавления товара в избранное или корзину необходимо зарегистрироваться и войти в личный кабинет.',
                    btnText: 'OK'
                });
            }
            else {
                let data = {
                    id: this.props.item.id,
                };

                let _this = this;

                request(
                    'product/favorite',
                    'POST',
                    data,
                    {},
                    function (response)
                    {
                        _this.props.onAddFav(_this.props.item);
                        _this.props.update(_this.props.item);
                        _this.props.onReloadMenu();
                    },
                    this.state.errorCallback
                );
            }

        }
        else {
            if (!this.props.token) {
                this.props.onError({
                    show: true,
                    title: 'Необходимо войти в личный кабинет',
                    content: 'Для добавления товара в избранное или корзину необходимо зарегистрироваться и войти в личный кабинет.',
                    btnText: 'OK'
                });
            }
            else {
                let data = {
                    id: this.props.item.id,
                };

                let _this = this;

                request(
                    'product/favorite',
                    'DELETE',
                    data,
                    {},
                    function (response)
                    {
                        _this.props.onRemoveFav(_this.props.item);
                        _this.props.update(_this.props.item);
                        _this.props.onReloadMenu();
                    },
                    this.state.errorCallback
                );
            }
        }
    }

    handleBasketAdd = (count) => {
        if (!this.props.token) {
            this.props.onError({
                show: true,
                title: 'Необходимо войти в личный кабинет',
                content: 'Для добавления товара в избранное или корзину необходимо зарегистрироваться и войти в личный кабинет.',
                btnText: 'OK'
            });
        }
        else {
            let data = {
                product: this.props.item.id,
                count: count,
            };

            let _this = this;

            request(
                'product/basket',
                'POST',
                data,
                {},
                function (response) {
                    _this.setState({message: response.message, form: false});
                    _this.props.onReloadMenu();
                },
                this.state.errorCallback
            );
        }
    }


    render() {
        let { item } = this.props;
        let image = item.photo ? productImageUrl + item.photo : require('../../../../images/image-placeholder.png');
        
        return (
            <div className={`product-card product-card_${this.state.cardView}`}>
                {
                    this.props.page === 'favorite' ?
                        <DeleteOutlineIcon className='product-card__delete-icon' onClick={() => this.props.handleDelete(this.props.index)}/>
                        :
                        null
                }
                <i className={`product-card__favorite-icon${this.props.favorite ? "_active" : ""}`}
                    onClick={this.handleFavoriteClick}
                />
                <div className="product-card__icons-row">
                    {this.renderIcons()}
                </div>
                <div className="product-card__image-wrapper"  onClick={() => this.props.history.push('/product/details/' + item.id, {item: item, favorite: this.props.favorite})}>
                    <img src={image} alt="" className="product-card__image"/>
                </div>


                <div className="product-card-inner" >
                    <div className="product-card__description">
                        <span className="product-card__description-id">Артикул {item.id}</span>
                        <span className="product-card__description-title">{item.title}</span>
                        <span className="product-card__description-prices-wrap">
                            <span className="product-card__description-price">{item.price} Р</span>
                            {/* <span className="product-card__description-price_old">95 900 р</span> */}
                        </span>
                    </div>

                    <ProductBasketAdd handleClick={this.handleBasketAdd}/>
                </div>
            </div>
        )
    }
}

export default withRouter(connect(
    (state, ownProps) => ({
        token: state.token,
    }),
    dispatch => ({
        onAddFav: (id) => {
            dispatch({ type: 'ADD_FAVORITE', payload: id })
        },
        onRemoveFav: (id) => {
            dispatch({ type: 'REMOVE_FAVORITE', payload: id })
        },
        onError: (obj) => {
            dispatch({ type: 'UPDATE_MODAL_DATA', payload: obj })
        },
        onReloadMenu: () => {
            dispatch({ type: 'RELOAD', payload: true })
        },
    })
)(ProductCard));