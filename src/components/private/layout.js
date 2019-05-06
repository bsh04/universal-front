/**
 * Created by misha on 27.01.19.
 */
import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Menu from '../menu';

class PrivateLayout extends Component {
    componentDidUpdate() {
        if (this.props.token === false)
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
                            {/* <Route exact path="/my/subscribers" component={SubscriberList}/>
                            <Route exact path="/my/orders" component={OrderList}/>
                            <Route exact path="/my/pages" component={PageList}/>
                            <Route exact path="/my/news" component={NewsList}/>
                            <Route exact path="/my/pages/add" component={PageSettings}/>
                            <Route exact path="/my/pages/edit/:id" component={PageSettings}/>
                            <Route exact path="/my/news/add" component={NewsSettings}/>
                            <Route exact path="/my/contact/messages" component={ContactMessageList}/> */}
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
        token: state.token
    }),
    dispatch => ({})
)(PrivateLayout));
