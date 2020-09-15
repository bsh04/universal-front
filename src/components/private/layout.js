/**
 * Created by misha on 27.01.19.
 */
import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";

import Favorite from './favorite';
import Basket from './basket';
import PassChange from './change_pass';
import DataChange from './change_data';
import OrderAdd from './order_add';
import Orders from './orders';
import Footer from "../public/footer";
import Header from "../header";
import {CategoriesContext} from "../../services/contexts";
import CategoryList from "../public/parts/category_list";

class UserLayout extends Component {
    

    componentDidUpdate() {
        if (this.props.token === false) {
            this.props.history.replace('/login');
        }
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            this.props.updateFrom(this.props.location.pathname);
        }
    }

    render() {
        console.log(this.props.location.pathname)
        return <CategoriesContext.Consumer>{contextValue => {
            let categories = null;
            let showCategoryList = null;

            let isMobile = contextValue.isMobile;

            if (contextValue.categories) {
                categories = contextValue.categories.map(item => {
                    if (item.children.length > 1) {
                        item.children = item.children.sort((current, next) => {
                            if (current.title < next.title) {
                                return -1;
                            }
                            if (current.title > next.title) {
                                return 1;
                            }
                            return 0
                        })
                    }
                    return item;
                });
            }

            showCategoryList = !!(!isMobile && categories);

            let background = null;
            let arr = ['login', 'data/change', '/password/change', '/password/reset', '/order/add', 'register', '/data/change']
            arr.forEach(item => this.props.location.pathname.indexOf(item) !== -1 ? background = true : null);
            

            return (
                <div>
                    <Header/>
                    <div className="row content">
                        <div className="flex-nowrap row w-100">
                            {showCategoryList
                            ? <CategoryList categories={categories} onClick={() => null}/>
                            : null}
                            <div className={`content-wrapper ${background ? 'image-background' : ''}`}>
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
                    </div>
                    <ScrollUpButton/>
                    <Footer/>
                </div>
            );
        }}
        </CategoriesContext.Consumer>
    }
}

export default withRouter(connect(
    (state, ownProps) => ({
        token: state.token
    }),
    dispatch => ({})
)(UserLayout));
