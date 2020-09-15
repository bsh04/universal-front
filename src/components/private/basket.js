import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import Breadcrumbs from '../breadcrumbs';

import request from '../../services/ajaxManager';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import CircularProgress from "@material-ui/core/CircularProgress";

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
        if (window.innerWidth < 1000) this.setState({mobileMode: true})
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
                arr.splice(key, 1);
                _this.setState({products: arr});
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
                                                        <div className='product-image'>
                                                            <img className="fav-img"
                                                                 src={item.product.photo === 'placeholder.jpg' ? require('../../images/image-placeholder.png') : 'https://api.universal.tom.ru/uploads/products/' + item.product.photo}
                                                                 alt="Card image cap"
                                                                // style={{width: '80%', height: '80%'}}
                                                            />
                                                        </div>
                                                        <div className='product-title'>
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
                                                                readOnly={true}
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
                                                                        Этого товара нет в наличии. При оформлении заказа он
                                                                        не
                                                                        будет учтен.
                                                                    </div> : ''}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                :
                                                <>
                                                    <div className='product-image'>
                                                        <img className="fav-img"
                                                             src={item.product.photo === 'placeholder.jpg' ? require('../../images/image-placeholder.png') : 'https://api.universal.tom.ru/uploads/products/' + item.product.photo}
                                                             alt="Card image cap"
                                                        />
                                                    </div>
                                                    <div className='product-title'>
                                                        <small>Артикул {item.product.id} </small>
                                                        <p>{item.product.title}</p>
                                                    </div>

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
                                                            readOnly={true}
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
                                                                    Этого товара нет в наличии. При оформлении заказа он не
                                                                    будет учтен.
                                                                </div> : ''}
                                                        </p>
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
                                              className='custom-btn w-75 d-flex align-items-center rounded-pill'>
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

export default Basket;
