/**
 * Created by misha on 27.01.19.
 */
import React from 'react';
import AbstractForm from '../../abstract/form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { loginUrl, clientId, clientSecret } from '../../../services/parameters';
import request from "../../../services/ajaxManager";

class LoginForm extends AbstractForm {
    constructor(props)
    {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.updateFavorites = this.updateFavorites.bind(this);
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
                _this.updateUser(response.access_token, () => _this.props.onAddToken(response.access_token));
                _this.updateFavorites(response.access_token);
            },
            this.state.errorCallback
        );
    }

    updateUser(token, callback)
    {
        let _this = this;

        request(
            'user/get',
            'GET',
            null,
            {"Authorization": 'Bearer ' + token},
            function (response)
            {
                _this.props.onAddUser(response);
                callback();
            },
            this.state.errorCallback
        );
    }

    updateFavorites(token) {
        let _this = this;

        request(
            'product/favorite',
            'GET',
            null,
            {"Authorization": 'Bearer ' + token},
            function (response)
            {
                _this.props.onAddFav(response);
            },
        );
    }

    viewForm() {
        return (
            <div className="w-75">
                <h4 className="text-center">Войти</h4>
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
                        placeholder={"Пароль:*"}
                        className={'form-control '}
                        ref={(input) => {this.passInput = input}}
                    />
                    <br/>
                    <p className="text-center">
                        <button type="submit" className="btn btn-success">
                            <i className={'fa fa-sign-in'}> Войти</i>
                        </button>
                    </p>
                </form>
                <Link to={'/register'} className="btn btn-primary">
                    <i className={'fa fa-user-plus'}> Регистрация</i>
                </Link>
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
        },
        onAddUser: (user) => {
            dispatch({ type: 'ADD_USER', payload: user })
        },
        onAddFav: (products) => {
            dispatch({ type: 'ADD_FAVORITE', payload: products })
        },
    })
)(LoginForm);