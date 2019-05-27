import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
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
                    title: 'Необходимо войти в систему',
                    content: 'Для добавления товара в избранное или корзину необходимо зарегистрироваться и войти в систему.',
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
                    },
                    this.state.errorCallback
                );
            }

        }
        else {
            if (!this.props.token) {
                this.props.onError({
                    show: true,
                    title: 'Необходимо войти в систему',
                    content: 'Для добавления товара в избранное или корзину необходимо зарегистрироваться и войти в систему.',
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
                title: 'Необходимо войти в систему',
                content: 'Для добавления товара в избранное или корзину необходимо зарегистрироваться и войти в систему.',
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
                },
                this.state.errorCallback
            );
        }
    }

    render() {
        let isNew = Math.ceil(Math.abs(((new Date()) - (new Date(this.props.item.updated))) / (1000 * 60 * 60 * 24))) < 14;

        return (
            <div className="card">
                <img className="card-img-top" src={this.props.item.photo === 'placeholder.jpg' ? require('../../../images/image-placeholder.png') : '' } alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">{this.props.item.title}</h5>
                    <p className="card-text">
                        <small className="text-muted">Код товара: {this.props.item.id} </small> {isNew ? <span className="badge badge-success">Новинка!</span> : ''}<br/>
                        Цена: {this.props.item.price} р.
                    </p>
                    <p>
                        <i className={'fa fa-heart' + (this.props.favorite ? ' text-danger' : '')}
                           onClick={this.handleClick}> {this.props.favorite ? 'В избранном' : 'Добавить в избранное'}</i>
                    </p>
                    {this.state.form ?
                        <form className="form-inline" onSubmit={(e) => {e.preventDefault()}}>
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
    })
)(Card));
