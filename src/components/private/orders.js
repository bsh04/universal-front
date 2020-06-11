import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import Breadcrumbs from '../breadcrumbs';

import request from '../../services/ajaxManager';

class Orders extends Component {
    constructor(props) {
        super(props);

        this.handleDuplicate = this.handleDuplicate.bind(this);

        this.state = {
            orders: [],
            message: [],
        };
    }

    componentDidMount() {
        this.handleGet();
    }

    handleGet()
    {
        let _this = this;
        request(
            'order/',
            'GET',
            null,
            {},
            function (response)
            {
                _this.setState({orders: response});
            },
        );
    }

    handleDuplicate(id) {
        let _this = this;
        request(
            'order/duplicate',
            'POST',
            {id: id},
            {},
            function (response)
            {
                let arr = _this.state.message;
                arr[id] = response.message;
                _this.setState({message: arr});
            },
        );
    }

    render() {
        return (
            <div>
                <Breadcrumbs 
                    path={[
                        {title: 'Мои заказы'}
                    ]}/>
                <h4 className="text-center">Мои заказы:</h4>
                <table className={"table table-striped table-hover"}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Описание</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.orders.length > 0 ? this.state.orders.map((order, key) => {
                            let sum = 0;
                            let date =  new Date(order.date);

                            return (
                                <tr key={key}>
                                    <td>{key + 1}</td>
                                    <td>
                                        <div data-toggle="collapse" data-target={"#collapseExample" + key} aria-expanded="false" aria-controls={"collapseExample" + key}>
                                            <p><b>Заказ от {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</b></p>
                                        </div>
                                        {order.items.map((item, key2) => {
                                            let isNew = Math.ceil(Math.abs(((new Date()) - (new Date(item.product.updated))) / (1000 * 60 * 60 * 24))) < 14;
                                            sum += item.count * item.product.price;

                                            return(
                                                <div key={key2} className="collapse" id={"collapseExample" + key}>
                                                    <h5 className={'text-left'}>{item.product.title}</h5>
                                                    <p className="card-text">
                                                        <small className="text-muted">Код товара: {item.product.id} </small> {item.product.new ? <span className="badge badge-success">Новинка!</span> : ''} {item.product.stock ? <span className="badge badge-danger">Акция!</span> : ''}<br/>
                                                        Цена: {item.product.price} * {item.count} = {item.product.price * item.count} р.
                                                        {item.product.balance == 0 ? <div className="alert alert-danger" role="alert">
                                                                Этого товара нет в наличии. При оформлении заказа он не будет учтен.
                                                            </div> : ''}
                                                    </p>
                                                    <br/>
                                                </div>
                                            );
                                        })}
                                        <p>
                                            <b>Итого: {sum} рублей.</b>
                                        </p>
                                    </td>
                                    <td>
                                        {!this.state.message[order.id] ?
                                            <button className={'btn btn-success'}
                                                    onClick={() => this.handleDuplicate(order.id)}>
                                                <i className={'fa fa-copy'}> Повторить заказ</i>
                                            </button> :
                                            <div className="alert alert-success" role="alert">
                                                <i className={'fa fa-check'}> {this.state.message[order.id]}</i>
                                            </div>
                                        }
                                    </td>
                                </tr>
                            );
                        }) : <tr>
                            <td colSpan={4}>Я еще ничего не заказывал(а)</td>
                        </tr> }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Orders;
