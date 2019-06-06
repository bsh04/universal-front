/**
 * Created by misha on 27.01.19.
 */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AbstractForm from '../../abstract/form';

import { resetUrl } from '../../../services/parameters';
import {Link} from "react-router-dom";

class ResetForm extends AbstractForm {
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

        this.state.request(
            resetUrl + this.emailInput.value,
            'GET',
            {},
            {},
            function() {
                _this.setState({message: true, loading: false});
            },
            function () {
                _this.setState({loading: false});
            },
        );
    }

    viewForm() {
        if (!this.state.message) {
            return (
                <div className="">
                    <h4 className="text-center">Восстановить пароль</h4>
                    <form onSubmit={this.handleSubmit}>
                        <input
                            name="email"
                            type="email"
                            required={true}
                            placeholder={"E-mail:*"}
                            minLength={5}
                            className={'form-control '}
                            ref={(input) => {
                                this.emailInput = input
                            }}
                        />
                        <br/>
                        <p className="text-center">
                            <button type="submit" className="btn btn-success">
                                <i className={'fa fa-key'}> <span>Восстановить</span></i>
                            </button>
                        </p>
                    </form>
                    <Link to={'/login'} className="btn btn-primary">
                        <i className={'fa fa-sign-in'}> <span>Вход</span></i>
                    </Link>
                </div>
            );
        }
        else {
            return(
                <div>
                    <div className="alert alert-success" role="alert">
                        <i className={'fa fa-check'}> Проверьте пожалуйста почту. Вам выслана ссылка для восстановления пароля.<br/>
                        Если письма нет, проверьте пожалуйста в спаме.</i>
                    </div>
                </div>
            );
        }
    }
}

export default withRouter(connect(
    (state, ownProps) => ({

    }),
    dispatch => ({})
)(ResetForm));