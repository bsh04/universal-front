import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import Breadcrumbs from '../breadcrumbs';

import request from '../../services/ajaxManager';
import OrdersDetail from "./ordersDetail";
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import CircularProgress from '@material-ui/core/CircularProgress';

class Orders extends Component {
    constructor(props) {
        super(props);


        this.handleDuplicate = this.handleDuplicate.bind(this);

        this.state = {
            orders: [],
            message: [],
            showDetails: false,
            offset: 5,
            pickPage: 1
        };
    }

    componentDidMount() {
        this.handleGet();
    }

    handleGet() {
        let _this = this;
        request(
            'order/',
            'GET',
            null,
            {},
            async function (response) {
                _this.setState({orders: response});
                let numberItems = 0
                response.map(() => {
                    numberItems += 1
                })
                await _this.setState({numberPages: Math.ceil(numberItems / _this.state.offset)})
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
            function (response) {
                let arr = _this.state.message;
                arr[id] = response.message;
                _this.setState({message: arr});
            },
        );
    }

    pickPage(i) {
        this.setState({pickPage: i + 1})
    }

    renderNumberPages() {
        if (this.state.numberPages) {
            const items = []
            for (let i = 0; i < this.state.numberPages; i++) {
                if (i + 1 === this.state.pickPage) {
                    items.push(<p key={i} onClick={() => this.pickPage(i)} className='pick'>{i + 1}</p>)
                } else {
                    items.push(<p key={i} onClick={() => this.pickPage(i)}>{i + 1}</p>)
                }
            }
            return items
        }
    }

    render() {
        return (
            <div>
                <Breadcrumbs
                    path={[
                        {title: 'Мои заказы'}
                    ]}/>
                <h4 className='orders-label'>Мои заказы</h4>
                <div className='orders-headers-container'>
                    <div>
                        <p className='orders-header-number'>Номер заказа</p>
                        <p className='orders-header-date'>Дата</p>
                        <p className='orders-header-sum'>Сумма</p>
                    </div>
                </div>
                <div className='orders-body-container'>
                    {this.state.orders.length > 0 ? this.state.orders.map((order, key) => {
                        let sum = 0;
                        order.items.map(item => {
                            sum += item.count * item.product.price
                        })
                        let date = new Date(order.date);

                        let startRender, endRender

                        if (this.state.pickPage === 1) {
                            startRender = 1
                            endRender = this.state.offset
                        } else {
                            startRender = this.state.pickPage * this.state.offset - this.state.offset + 1
                            endRender = this.state.pickPage * this.state.offset
                        }
                        if ((key >= startRender) && (key <= endRender)) {
                            return (
                                <React.Fragment key={key}>
                                    <OrdersDetail index={key} date={date} sum={sum} order={order}/>
                                </React.Fragment>
                            )
                        }
                    }) : <div>
                        <CircularProgress className='mt-5'/>
                    </div>}
                </div>
                {
                    this.state.numberPages ?
                        <div className='pagination-cont'>
                            <div className='pagination-body'>
                                <DoubleArrowIcon
                                    className='fa-rotate-180 item'
                                    onClick={() => this.setState({pickPage: 1})}
                                />
                                <KeyboardArrowLeftIcon
                                    className='item'
                                    onClick={() =>
                                        this.setState(this.state.pickPage === 1
                                            ? null
                                            : {pickPage: this.state.pickPage - 1})}
                                />
                                <div className='number-pages-container'>
                                    {this.renderNumberPages()}
                                </div>
                                <KeyboardArrowRightIcon
                                    className='item'
                                    onClick={() =>
                                        this.setState(
                                            this.state.pickPage === this.state.numberPages
                                                ? null
                                                : {pickPage: this.state.pickPage + 1})}
                                />
                                <DoubleArrowIcon
                                    className='item'
                                    onClick={() =>
                                        this.setState({pickPage: this.state.numberPages})}
                                />
                            </div>
                        </div>
                        : null
                }
            </div>
        );
    }
}

export default Orders;
