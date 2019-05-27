/**
 * Created by misha on 27.01.19.
 */
import React from 'react';
import AbstractForm from '../abstract/form';
import { connect } from 'react-redux';

class DataChange extends AbstractForm {
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
            function (response)
            {
                _this.props.onAddUser(response);
                _this.setState({loading: false});
            },
            this.state.errorCallback
        );
    }

    viewForm() {
        return (
            <div className="w-75">
                <h4 className="text-center">Изменение данных пользователя</h4>
                <form onSubmit={this.handleSubmit}>
                    <input
                        name="email"
                        type="email"
                        required={true}
                        placeholder={"E-mail:*"}
                        defaultValue={this.props.user.email}
                        minLength={5}
                        className={'form-control '}
                        ref={(input) => {this.emailInput = input}}
                    />
                    <input
                        name="fio"
                        type="text"
                        required={true}
                        placeholder={"Имя:*"}
                        defaultValue={this.props.user.fio}
                        className={'form-control '}
                        ref={(input) => {this.nameInput = input}}
                    />
                    <input
                        name="sname"
                        type="text"
                        required={true}
                        placeholder={"Телефон:*"}
                        defaultValue={this.props.user.phone}
                        className={'form-control '}
                        ref={(input) => {this.phoneInput = input}}
                    />
                    <input
                        name="fname"
                        type="text"
                        required={true}
                        defaultValue={this.props.user.address}
                        placeholder={"Адрес:*"}
                        className={'form-control '}
                        ref={(input) => {this.addressInput = input}}
                    />
                    <br/>
                    <p className="text-center">
                        <button type="submit" className="btn btn-success">
                            <i className={'fa fa-edit'}> Изменить данные</i>
                        </button>
                    </p>
                </form>
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
            dispatch({ type: 'ADD_USER', payload: user })
        },
    })
)(DataChange);