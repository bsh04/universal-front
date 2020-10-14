import React, {Component} from 'react';
import Breadcrumbs from "../../../breadcrumbs";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import login from "../../sign_action/login";
import {ProductBasketAdd} from "./ProductBasketAdd";
import request from "../../../../services/ajaxManager";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import { productImageUrl } from '../../../../services/parameters';
import { ModalGallery } from '../modal_blocks/ModalGallery';
import favorite from '../../../private/favorite';

const placeholder = require('./pl.png')

class ProductDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            productId: this.props.match.params.id,
            product: null,
            favorite: false,
            startImageCarousel: 1,
            endImageCarousel: 3,
            modalGalleryShow: false,
            mainImageIndex: 0
            
        }
    }

    componentDidMount() {
        this.getProduct();
        
    }

    componentDidUpdate(_, prevState) {
        if(prevState.product !== this.state.product) {
            this.getFavorites();
        }
    }

    checkBasket() {
        return this.props.basket.find(basketItem => {
                                                    
            if(basketItem.product.id === this.state.product.id) {
                return basketItem.product;
            }
            
        });
    }

    getFavorites() {
        let _this = this;

        request(
            'product/favorite',
            'GET',
            null,
            {},
            function (response) {
                
                if(response.find(item => item.id === _this.state.product.id)) {
                    _this.setState({favorite: true})
                }
            },
        );
    }

    handleFavoriteClick = (e) => {
        e.stopPropagation();
        if (!this.state.favorite) {
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
                    id: this.state.product.id,
                };

                let _this = this;

                request(
                    'product/favorite',
                    'POST',
                    data,
                    {},
                    function (response)
                    {
                        _this.setState({favorite: true});
                        _this.props.onAddFav(_this.props.item);
                        //_this.props.update(_this.props.item);
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
                    id: this.state.product.id,
                };

                let _this = this;

                request(
                    'product/favorite',
                    'DELETE',
                    data,
                    {},
                    function (response)
                    {   
                        _this.setState({favorite: false});
                        _this.props.onRemoveFav(_this.props.item);
                        //_this.props.update(_this.props.item);
                        _this.props.onReloadMenu();
                    },
                    this.state.errorCallback
                );
            }
        }
    }

    getProduct() {
        let _this = this;

        request(
            `product/item/${this.state.productId}`,
            'GET',
            {},
            {},
            function(res) {
                _this.setState({product: res});
            },
            function(err) {}
        )
    }

    renderImage(image) {
        let arr = [];


        if (this.state.photoArray) {
            for (let i = this.state.startImageCarousel; i <= this.state.endImageCarousel; i++) {
                arr.push(
                    <div className='image' key={i}>
                        <img src={productImageUrl + image[i]}/>
                    </div>
                )
            }
        } else {
            
            for (let i = 0; i < 3; i++) {
                if (this.state.product.images[i]) {
                    arr.push(
                        <div className='image' key={i} onClick={() => this.setState({mainImageIndex: i})}>
                            <img src={productImageUrl + this.state.product.images[i]}/>
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
        let arr = ['stock', 'new', 'produced']
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
        } else {
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

    findCategoriesPath(product) {
        let result = [];

        if(product.category.parent) {
            result.unshift({
                title: product.category.parent.title,
                link: `/catalog/${product.category.parent.id}`,
            });
        }
        
        return [...result, {title: product.category.title, link: product.category.id}]
        
    }

    render() {
        let mobile = this.props.isMobile;
        
        if(!this.state.product) {
            return <div>Товар не найден</div>
        }
        return (
            <div className='w-100'>
                <ModalGallery 
                    visible={this.state.modalGalleryShow} 
                    handleToggle={() => this.setState({modalGalleryShow: !this.state.modalGalleryShow})}
                    images={this.state.product.images}
                    currentImage={this.state.mainImageIndex}
                />
                {this.props.categories && this.props.categories.length > 1 && this.state.product ?
                <Breadcrumbs
                    path={[{title: 'Каталог', link: '/catalog'}].concat(
                        this.findCategoriesPath(this.state.product)
                    )}
                /> : null}
                <div className='product-details'>
                    <h4>{this.state.product.title}</h4>
                    <div className='product-details-items'>
                        <div className='product-details-images'>
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
                                    {this.renderImage(this.state.product.images)}
                                </div>
                                <ExpandLessIcon className='fa-rotate-180 carousel-arrow-2' onClick={() => {
                                    if (this.state.photoArray) {
                                        if (this.state.photoArray.length > this.state.startImageCarousel) {
                                            this.setState({startImageCarousel: this.state.startImageCarousel + 1})
                                            this.setState({endImageCarousel: this.state.endImageCarousel + 1})
                                        }
                                    }
                                }}/>
                            </div>
                            <div className='d-flex justify-content-center w-100 mr-4'>
                                <div className='main_image' onClick={() => this.setState({modalGalleryShow: true})}>
                                    <img src={productImageUrl + this.state.product.images[this.state.mainImageIndex]}/>
                                </div>
                            </div>
                        </div>
                        <div className='product-details__description text-left'>
                            {
                                mobile
                                    ?
                                    <div className='d-flex justify-content-between border-bottom pt-5'>
                                        <div className='product-details__icons-row'>
                                            {this.renderIcons()}
                                        </div>
                                        <p>
                                            Артикул {this.state.product.id}
                                        </p>
                                        <i className={`product-details__favorite-icon ${this.state.favorite ? "product-details__favorite-icon_active" : ""}`}
                                           onClick={this.handleFavoriteClick}
                                        />
                                    </div>
                                    :
                                    <>
                                        <div className='d-flex justify-content-between'>
                                            <div className='product-details__icons-row'>
                                                {this.renderIcons()}
                                            </div>
                                            <i className={`product-details__favorite-icon ${this.state.favorite ? "product-details__favorite-icon_active" : ""}`}
                                               onClick={this.handleFavoriteClick}
                                            />
                                        </div>
                                        <hr/>
                                        <p>
                                            Артикул {this.state.product.id}
                                        </p>
                                        <hr/>
                                    </>
                            }
                            <div className='pb-2'>
                                {
                                    mobile
                                        ?
                                        <div className='d-flex flex-column align-items-center pt-3'>
                                            <div className='price'>
                                                <p>Цена: </p>
                                                <span>{this.state.product.price}</span>
                                            </div>
                                            <ProductBasketAdd 
                                                handleClick={this.handleBasketAdd}
                                                inBasket={this.checkBasket()}
                                                basketCount={this.checkBasket() ? this.checkBasket().count : 1}
                                            />
                                        </div>
                                        :
                                        <>
                                            <div className='price'>
                                                <p>Цена: </p>
                                                <span>{this.state.product.price}</span>
                                            </div>
                                            <ProductBasketAdd 
                                                handleClick={this.handleBasketAdd}
                                                inBasket={this.checkBasket()}
                                                basketCount={this.checkBasket() ? this.checkBasket().count : 1}
                                            />
                                        </>
                                }
                            </div>
                            <hr/>
                            {
                                mobile
                                    ?
                                    <>
                                        <div className='d-flex'>
                                            <h5 className='w-25'>Оплата:</h5>
                                            <div className='d-flex flex-column w-75'>
                                                <div className='d-flex align-items-start pr-2'>
                                                    <img className='pr-2' src={require("../../../../images/money.png")}
                                                         alt=""/>
                                                    <p>Наличными при самовывозе</p>
                                                </div>
                                                <div className='d-flex align-items-start pr-2'>
                                                    <img className='pr-2'
                                                         src={require("../../../../images/withdraw.png")} alt=""/>
                                                    <p>Расчёт через терминал</p>
                                                </div>
                                                <div className='d-flex align-items-start pr-2'>
                                                    <img className='pr-2'
                                                         src={require("../../../../images/receive-money.png")}
                                                         alt=""/>
                                                    <p>Оплата на расчётный счёт (для юр. лиц)</p>
                                                </div>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className='d-flex'>
                                            <h5 className='w-25'>Доставка:</h5>
                                            <div className='d-flex flex-column w-75'>
                                                <div className='d-flex align-items-start pr-2'>
                                                    <img className='pr-2' src={require('../../../../images/parcel.png')}
                                                         alt=""/>
                                                    <p>Самовывоз</p>
                                                </div>
                                                <div className='d-flex align-items-start pr-2'>
                                                    <img className='pr-2'
                                                         src={require('../../../../images/shipment.png')} alt=""/>
                                                    <p>Доставка на дом</p>
                                                </div>
                                                <div className='d-flex align-items-start pr-2'>
                                                    <img className='pr-2'
                                                         src={require('../../../../images/delivery.png')} alt=""/>
                                                    <p>Доставка до ТК</p>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div>
                                            <h5>Оплата:</h5>
                                            <div className='d-flex justify-content-between'>
                                                <div className='d-flex align-items-start pr-2'>
                                                    <img className='pr-2' src={require("../../../../images/money.png")}
                                                         alt=""/>
                                                    <p>Наличными при самовывозе</p>
                                                </div>
                                                <div className='d-flex align-items-start pr-2'>
                                                    <img className='pr-2'
                                                         src={require("../../../../images/withdraw.png")} alt=""/>
                                                    <p>Расчёт через терминал</p>
                                                </div>
                                                <div className='d-flex align-items-start pr-2'>
                                                    <img className='pr-2'
                                                         src={require("../../../../images/receive-money.png")}
                                                         alt=""/>
                                                    <p>Оплата на расчётный счёт (для юр. лиц)</p>
                                                </div>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div>
                                            <h5>Доставка:</h5>
                                            <div className='d-flex justify-content-between'>
                                                <div className='d-flex align-items-start pr-2'>
                                                    <img className='pr-2' src={require('../../../../images/parcel.png')}
                                                         alt=""/>
                                                    <p>Самовывоз</p>
                                                </div>
                                                <div className='d-flex align-items-start pr-2'>
                                                    <img className='pr-2'
                                                         src={require('../../../../images/shipment.png')} alt=""/>
                                                    <p>Доставка на дом</p>
                                                </div>
                                                <div className='d-flex align-items-start pr-2'>
                                                    <img className='pr-2'
                                                         src={require('../../../../images/delivery.png')} alt=""/>
                                                    <p>Доставка до ТК</p>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                            }
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
        basket: state.basket
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