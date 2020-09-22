/**
 * Created by misha on 27.01.19.
 */
import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";

import Header from '../header';
import ProductUpdate from './product_update';
import NoImageList from './products_no_image_list';
import NewsList from './news/news';
import StocksList from './news/stocks';
import ExportCategoryList from './to_csv';
import ArticleList from './article';
import DeliveryAndPayment from './delivery_and_payment';
import {CategoriesContext} from "../../services/contexts";
import CategoryList from "../public/parts/category_list";
import ProductStatus from "./product_type/product_type";

class PrivateLayout extends Component {
    componentDidMount() {
        if (this.props.token === false || this.props.user.roles === undefined || this.props.user.roles.indexOf('ROLE_ADMIN') === -1) {
        }
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            this.props.updateFrom(this.props.location.pathname);
        }
    }

    render() {
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

            return (
                <div>
                    <Header/>
                    <div className="row content">
                        <div className="flex-nowrap row w-100">
                            {showCategoryList
                            ? <CategoryList categories={categories} onClick={() => null}/>
                            : null}
                            <div className={`content-wrapper`}>
                                <Switch>
                                    <Route exact path="/admin/product/update" component={ProductUpdate}/>
                                    <Route exact path="/admin/product/image" component={NoImageList}/>
                                    <Route exact path="/admin/news" component={NewsList}/>
                                    <Route exact path="/admin/export" component={ExportCategoryList}/>
                                    <Route exact path="/admin/stocks" component={StocksList}/>
                                    <Route exact path="/admin/workshop" component={ArticleList}/>
                                    <Route exact path="/admin/deliveryandpayment" component={DeliveryAndPayment}/>
                                    <Route exact path="/admin/product/type" component={ProductStatus}/>
                                </Switch>
                            </div>
                        </div>
                    </div>
                    <ScrollUpButton/>
                </div>
            );
            
        }}
        </CategoriesContext.Consumer>
    }
}

export default withRouter(connect(
    (state, ownProps) => ({
        token: state.token,
        user: state.user,
    }),
    dispatch => ({})
)(PrivateLayout));
