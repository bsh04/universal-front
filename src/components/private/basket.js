import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';

import Breadcrumbs from '../breadcrumbs';

import request from '../../services/ajaxManager';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import CircularProgress from "@material-ui/core/CircularProgress";
import {connect} from "react-redux";

class Basket extends Component {
    constructor(props) {
        super(props);

        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

        this.state = {
            products: [],
            count: 1,
            mobileMode: false,
            ready: false
        };
    }

    componentDidMount() {
        this.handleGet();

        this.getSizeWindow();
        window.addEventListener("resize", this.getSizeWindow.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.getSizeWindow.bind(this));
    }

    getSizeWindow() {
        if (window.innerWidth < 768) this.setState({mobileMode: true})
        else this.setState({mobileMode: false})
    }

    handleGet() {
        let _this = this;
        request(
            'product/basket',
            'GET',
            null,
            {},
            function (response) {
                _this.setState({products: response, ready: true});
            },
        );
    }

    handleCountEdit(key, countValue) {
        let data = {
            id: this.state.products[key].id,
            count: countValue
        };


        let _this = this;

        request(
            'product/basket',
            'PUT',
            data,
            {},
            function (response) {
                let arr = _this.state.products;
                arr[key] = response;
                _this.setState({products: arr});
            },
            this.state.errorCallback
        );
    }

    handleUpdate(item, key, value) {
        if (value) {
            item.count += 1
        } else if (!value && item.count > 1) {
            item.count -= 1
        }

        let data = {
            id: this.state.products[key].id,
            count: item.count
        };

        let _this = this;

        request(
            'product/basket',
            'PUT',
            data,
            {},
            function (response) {
                let arr = _this.state.products;
                arr[key] = response;
                _this.setState({products: arr});
            },
            this.state.errorCallback
        );
    }

    async handleDelete(key) {
        let data = {
            id: this.state.products[key].id,
        };

        let _this = this;

        request(
            'product/basket',
            'DELETE',
            data,
            {},
            await function (response) {
                let arr = _this.state.products;
                let id = arr[key].product.id;

                arr.splice(key, 1);
                _this.setState({products: arr});
                _this.props.onReloadMenu();

                _this.props.onBasketDelete(id);
            },
            function (err) {
                console.log(err)
            }
        );
    }

