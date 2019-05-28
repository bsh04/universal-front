/**
 * Created by misha on 27.01.19.
 */
import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Menu from '../menu';
import Favorite from './favorite';
import Basket from './basket';
import PassChange from './change_pass';
import DataChange from './change_data';
import OrderAdd from './order_add';
import Orders from './orders';
import CategoryList from "../public/parts/category_list";
import Footer from "../public/footer";

class UserLayout extends Component {
    componentDidUpdate() {
        if (this.props.token === false)
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
                    <div className='col-md-3'>
                        <CategoryList/>
                    </div>
                    <div className='col-md-9'>
                        <Switch>
                            <Route exact path="/user/favorite" component={Favorite}/>
                            <Route exact path="/user/order/add" component={OrderAdd}/>
                            <Route exact path="/user/order" component={Orders}/>
                            <Route exact path="/user/data/change" component={DataChange}/>
                            <Route exact path="/user/basket" component={Basket}/>
                            <Route exact path="/user/password/change" component={PassChange}/>
                        </Switch>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(
    (state, ownProps) => ({
        token: state.token
    }),
    dispatch => ({})
)(UserLayout));
