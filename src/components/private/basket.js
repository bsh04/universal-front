import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import request from '../../services/ajaxManager';

class Basket extends Component {
    constructor(props) {
        super(props);

        this.handleUpdate = this.handleUpdate.bind(this);

        this.state = {
            products: [],
        };
    }

    componentDidMount() {
        this.handleGet();
    }

    handleGet()
    {
        let _this = this;
        request(
            'product/basket',
            'GET',
            null,
            {},
            function (response)
            {
                _this.setState({products: response});
            },
        );
    }

    handleUpdate(key, value) {
        let data = {
            id: this.state.products[key].id,
            count: value
        };

        let _this = this;

        request(
            'product/basket',
            'PUT',
            data,
            {},
            function (response)
            {
                let arr = _this.state.products;
                arr[key] = response;
                _this.setState({products: arr});
            },
            this.state.errorCallback
        );
    }

    handleDelete(key)
    {
        let data = {
            id: this.state.products[key].id,
        };

        let _this = this;

        request(
            'product/basket',
            'DELETE',
            data,
            {},
            function (response)
            {
                let arr = _this.state.products;
                arr.splice(key, 1);
                _this.setState({products: arr});
            },
            this.state.errorCallback
        );
    }

    render() {
        let sum = 0;
        this.state.products.forEach((item) => {
           sum += item.count * item.product.price;
        });

        return (
            <div>
                <h4 className="text-center">Моя корзина:</h4>
                <table className={"table table-striped table-hover"}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th></th>
                            <th>Описание</th>
                            <th>Управление</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.products.length > 0 ? this.state.products.map((item, key) => {
                            return (
                                <tr key={key}>
                                    <td>{key + 1}</td>
                                    <td>
                                        <img className="fav-img" src={item.product.photo === 'placeholder.jpg' ? require('../../images/image-placeholder.png') : 'https://api.universal.tom.ru/uploads/products/' + item.product.photo } alt="Card image cap"/>
                                    </td>
                                    <td>
                                        <h5 className={'text-left'}>{item.product.title}</h5>
                                        <p className="card-text">
                                            <small className="text-muted">Код товара: {item.product.id} </small> {item.new ? <span className="badge badge-success">Новинка!</span> : ''} {item.stock ? <span className="badge badge-danger">Акция!</span> : ''}<br/>
                                            Цена: {item.product.price} * {item.count} = {item.product.price * item.count} р.
                                        </p>
                                        <form className="form-inline" onSubmit={(e) => {e.preventDefault()}}>
                                            <div className="input-group mb-2 mr-sm-2">
                                                <input
                                                    name="desc"
                                                    type="number"
                                                    required={true}
                                                    placeholder={"Количество:"}
                                                    min={1}
                                                    defaultValue={item.count}
                                                    className="form-control mb-1 mr-sm-1"
                                                    onChange={(e) => {
                                                        this.handleUpdate(key, e.target.value);
                                                    }}
                                                />
                                            </div>
                                        </form>
                                    </td>
                                    <td>
                                        <button className={'btn btn-danger'}
                                                onClick={() => this.handleDelete(key)}>
                                            <i className={'fa fa-trash'}> <span>Удалить</span></i>
                                        </button>
                                    </td>
                                </tr>
                            );
                        }) : <tr>
                            <td colSpan={4}>Моя корзина пуста</td>
                        </tr> }
                        {this.state.products.length > 0 ? <tr>
                            <td colSpan={3}>
                                <p className={'h5'}>Итого: {sum} рублей.</p>
                            </td>
                            <td>
                                <Link to={'/user/order/add'} className={'btn btn-success'}>
                                    <i className={'fa fa-check'}> <span>Оформить заказ</span></i>
                                </Link>
                            </td>
                        </tr> : null}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Basket;
