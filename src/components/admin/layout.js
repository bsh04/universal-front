/**
 * Created by misha on 27.01.19.
 */
import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Menu from '../menu';
import ProductUpdate from './product_update';
import NewsList from './news/news';

class PrivateLayout extends Component {
    componentDidMount() {
        if (this.props.token === false || this.props.user.roles === undefined || this.props.user.roles.indexOf('ROLE_ADMIN') === -1)
        {
            this.props.history.replace('/login');
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
                            <Route exact path="/admin/news" component={NewsList}/>
                        </Switch>
                    </div>
                    <div className='col-md-2'>
                    </div>
                </div>
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
