import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import request from '../../services/ajaxManager';

class Orders extends Component {
    constructor(props) {
        super(props);

        this.state = {
            orders: [],
        };
    }

    componentWillMount() {
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

    render() {
        return (
            <div>
                <h4 className="text-center">Мои заказы:</h4>
                <table className={"table table-striped table-hover"}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th></th>
                            <th>Описание</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.orders.length > 0 ? this.state.orders.map((order, key) => {
                            let sum = 0;

                            return (
                                <tr key={key}>
                                    <td>{key + 1}</td>
                                    <td colSpan={2}>
                                        <div data-toggle="collapse" data-target={"#collapseExample" + key} aria-expanded="false" aria-controls={"collapseExample" + key}>
                                            <p><b>Заказ</b></p>
                                        </div>
                                        {order.items.map((item, key2) => {
                                            let isNew = Math.ceil(Math.abs(((new Date()) - (new Date(item.product.updated))) / (1000 * 60 * 60 * 24))) < 14;
                                            sum += item.count * item.product.price;

                                            return(
                                                <div key={key2} className="collapse" id={"collapseExample" + key}>
                                                    <h5 className={'text-left'}>{item.product.title}</h5>
                                                    <p className="card-text">
                                                        <small className="text-muted">Код товара: {item.product.id} </small> {isNew ? <span className="badge badge-success">Новинка!</span> : ''}<br/>
                                                        Цена: {item.product.price} * {item.count} = {item.product.price * item.count} р.
                                                    </p>
                                                    <br/>
                                                </div>
                                            );
                                        })}
                                        <br/>
                                        <p>
                                            <b>Итого: {sum} рублей.</b>
                                        </p>
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
