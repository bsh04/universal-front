/**
 * Created by misha on 27.01.19.
 */
import React from 'react';
import AbstractForm from '../abstract/form';
import {connect} from 'react-redux';

import Breadcrumbs from '../breadcrumbs';
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import {Link} from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

class DataChange extends AbstractForm {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({loading: true});

        let _this = this;
        let data = {
            'email': this.emailInput.value,
            'address': this.addressInput.value,
            'phone': this.phoneInput.value,
            'fio': this.nameInput.value,
        };

        this.state.request(
            'user/edit',
            'PUT',
            data,
            {},
            function (response) {
                _this.props.onAddUser(response);
                _this.setState({loading: false});
            },
            this.state.errorCallback
        );
    }

    viewForm() {
        return (
            <div className='image-background'>
                <div className="change-data">
                    <Breadcrumbs
                        path={[
                            {title: 'Регистрация'}
                        ]}/>
                    <h4>Изменение данных пользователя</h4>
                    <form onSubmit={this.handleSubmit}>
                        <div className='change-data-form-input'>
                            <p className='mb-0'>E-mail</p>
                            <div className='form-control rounded-pill custom-input w-75'>
                                <input
                                    name="email"
                                    type="email"
                                    required={true}
                                    placeholder={"Введите E-mail"}
                                    defaultValue={this.props.user.email}
                                    minLength={5}
                                    ref={(input) => {
                                        this.emailInput = input
                                    }}
                                />
                                <span>*</span>
                            </div>
                        </div>
                        <div className='change-data-form-input'>
                            <p className='mb-0'>Имя</p>
                            <div className='form-control rounded-pill custom-input w-75'>
                                <input
                                    name="fio"
                                    type="text"
                                    required={true}
                                    placeholder={"Введите имя"}
                                    defaultValue={this.props.user.fio}
                                    ref={(input) => {
                                        this.nameInput = input
                                    }}
                                />
                                <span>*</span>
                            </div>
                        </div>
                        <div className='change-data-form-input'>
                            <p className='mb-0'>Телефон</p>
                            <div className='form-control rounded-pill custom-input w-75'>
                                <input
                                    name="sname"
                                    type="text"
                                    required={true}
                                    placeholder={"Введите телефон"}
                                    defaultValue={this.props.user.phone}
                                    ref={(input) => {
                                        this.phoneInput = input
                                    }}
                                />
                                <span>*</span>
                            </div>
                        </div>
                        <div className='change-data-form-input'>
                            <p className='mb-0'>Адрес</p>
                            <div className='form-control rounded-pill custom-input w-75'>
                                <input
                                    name="fname"
                                    type="text"
                                    required={true}
                                    defaultValue={this.props.user.address}
                                    placeholder={"Введите адрес"}
                                    ref={(input) => {
                                        this.addressInput = input
                                    }}
                                />
                                <span>*</span>
                            </div>
                        </div>
                        <div className='change-data-form-button'>
                            <button type="submit" className="custom-btn rounded-pill w-100">
                                <PersonOutlineIcon className='mr-2 text-white'/>
                                <span>Изменить данные</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        user: state.user,
    }),
    dispatch => ({
        onAddUser: (user) => {
            dispatch({type: 'ADD_USER', payload: user})
        },
    })
)(DataChange);