    render() {
        let sum = 0;
        this.state.products.forEach((item) => {
            sum += item.count * item.product.price;
        });
        if (!this.props.token) {
            return <p>Для просмотра этой страницы <Link to='/login'>войдите</Link> в аккаунт
                или <Link to='/register'>зарегистрируйте</Link> новый</p>
        } else {
            return (
                <div className='basket-page'>
                    <Breadcrumbs
                        path={[
                            {title: 'Корзина'}
                        ]}/>
                    <h4>корзина</h4>
                    <div className='basket-container'>
                        <div className='list-products'>
                            {this.state.products.length > 0 ? this.state.products.map((item, key) => {
                                    return (
                                        <div className='product-card' key={key}>
                                            {
                                                this.state.mobileMode
                                                    ?
                                                    <div className='d-flex align-items-end h-100 flex-column w-100 p-0'>
                                                        <div className='product-card-top'>
                                                            <div className='product-image' onClick={() => this.props.history.push('/product/details/' + item.product.id)}>
                                                                <img className="fav-img"
                                                                     src={item.product.photo === 'placeholder.jpg' ? require('../../images/image-placeholder.png') : 'https://api.universal.tom.ru/uploads/products/' + item.product.photo}
                                                                    // style={{width: '80%', height: '80%'}}
                                                                />
                                                            </div>
                                                            <div className='product-title' onClick={() => this.props.history.push('/product/details/' + item.product.id)}>
                                                                <small>Артикул {item.product.id} </small>
                                                                <p>{item.product.title}</p>
                                                            </div>
                                                            <div className='product-delete mr-2'>
                                                                <i className={'fa fa-trash text-black-50'}
                                                                   onClick={() => this.handleDelete(key)}/>
                                                            </div>

                                                        </div>
                                                        <div
                                                            className='d-flex justify-content-between align-items-center h-25 w-100'>
                                                            <div className='product-price'>
                                                                <p className='default-price'>{item.product.price} Р</p>
                                                            </div>
                                                            <form className="counter rounded-pill" onSubmit={(e) => {
                                                                e.preventDefault()
                                                            }}>
                                                                <RemoveIcon className='w-25 ml-1'
                                                                            onClick={() => this.handleUpdate(item, key, false)}/>
                                                                <input
                                                                    name="desc"
                                                                    type="number"
                                                                    onChange={(e) => this.handleCountEdit(key, e.target.value)}
                                                                    required={true}
                                                                    placeholder={"Количество:"}
                                                                    defaultValue={item.count}
                                                                    value={item.count}
                                                                />
                                                                <AddIcon className='w-25 mr-1'
                                                                         onClick={() => this.handleUpdate(item, key, true)}/>
                                                            </form>
                                                            <div className='product-price'>
                                                                <p className="full-price">
                                                                    {item.new ?
                                                                        <span
                                                                            className="badge badge-success">Новинка!</span> : ''} {item.stock ?
                                                                    <span className="badge badge-danger">Акция!</span> : ''}
                                                                    {parseFloat((item.product.price * item.count).toFixed(2))} Р
                                                                    {item.product.balance === 0 ?
                                                                        <div className="alert alert-danger" role="alert">
                                                                            Этого товара нет в наличии. При оформлении
                                                                            заказа он
                                                                            не
                                                                            будет учтен.
                                                                        </div> : ''}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    :
                                                    <>
                                                        <div className='product-image' onClick={() => this.props.history.push('/product/details/' + item.product.id)}>
                                                            <img className="fav-img"
                                                                 src={item.product.photo === 'placeholder.jpg' ? require('../../images/image-placeholder.png') : 'https://api.universal.tom.ru/uploads/products/' + item.product.photo}
                                                            />
                                                        </div>
                                                        <div className='product-title' onClick={() => this.props.history.push('/product/details/' + item.product.id)}>
                                                            <small>Артикул {item.product.id} </small>
                                                            <p>{item.product.title}</p>
                                                        </div>

                                                        <div className='counter-cont'>
                                                            <div className='product-price'>
                                                                <p className='default-price'>{item.product.price} Р</p>
                                                            </div>
                                                            <form className=" counter rounded-pill" onSubmit={(e) => {
                                                                e.preventDefault()
                                                            }}>
                                                                <RemoveIcon className='w-25 ml-1'
                                                                            onClick={() => this.handleUpdate(item, key, false)}/>
                                                                <input
                                                                    name="desc"
                                                                    type="number"
                                                                    onChange={(e) => this.handleCountEdit(key, e.target.value)}
                                                                    required={true}
                                                                    placeholder={"Количество:"}
                                                                    value={item.count}
                                                                />
                                                                <AddIcon className='w-25 mr-1'
                                                                         onClick={() => this.handleUpdate(item, key, true)}/>
                                                            </form>
                                                            <div className='product-price'>
                                                                <p className="full-price">
                                                                    {item.new ?
                                                                        <span
                                                                            className="badge badge-success">Новинка!</span> : ''} {item.stock ?
                                                                    <span className="badge badge-danger">Акция!</span> : ''}
                                                                    {parseFloat((item.product.price * item.count).toFixed(2))} Р
                                                                    {item.product.balance === 0 ?
                                                                        <div className="alert alert-danger" role="alert">
                                                                            Этого товара нет в наличии. При оформлении
                                                                            заказа он
                                                                            не
                                                                            будет учтен.
                                                                        </div> : ''}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className='product-delete'>
                                                            <i className={'fa fa-trash text-black-50'}
                                                               onClick={() => this.handleDelete(key)}/>
                                                        </div>
                                                    </>
                                            }

                                        </div>
                                    );
                                }) :
                                this.state.ready ?
                                    <div>
                                        <div>
                                            <p>Ваша корзина пуста</p>
                                        </div>
                                    </div>
                                    :
                                    <div>
                                        <div>
                                            <CircularProgress/>
                                        </div>
                                    </div>
                            }
                        </div>
                        {
                            sum > 0
                                ?
                                <div className='product-amount'>
                                    <div className='basket-amount'>
                                        Итого:
                                        <br/>
                                        <span>{parseFloat((sum).toFixed(2))} Р</span>
                                        <div className='d-flex justify-content-center pt-4'>
                                            <Link to={'/user/order/add'}
                                                  style={{textDecoration: 'none'}}
                                                  className='custom-btn basket-btn d-flex align-items-center rounded-pill'>
                                                <CheckCircleOutlinedIcon className='mr-2'/>
                                                <p>Оформить заказ</p>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                :
                                null
                        }
                    </div>
                </div>

            );
        }
    }
}


export default withRouter(connect(
    (state) => ({
        token: state.token,
        basket: state.basket
    }),
    dispatch => ({
        onAddToken: (token) => {
            dispatch({type: 'ADD_TOKEN', payload: token})
        },
        onReloadMenu: () => {
            dispatch({ type: 'RELOAD', payload: true })
        },
        onBasketDelete: (id) => {
            dispatch({ type: 'BASKET_DELETE', id })
        }
    })
)(Basket));
