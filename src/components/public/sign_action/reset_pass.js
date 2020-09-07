/**
 * Created by misha on 27.01.19.
 */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AbstractForm from '../../abstract/form';

import { resetUrl } from '../../../services/parameters';
import {Link} from "react-router-dom";
import Breadcrumbs from "../../breadcrumbs";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";

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

                <div className="reset">
                    <Breadcrumbs
                        path={[
                            {title: 'Восставить пароль'}
                        ]}/>
                    <h4>Восставить пароль</h4>
                    <form onSubmit={this.handleSubmit}>
                        <div className='reset-form-input'>
                            <p className='mb-0'>E-mail</p>
                            <div className='form-control rounded-pill custom-input w-75'>
                                <input
                                    name="email"
                                    type="email"
                                    required={true}
                                    placeholder={'Введите Ваш E-mail'}
                                    ref={(input) => {
                                        this.emailInput = input
                                    }}
                                />
                                <span>*</span>
                            </div>
                        </div>
                        <div className='reset-submit-btns'>
                            <div className='second'>
                                <div className='reset-form-button'>
                                    <button type="submit" className="custom-btn rounded-pill w-100">
                                        <i className="fa fa-key fa-rotate-270 mr-2"/>
                                        <span>Восставить</span>
                                    </button>
                                </div>
                            </div>
                            <div className='reset-form-button'>
                                <button type="submit" className="custom-btn reg rounded-pill w-100">
                                    <Link to={'/register'} className='text-decoration-none'>
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