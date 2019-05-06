/**
 * Created by misha on 27.01.19.
 */
import React from 'react';
import AbstractForm from '../../abstract/form';
import { connect } from 'react-redux';

import { loginUrl, clientId, clientSecret } from '../../../services/parameters';

class LoginForm extends AbstractForm {
    constructor(props)
    {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e)
    {
        e.preventDefault();
        this.setState({loading: true});

        let _this = this;
        let data = {
            'grant_type': 'password',
            'username': this.emailInput.value,
            'password': this.passInput.value,
            'client_id': clientId,
            'client_secret': clientSecret,
        };

        this.state.request(
            loginUrl,
            'POST',
            data,
            {},
            function (response)
            {
                _this.props.onAddToken(response.access_token);
            },
            this.state.errorCallback
        );
    }

    viewForm() {
        return (
            <div className="">
                <h4 className="text-center">Sign In</h4>
                <form onSubmit={this.handleSubmit}>
                    <input
                        name="email"
                        type="email"
                        required={true}
                        placeholder={"E-mail:*"}
                        className={'form-control '}
                        ref={(input) => {this.emailInput = input}}
                    />
                    <input
                        name="pass"
                        type="password"
                        required={true}
                        placeholder={"Password:*"}
                        className={'form-control '}
                        ref={(input) => {this.passInput = input}}
                    />
                    <p className="text-center">
                        <button type="submit" className="btn btn-success">Sign In</button>
                    </p>
                </form>
            </div>
        );
    }
}

export default connect(
    state => ({
        store: state,
    }),
    dispatch => ({
        onAddToken: (token) => {
            dispatch({ type: 'ADD_TOKEN', payload: token })
        }
    })
)(LoginForm);