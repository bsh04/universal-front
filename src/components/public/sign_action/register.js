/**
 * Created by misha on 27.01.19.
 */
import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import AbstractForm from '../../abstract/form';

import {regUrl} from '../../../services/parameters';
import {Link} from "react-router-dom";
import Breadcrumbs from "../../breadcrumbs";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";

class RegForm extends AbstractForm {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({loading: true});

        let re = /^\w+([\\.-]?\w+?-{0,4})*@\w+([\\.-]?\w+)*(\.\w{2,6})+$/;
        if (!re.test(this.emailInput.value)) {
            alert('Поле "E-mail" заполненно некорректно'); //TODO: Выводить пользователю это
            this.setState({loading: false});
            return;
        }

        let _this = this;
        let data = {
            email: this.emailInput.value,
            pass: this.passInput.value,
            confirmPass: this.cpassInput.value,
            fio: this.nameInput.value,
            phone: this.phoneInput.value,
            address: this.addressInput.value,
        };

        this.state.request(regUrl, 'POST', data, {},
            function () {
                const {history} = _this.props;
                history.push('/login');
            }
        );
    }

    viewForm() {
        return (


            <div className="register">
                <Breadcrumbs
                    path={[
                        {title: 'Регистрация'}
                    ]}/>
                <h4>Регистрация</h4>
                <form onSubmit={this.handleSubmit}>
                    <div className='register-form-input'>
                        <p className='mb-0'>E-mail</p>
                        <div className='form-control rounded-pill custom-input w-75'>
                            <input
                                name="email"
                                type="email"
                                required={true}
                                minLength={5}
                                ref={(input) => {
                                    this.emailInput = input
                                }}
                            />
                            <span>*</span>
                        </div>
                    </div>
                    <div className='register-form-input'>
                        <p className='mb-0'>Имя</p>
                        <div className='form-control rounded-pill custom-input w-75'>
                            <input
                                name="fio"
                                type="text"
                                required={true}
                                ref={(input) => {
                                    this.nameInput = input
                                }}
                            />
                            <span>*</span>
                        </div>
                    </div>
                    <div className='register-form-input'>
                        <p className='mb-0'>Телефон</p>
                        <div className='form-control rounded-pill custom-input w-75'>
                            <input
                                name="sname"
                                type="text"
                                required={true}
                                placeholder={"+7 (XXX) XXX - XX - XX"}
                                ref={(input) => {
                                    this.phoneInput = input
                                }}
                            />
                            <span>*</span>
                        </div>
                    </div>
                    <div className='register-form-input'>
                        <p className='mb-0'>Адрес</p>
                        <div className='form-control rounded-pill custom-input w-75'>
                            <input
                                name="fname"
                                type="text"
                                required={true}
                                ref={(input) => {
                                    this.addressInput = input
                                }}
                            />
                            <span>*</span>
                        </div>
                    </div>
                    <div className='register-form-input'>
                        <p className='mb-0'>Пароль</p>
                        <div className='form-control rounded-pill custom-input w-75'>
                            <input
                                name="pass"
                                type="password"
                                required={true}
                                placeholder={"Введите пароль"}
                                minLength={6}
                                ref={(input) => {
                                    this.passInput = input
                                }}
                            />
                            <span>*</span>
                        </div>
                    </div>
                    <div className='register-form-input'>
                        <p className='mb-0'>Еще пароль</p>
                        <div className='form-control rounded-pill custom-input w-75'>
                            <input
                                name="cpass"
                                type="password"
                                required={true}
                                placeholder={"Повторите пароль"}
                                ref={(input) => {
                                    this.cpassInput = input
                                }}
                            />
                            <span>*</span>
                        </div>
                    </div>
                    <div className='register-submit-btns'>
                        <div className='register-form-button'>
                            <button type="submit" className="custom-btn rounded-pill w-100">
                                <PersonOutlineIcon className='mr-2 text-white'/>
                                <span>Зарегистрироваться</span>
                            </button>
                        </div>
                        <div className='register-form-button-login'>
                            <button type="submit" className="custom-btn reg rounded-pill w-100">
                                <Link to={'/login'} className='text-decoration-none'>
                                    <ExitToAppIcon className='mr-2 text-white'/>
                                    <span>Вход</span>
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
    (state, ownProps) => ({}),
    dispatch => ({})
)(RegForm));