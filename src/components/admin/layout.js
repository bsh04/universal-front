/**
 * Created by misha on 27.01.19.
 */
import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";

import Menu from '../menu';
import ProductUpdate from './product_update';
import NoImageList from './products_no_image_list';
import NewsList from './news/news';
import StocksList from './news/stocks';
import ExportCategoryList from './to_csv';
import ArticleList from './article';
import DeliveryAndPayment from './delivery_and_payment';

class PrivateLayout extends Component {
    componentDidMount() {
        if (this.props.token === false || this.props.user.roles === undefined || this.props.user.roles.indexOf('ROLE_ADMIN') === -1)
        {
            this.props.history.replace('/login');
        }
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            this.props.updateFrom(this.props.location.pathname);
        }
    }

    render() {
        return (
            <div>
                <Menu />
                <div className="row content">
                    <div className='col-md-2'></div>
                    <div className='col-md-8'>
                        <Switch>
                            <Route exact path="/admin/product/update" component={ProductUpdate}/>
                            <Route exact path="/admin/product/image" component={NoImageList}/>
                            <Route exact path="/admin/news" component={NewsList}/>
                            <Route exact path="/admin/export" component={ExportCategoryList}/>
                            <Route exact path="/admin/stocks" component={StocksList}/>
                            <Route exact path="/admin/workshop" component={ArticleList}/>
                            <Route exact path="/admin/deliveryandpayment" component={DeliveryAndPayment}/>
                        </Switch>
                    </div>
                    <div className='col-md-2'>
                    </div>
                </div>
                <ScrollUpButton />
            </div>
        );
    }
}

export default withRouter(connect(
    (state, ownProps) => ({
        token: state.token,
        user: state.user,
    }),
    dispatch => ({})
)(PrivateLayout));
