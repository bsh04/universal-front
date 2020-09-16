import React, {Component} from 'react';
import { withRouter, Link } from 'react-router-dom';
import request from "../../../services/ajaxManager";
import {connect} from "react-redux";
import ModalImage from "react-modal-image";
import {
    EmailShareButton,
    VKShareButton,
    WhatsappShareButton,
  } from "react-share";


class Card extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleBasketAdd = this.handleBasketAdd.bind(this);

        this.state = {
            news: [],
            form: true,
            cardView: null // tile || list
        };
    }

    componentDidMount() {
        let cardView;
        this.props.cardView ? cardView = this.props.cardView : cardView = 'tile';

        this.setState({
            cardView: cardView
        })
    }
    componentDidUpdate(prevProps) {
        if(prevProps !== this.props) {
            this.setState({
                cardView: this.props.cardView
            })
        }
    }

    handleClick() {
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
                product: this.props.item.id,
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

    cardContent(className = '') {
        let cardView = this.state.cardView;
        let mainPage = this.props.mainPage;

        return <div className={`${className} ${cardView}`}
        itemScope 
        itemType="http://schema.org/Product">
        { !mainPage 
        ? <div className="dropleft dropdown-share">
            <button className="btn btn-info btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fa fa-share"/>
            </button>
            <div className="dropdown-menu share" aria-labelledby="dropdownMenuButton">
                <VKShareButton className="dropdown-item" url={'https://universal.tom.ru/catalog/search?q=' + this.props.item.id} children={<i className="fa fa-vk"> Поделиться в VK</i>} />
                <WhatsappShareButton className="dropdown-item" url={'https://universal.tom.ru/catalog/search?q=' + this.props.item.id} children={<i className="fa fa-whatsapp"> Поделиться в Whatsapp</i>} />
                <EmailShareButton className="dropdown-item" url={'https://universal.tom.ru/catalog/search?q=' + this.props.item.id} children={<i className="fa fa-envelope"> Отправить по E-mail</i>} />
                <a className="dropdown-item"  onClick={async () => {
                    try {
                        // 1) Copy text
                        await navigator.clipboard.writeText('https://universal.tom.ru/catalog/search?q=' + this.props.item.id);

                        // 2) Catch errors
                    } catch (err) {
                        console.error('Failed to copy: ', err);
                    }
            }}><i className="fa fa-clone"> Скопировать ссылку</i></a>
            </div>
        </div>
        : null }
        <ModalImage
            small={this.props.item.photo === 'placeholder.jpg' ? require('../../../images/image-placeholder.png') : 'https://api.universal.tom.ru/uploads/products/' + this.props.item.photo}
            large={this.props.item.photo === 'placeholder.jpg' ? require('../../../images/image-placeholder.png') : 'https://api.universal.tom.ru/uploads/products/' + this.props.item.photo}
            alt={this.props.item.title}
            className="card-img-top card-img-top-250 mt-3"
        />

        {this.state.cardView === 'tile'
        ? <div className="card-body col-12">
            <h5 
                className="card-title text-left font-weight-light " 
                itemProp="name">
                    {this.props.item.title}
            </h5>
            <div className="d-flex justify-content-start card-sticker">
                {this.props.item.new ? (<Link to={'/catalog/new'}><span className="badge badge-success ">Новинка!</span></Link>) : ''}
                {this.props.item.stock ? (<Link to={'/catalog/stock'}><span className="badge badge-danger ">Акция!</span></Link>) : ''}
            </div>
            <p className={"card-text text-left font-weight-normal" + (mainPage ? ' d-flex justify-content-between flex-nowrap' : '')} 
                itemProp="price">
                <span>{!mainPage ? 'Цена:' : ''} <span style={{fontWeight: 700}}>{this.props.item.price}</span>  р.</span>
                { mainPage 
                ? <i className={'fa fa-heart card-text' + (this.props.favorite ? ' text-danger' : '')}
                    onClick={this.handleClick}></i> 
                : null}
            </p>
            
            { !mainPage 
            ? <p>
                <i className={'fa fa-heart' + (this.props.favorite ? ' text-danger' : '')}
                onClick={this.handleClick}> {this.props.favorite ? 'В избранном' : 'Добавить в избранное'}</i>
            </p>
            : null }
            {this.state.form ?
                <form onSubmit={(e) => {e.preventDefault()}} style={{justifyContent: 'center'}}>
                    <div className="input-group mb-2 mr-sm-2 row d-flex flex-wrap justify-content-center">
                        <input
                            name="desc"
                            type="number"
                            required={true}
                            placeholder={"Количество:"}
                            min={1}
                            defaultValue={1}
                            className={`form-control mb-1 col-xl-4 col-lg-5 col-md-12 col-sm-2 col-12 ${!mainPage ? '' : 'd-none'}`
                                    }
                            ref={(input) => {this.countInput = input}}
                        />
                        <div className={
                                !mainPage ? `pl-1 pr-0 col-xl-8 col-lg-7 col-md-12 col-sm-8 col-12` : 'col-md-12'
                            }>
                            <button className="form-control btn-basket btn btn-success mb-1" onClick={this.handleBasketAdd}>
                                <span className="btn-label">В корзину </span>
                                <i className={'fa fa-cart-plus'}></i>
                            </button>
                        </div>
                    </div>
                </form> :
                <div className="alert alert-success" role="alert">
                    <i className={'fa fa-check'}> {this.state.message}</i>
                </div>
            }
            {!mainPage 
            ? <div>
                <p className="text-left text-muted "><small>Код товара: {this.props.item.id} </small></p>
                <Link to={`/catalog/product/${this.props.item.id}`}><span className="badge">Перейти к товару</span></Link>
            </div>
            : null}
        </div>
        
        :  
            <div className="card-body row">
                <div className="card-info col-xl-8 col-lg-8 col-md-5 col-sm-5 col-8">
                    <h5 
                        className="card-title text-left font-weight-light " 
                        itemProp="name">
                            {this.props.item.title}
                    </h5>
                    <p className="card-text text-left font-weight-normal" itemProp="price">
                        {this.props.item.new ? (<Link to={'/catalog/new'}><span className="badge badge-success">Новинка!</span></Link>) : ''} 
                        {this.props.item.stock ? (<Link to={'/catalog/stock'}><span className="badge badge-danger">Акция!</span></Link>) : ''}<br/>
                        Цена: <span style={{fontWeight: 700}}>{this.props.item.price}</span>  р.
                    </p>
                    <p className="text-left text-muted">
                        <small>Код товара: {this.props.item.id} </small>
                    </p>
                </div>
                <div className="card-controls col-xl-3 col-lg-3 col-md-4 col-sm-4 col-8">
                    { this.state.form ?
                        <form onSubmit={(e) => {e.preventDefault()}} style={{justifyContent: 'center'}}>
                            <div className="input-group mb-2 mr-sm-2 row d-flex flex-wrap justify-content-center">
                                <input
                                    name="desc"
                                    type="number"
                                    required={true}
                                    placeholder={"Количество:"}
                                    min={1}
                                    defaultValue={1}
                                    className={`form-control mb-1 col-xl-4 col-lg-5 col-md-12 col-sm-12 col-12`
                                            }
                                    ref={(input) => {this.countInput = input}}
                                />
                                <div className="pl-1 pr-0 col-xl-8 col-lg-7 col-md-12 col-sm-12 col-12">
                                    <button className="form-control btn-basket btn btn-success mb-1" onClick={this.handleBasketAdd}>
                                        <span className="btn-label">В корзину </span>
                                        <i className={'fa fa-cart-plus'}></i>
                                    </button>
                                </div>
                            </div>
                        </form> 
                        : <div className="alert alert-success" role="alert">
                            <i className={'fa fa-check'}> {this.state.message}</i>
                        </div> }
                        <p>
                            <i className={'fa fa-heart' + (this.props.favorite ? ' text-danger' : '')}
                                onClick={this.handleClick}> {this.props.favorite ? 'В избранном' : 'Добавить в избранное'}</i>
                                <Link to={`/catalog/product/${this.props.item.id}`}><span className="badge">Перейти к товару</span></Link>
                        </p>
                </div>
            </div>}
    </div>;
    }

    render() {
        return (
            <div className="card-position">
                {this.cardContent('card')}
                {this.cardContent('card hover')}
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
)(Card));
