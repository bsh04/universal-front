import React, {Component} from 'react';
import Breadcrumbs from "../../../breadcrumbs";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import login from "../../sign_action/login";
import {ProductBasketAdd} from "./ProductBasketAdd";
import request from "../../../../services/ajaxManager";
import {connect} from "react-redux";
import {withRouter} from "react-router";

const placeholder = require('./pl.png')

class ProductDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            product: this.props.location.state.item,
            favorite: this.props.location,
            startImageCarousel: 1,
            endImageCarousel: 3
        }
    }

    componentDidMount() {
        if (Array.isArray(this.state.product.photo)) {
            this.setState({photoArray: this.state.product.photo.lenght})
        } else {
            this.setState({photoArray: null})
        }
    }

    renderImage(image) {
        let arr = []
        if (this.state.photoArray) {
            for (let i = this.state.startImageCarousel; i <= this.state.endImageCarousel; i++) {
                arr.push(
                    <div className='image' key={i}>
                        <img src={'https://api.universal.tom.ru/uploads/products/' + image[i]}/>
                    </div>
                )
            }
        } else {

            for (let i = 0; i < 3; i++) {
                if (i === 0) {
                    arr.push(
                        <div className='image' key={i}>
                            <img src={'https://api.universal.tom.ru/uploads/products/' + image}/>
                        </div>
                    )
                } else {
                    arr.push(
                        <div className='image-placeholder' key={i}>
                            <img src={placeholder}/>
                            <p>Здесь скоро появится фото</p>
                        </div>
                    )
                }
            }
        }

        return (
            <div className='images'>
                {arr}
            </div>
        )
    }

    renderIcons() {
        let arr = ['stock', 'new', 'self',]
        return arr.map((item, key) => {
            return <i className={`product-card__icons-row-icon product-card__icons-row-icon_${item}`} key={key}/>
        })
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
                product: this.state.product.id,
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
        return (
            <div>
                <Breadcrumbs
                    path={[
                        {title: `${this.state.product.category.parent.title}`},
                        {title: `${this.state.product.category.title}`},
                        {title: `${this.state.product.title}`},

                    ]}
                />
                <div className='product-details'>
                    <h4>{this.state.product.title}</h4>
                    <div className='product-details-items'>
                        <div className='product-carousel-cont'>
                            <ExpandLessIcon className='carousel-arrow' onClick={() => {
                                if (this.state.photoArray) {
                                    if (this.state.startImageCarousel > 1) {
                                        this.setState({startImageCarousel: this.state.startImageCarousel - 1})
                                        this.setState({endImageCarousel: this.state.endImageCarousel - 1})
                                    }
                                }
                            }}/>
                            <div className='product-carousel'>
                                {this.renderImage(this.state.product.photo)}
                            </div>
                            <ExpandLessIcon className='fa-rotate-180 carousel-arrow' onClick={() => {
                                if (this.state.photoArray) {
                                    if (this.state.photoArray.length > this.state.startImageCarousel) {
                                        this.setState({startImageCarousel: this.state.startImageCarousel + 1})
                                        this.setState({endImageCarousel: this.state.endImageCarousel + 1})
                                    }
                                }
                            }}/>
                        </div>
                        <div className='main_image'>
                            <img src={'https://api.universal.tom.ru/uploads/products/' + this.state.product.photo}/>
                        </div>
                        <div className='product-details__description'>
                            <div className='product-details__icons-row'>
                                {this.renderIcons()}
                                <i className={`product-card__favorite-icon${this.props.favorite ? "_active" : ""}`}
                                   onClick={this.handleFavoriteClick}
                                />
                            </div>
                            <hr/>

                            <p>
                                Артикул
                            </p>
                            <hr/>

                            <div>
                                <div>
                                    <p>цена</p>
                                </div>
                                <ProductBasketAdd handleClick={this.handleBasketAdd}/>
                            </div>
                            <hr/>
                            <div>
                                <h5>Оплата:</h5>
                                <div>
                                    <p>Наличными при самовызове</p>
                                    <p>Расчёт через терминал</p>
                                    <p>Оплата на расчётный счёт (для юр. лиц)</p>
                                </div>
                            </div>
                            <hr/>
                            <div>
                                <h5>Доставка:</h5>
                                <div>
                                    <p>Самовызов</p>
                                    <p>Доставка на дом</p>
                                    <p>Доставка до ТК</p>
                                </div>
                            </div>
                        </div>
                    </div>
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
        onAddFav: (id) => {
            dispatch({type: 'ADD_FAVORITE', payload: id})
        },
        onRemoveFav: (id) => {
            dispatch({type: 'REMOVE_FAVORITE', payload: id})
        },
        onError: (obj) => {
            dispatch({type: 'UPDATE_MODAL_DATA', payload: obj})
        },
        onReloadMenu: () => {
            dispatch({type: 'RELOAD', payload: true})
        },
    })
)(ProductDetails));