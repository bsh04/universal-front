import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import Breadcrumbs from '../breadcrumbs';

import request from '../../services/ajaxManager';
import OrdersDetail from "./ordersDetail";

import CircularProgress from '@material-ui/core/CircularProgress';

import { TruePagination } from '../truePagination';
import { parsePage } from '../../services/parsePage';

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
            ready: false,
            start: 0,
            end: 15
        };
    }

    componentDidMount() {
        this.handleGet();
    }


    componentDidUpdate(prevProps, prevState) {

        if(JSON.stringify(this.props.location.pathname) !== JSON.stringify(prevProps.location.pathname) 
        || JSON.stringify(this.props.location.search) !== JSON.stringify(prevProps.location.search)) {
           
            this.handleGet(parsePage());
        }
    }

    handleGet() {
        let _this = this;
        request(
            'order/',
            'GET',
            null,
            {},
            function (response) {
                _this.setState({orders: response, ready: true});
                let numberItems = 0
                response.map(() => {
                    numberItems += 1
                })
                _this.setState({numberItems: numberItems - 1})
            },
        );
    }

    handleRenderList = (page) => {
        let start = (page - 1) * 15
        let end = page * 15
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
            <div className='orders'>
                <Breadcrumbs
                    path={[
                        {title: 'Мои заказы'}
                    ]}/>
                <h4 className='orders-label'>Мои заказы</h4>
                {
                    this.state.ready
                        ?
                        <>
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

                                    if ((key >= this.state.start) && (key < this.state.end)) {
                                        return (
                                            <React.Fragment key={key}>
                                                <OrdersDetail index={key} date={date} sum={sum} order={order}/>
                                            </React.Fragment>
                                        )
                                    }
                                }) : <div>
                                    <p>У вас нет заказов</p>
                                </div>}
                            </div>
                        </>
                        :
                        <div>
                            <CircularProgress className='mt-5'/>
                        </div>
                }

                {
                    this.state.numberItems ?
                        <TruePagination 
                            numberOfPages={Math.ceil((this.state.numberItems + 1) / 15)}
                            onPageSelect={(page) => {
                                this.props.history.push(`?page=${page}`)
                                this.handleRenderList(page)
                            }}
                        />
                        : null
                }
            </div>
        );
    }
}

export default Orders;
