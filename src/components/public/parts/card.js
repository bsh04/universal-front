import React, {Component} from 'react';
import { withRouter, Link } from 'react-router-dom';
import request from "../../../services/ajaxManager";
import {connect} from "react-redux";

class Card extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleBasketAdd = this.handleBasketAdd.bind(this);

        this.state = {
            news: [],
            form: true,
        };
    }
    // componentWillMount() {
    //     this.props.onResetFav([]);
    // }

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

    render() {
        return (
            <div className={"card"} itemScope itemType="http://schema.org/Product">
                <img itemProp="logo" className="card-img-top card-img-top-250" src={this.props.item.photo === 'placeholder.jpg' ? require('../../../images/image-placeholder.png') : 'https://api.universal.tom.ru/uploads/products/' + this.props.item.photo } alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title" itemProp="name">{this.props.item.title}</h5>
                    <p className="card-text" itemProp="price">
                        <small className="text-muted">Код товара: {this.props.item.id} </small> {this.props.item.new ? (<Link to={'/catalog/new'}><span className="badge badge-success">Новинка!</span></Link>) : ''} {this.props.item.stock ? (<Link to={'/catalog/stock'}><span className="badge badge-danger">Акция!</span></Link>) : ''}<br/>
                        Цена: {this.props.item.price} р.
                    </p>
                    <p>
                        <i className={'fa fa-heart' + (this.props.favorite ? ' text-danger' : '')}
                           onClick={this.handleClick}> {this.props.favorite ? 'В избранном' : 'Добавить в избранное'}</i>
                    </p>
                    {this.state.form ?
                        <form className="form-inline" onSubmit={(e) => {e.preventDefault()}} style={{justifyContent: 'center'}}>
                            <div className="input-group mb-2 mr-sm-2">
                                <input
                                    name="desc"
                                    type="number"
                                    required={true}
                                    placeholder={"Количество:"}
                                    min={1}
                                    defaultValue={1}
                                    className="form-control mb-1 mr-sm-1"
                                    ref={(input) => {this.countInput = input}}
                                />
                                <div className="input-group-prepend">
                                    <button className="btn btn-success mb-1 " onClick={this.handleBasketAdd}>
                                        <i className={'fa fa-cart-plus'}></i>
                                    </button>
                                </div>
                            </div>
                        </form> :
                        <div className="alert alert-success" role="alert">
                            <i className={'fa fa-check'}> {this.state.message}</i>
                        </div>
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
