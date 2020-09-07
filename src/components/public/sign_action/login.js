/**
 * Created by misha on 27.01.19.
 */
import React from 'react';
import AbstractForm from '../../abstract/form';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';

import {loginUrl, clientId, clientSecret} from '../../../services/parameters';
import request from "../../../services/ajaxManager";
import Breadcrumbs from "../../breadcrumbs";
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

class LoginForm extends AbstractForm {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }

    handleSubmit(e) {
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
            function (response) {
                _this.updateUser(response.access_token, () => _this.props.onAddToken(response.access_token));
            },
            this.state.errorCallback
        );
    }

    updateUser(token, callback) {
        let _this = this;

        request(
            'user/get',
            'GET',
            null,
            {"Authorization": 'Bearer ' + token},
            function (response) {
                _this.props.onAddUser(response);
                callback();
            },
            this.state.errorCallback
        );
    }

    viewForm() {
        return (
            <div className="change-password">
                <Breadcrumbs
                    path={[
                        {title: 'Вход'}
                    ]}/>
                <h4>Вход</h4>
                <form onSubmit={this.handleSubmit}>
                    <div className='form-input'>
                        <p className='mb-0'>E-mail</p>
                        <div className='form-control rounded-pill custom-input w-75'>
                            <input
                                name="email"
                                type="email"
                                required={true}
                                ref={(input) => {
                                    this.emailInput = input
                                }}
                            />
                            <span>*</span>
                        </div>
                    </div>
                    <div className='form-input'>
                        <p className='mb-0'>Пароль</p>
                        <div className='form-control rounded-pill custom-input w-75'>
                            <input
                                name="pass"
                                type="password"
                                required={true}
                                ref={(input) => {
                                    this.passInput = input
                                }}
                            />
                            <span>*</span>
                        </div>
                    </div>
                    <div className='submit-btns'>
                        <div className='second'>
                            <div className='form-button'>
                                <button type="submit" className="custom-btn rounded-pill w-100">
                                    <ExitToAppIcon className='mr-2'/>
                                    <span>Войти</span>
                                </button>
                            </div>
                            <Link to={'/password/reset'} className='custom-link'>Восстановить пароль</Link>
                        </div>
                        <div className='form-button'>
                            <button type="submit" className="custom-btn reg rounded-pill w-100">
                                <Link to={'/register'}>
                                    <PersonOutlineIcon className='mr-2 text-white'/>
                                    <span>Зарегистрироваться</span>
                                </Link>
                            </button>
                        </div>

                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(connect(
    state => ({
        store: state,
    }),
    dispatch => ({
        onAddToken: (token) => {
            dispatch({type: 'ADD_TOKEN', payload: token})
        },
        onAddUser: (user) => {
            dispatch({type: 'ADD_USER', payload: user})
        },
    })
)(LoginForm));