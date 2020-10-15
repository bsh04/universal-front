import React, { Component } from 'react';

import {connect} from "react-redux";
import {withRouter} from "react-router";

import { productImageUrl } from '../../../../services/parameters';
import request from '../../../../services/ajaxManager';
import { ProductBasketAdd } from './ProductBasketAdd';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { Link } from 'react-router-dom';


class ProductCard extends Component {
    constructor(props) {
        super(props);

        this.cardRef = React.createRef();

        this.state = {
            cardView: this.props.cardView ? this.props.cardView : 'tile', // tile || list
            form: true,
        }
    }

    componentWillMount() {
        this.checkBasket();
    }

    componentDidMount() {
        
    }
    

    checkBasket() {
        return this.props.basket.find(basketItem => {
                                                    
            if(basketItem.product.id === this.props.item.id) {
                return basketItem.product;
            }
            
        });
    }

    shouldComponentUpdate(prevProps, prevState) {
        if(JSON.stringify(prevProps) !== JSON.stringify(this.props) || JSON.stringify(prevState) !== JSON.stringify(this.state)){
            return true;
        } else {
            return false
        }
    }


    componentDidUpdate(prevProps) {
        if(prevProps.cardView !== this.props.cardView) {
            this.setState({cardView: this.props.cardView});
        }
    }

    renderIcons() {
        let arr = ['stock', 'new', 'produced', 'season' ];

        arr = arr.filter(field => this.props.item[field]);

        return arr.map((item, key) => {
            return <i className={`product-card__icons-row-icon product-card__icons-row-icon_${item}`} key={key}/>
        })
    }

    handleFavoriteClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        
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
            <Link 
                ref={(ref) => this.cardRef = ref}
                className={`product-card product-card_${this.state.cardView}` } 
                to={{
                    pathname: '/product/details/' + item.id,
                    state: {item: item, favorite: this.props.favorite} // не работает
                }} 
            >
                {
                    this.props.page === 'favorite' ?
                        <DeleteOutlineIcon 
                            className='product-card__delete-icon' 
                            onClick={(e) => {
                                e.stopPropagation();
                                this.props.handleDelete(this.props.index)}
                            }
                        />
                        :
                        <i className={`product-card__favorite-icon product-card__favorite-icon${this.props.favorite ? "_active" : ""}`}
                            onClick={this.handleFavoriteClick}
                        />
                }
                
                <div className="product-card__icons-row">
                    {this.renderIcons()}
                </div>
                <div className="product-card__image-wrapper">
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

                    <ProductBasketAdd 
                        handleClick={this.handleBasketAdd} 
                        inBasket={this.checkBasket()} 
                        basketCount={this.checkBasket() ? this.checkBasket().count : 1}
                    />
                </div>
            </Link>
        )
    }
}

export default withRouter(connect(
    (state, ownProps) => ({
        token: state.token,
        basket: state.basket
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