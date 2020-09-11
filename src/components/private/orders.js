import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import Breadcrumbs from '../breadcrumbs';

import request from '../../services/ajaxManager';
import OrdersDetail from "./ordersDetail";
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import CircularProgress from '@material-ui/core/CircularProgress';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Pagination from "../pagination";
import login from "../public/sign_action/login";

class Orders extends Component {
    constructor(props) {
        super(props);


        this.handleDuplicate = this.handleDuplicate.bind(this);
        this.handleRenderList = this.handleRenderList.bind(this)

        this.state = {
            orders: [],
            message: [],
            showDetails: false,
            pickPage: 1,
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
            function (response) {
                _this.setState({orders: response});
                let numberItems = 0
                response.map(() => {
                    numberItems += 1
                })
                _this.setState({numberItems: numberItems-1})
            },
        );
    }

    handleRenderList(start, end) {
        this.setState({start, end})
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

                        if ((key >= this.state.start) && (key <= this.state.end)) {
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
                    this.state.numberItems ?
                        <Pagination handleRenderList={this.handleRenderList} numberItems={this.state.numberItems} offset={6}/>
                        : null
                }
            </div>
        );
    }
}

export default Orders;
