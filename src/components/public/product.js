import React, {Component} from 'react';
import { withRouter } from "react-router";
import {connect} from "react-redux";
import request from "../../services/ajaxManager";
import {Helmet} from "react-helmet";
import {
    EmailShareButton,
    VKShareButton,
    WhatsappShareButton,
  } from "react-share";
import Breadcrumbs from '../breadcrumbs';

import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/scss/image-gallery.scss";

class Product extends Component {
    constructor(props) {
        super(props);

        this.isFavorite = this.isFavorite.bind(this);
        this.updateFav= this.updateFav.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleBasketAdd = this.handleBasketAdd.bind(this);

        this.state = {
            item: {},
            images: [],
            favorites: [],
            favorite: null
        };
    }

    componentDidMount() {
        let itemId = this.props.match.params.id;
        let _this = this;
        request(
            `product/item/${itemId}`,
            'GET',
            null,
            {},
            function (response) {
                let images = response.images.map(item => {
                    return {
                        original: `${item === 'placeholder.jpg' ? require('../../images/image-placeholder.png') : 'https://api.universal.tom.ru/uploads/products/' + item}`,
                        thumbnail: `${item === 'placeholder.jpg' ? require('../../images/image-placeholder.png') : 'https://api.universal.tom.ru/uploads/products/' + item}`
                    }
                });

                _this.setState({
                    item: response,
                    images: images
                });
                
            }, 
            () => {console.log()}
        );
        
        request(
            'product/favorite',
            'GET',
            null,
            {},
            function (response)
            {
                _this.setState({favorites: response});
            },
        );
        this.updateFav(this.state.item)
    }

    handleClick() {
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
                    id: this.state.item.id,
                };

                let _this = this;

                request(
                    'product/favorite',
                    'POST',
                    data,
                    {},
                    function (response)
                    {
                        _this.props.onAddFav(_this.state.item);
                        _this.updateFav(_this.state.item);
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
                    id: this.state.item.id,
                };

                let _this = this;

                request(
                    'product/favorite',
                    'DELETE',
                    data,
                    {},
                    function (response)
                    {
                        _this.props.onRemoveFav(_this.state.item);
                        _this.updateFav(_this.state.item);
                        _this.props.onReloadMenu();
                    },
                    this.state.errorCallback
                );
            }
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

    handleBasketAdd() {
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
                product: this.state.item.id,
                count: this.countInput.value,
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
        if(!this.state.item){
            return <p>Подождите...</p>
        }
        
        return (
            <div>
                <Helmet>
                    <meta charSet="utf-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <meta name="theme-color" content="#000000"/>
                    <title>{this.state.item.title}</title>
                    <meta name="keywords" content="купить хозтовары, хозяйственные товары, бытовые товары, хозяйственно-бытовые товары, товары для дома"/>
                    <meta name="description" content={`Товары для дома, хозяйственные товары, спец. одежда и многое другое! ${this.state.item ? this.state.item.title : 'Каталог - Универсал'}`}/>
                    <meta property="og:description" content="Множество товаров для дома, хозяйства, авто и многого другого!"/>
                    <meta property="og:title" content="Каталог"/>
                    <meta property="og:url" content="https://universal.tom.ru/catalog/*"/>
                </Helmet>
                { this.state.item && this.state.item.category
                ? <Breadcrumbs 
                    path={[{title: 'Каталог', link: '/catalog'}].concat(
                        this.state.item.category.parent ? [{
                            title: this.state.item.category.parent.title, link: `/catalog/${this.state.item.category.parent.id}`
                        }] : [],
                        [{title: this.state.item.category.title, link: `/catalog/${this.state.item.category.id}`},
                        {title: this.state.item.title}])}/>
                : null}
                <div className="product-page">
                    <div className="row ">
                        <h5 className="card-title text-left font-weight-light col-12">{this.state.item.title}</h5>
                        <p className="text-left text-muted col-12"><small>Артикул: {this.state.item.id} </small></p>
                    </div>
                    <div className="row ">
                        <div className="col-sm-7 col-10">
                            <ImageGallery 
                                items={this.state.images}
                                thumbnailPosition="left"
                                showPlayButton={false}
                                showNav={false}/>
                        </div>
                        <div className="col-sm-5 col-10 mt-5 my-sm-0 ">
                            <div className="row ">
                                <div className="text-left col-8 " itemProp="price">
                                    <span style={{fontSize: '1.5rem'}}>
                                        {this.state.item.price} &#8381;
                                    </span>
                                </div>
                                <div className="col-3 d-flex flex-nowrap">
                                    
                                    <div onClick={this.handleClick}>
                                        <i className={'fa fa-heart fa-2x' + (this.isFavorite(this.state.item) ? ' text-danger' : ' text-secondary')}></i>
                                    </div>
                                
                                    <div className="dropleft dropdown-share ml-2">
                                        <button className="btn btn-info btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="fa fa-share"></i>
                                        </button>
                                        <div className="dropdown-menu share" aria-labelledby="dropdownMenuButton">
                                            <VKShareButton className="dropdown-item" url={'https://universal.tom.ru/catalog/search?q=' + this.state.item.id} children={<i className="fa fa-vk"> Поделиться в VK</i>} />
                                            <WhatsappShareButton className="dropdown-item" url={'https://universal.tom.ru/catalog/search?q=' + this.state.item.id} children={<i className="fa fa-whatsapp"> Поделиться в Whatsapp</i>} />
                                            <EmailShareButton className="dropdown-item" url={'https://universal.tom.ru/catalog/search?q=' + this.state.item.id} children={<i className="fa fa-envelope"> Отправить по E-mail</i>} />
                                            <a className="dropdown-item" href="#" onClick={async () => {
                                                try {
                                                    // 1) Copy text
                                                    await navigator.clipboard.writeText('https://universal.tom.ru/catalog/search?q=' + this.state.item.id);

                                                    // 2) Catch errors
                                                } catch (err) {
                                                    console.error('Failed to copy: ', err);
                                                }
                                        }}><i className="fa fa-clone"> Скопировать ссылку</i></a>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="row mt-5">
                                <form onSubmit={(e) => {e.preventDefault()}}>
                                    <div className="input-group mb-2 mr-sm-2 row d-flex flex-wrap ">
                                        <input
                                            name="desc"
                                            type="number"
                                            required={true}
                                            placeholder={"Количество:"}
                                            min={1}
                                            defaultValue={1}
                                            className={`form-control mb-1 col-xl-4 col-lg-5 col-md-12 col-sm-4 col-12`
                                                    }
                                            ref={(input) => {this.countInput = input}}
                                        />
                                        <div className={
                                                `pl-1 pr-0 col-xl-8 col-lg-7 col-md-12 col-sm-8 col-12`
                                            }>
                                            <button className="form-control btn-basket btn btn-success mb-1" onClick={this.handleBasketAdd}>
                                                <span className="btn-label">В корзину </span>
                                                <i className={'fa fa-cart-plus'}></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>
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
)(Product));