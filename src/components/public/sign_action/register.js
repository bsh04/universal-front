/**
 * Created by misha on 27.01.19.
 */
import React from 'react';
import AbstractForm from '../../abstract/form';

import { regUrl } from '../../../services/parameters';

class RegForm extends AbstractForm {
    constructor(props)
    {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e)
    {
        e.preventDefault();
        this.setState({loading: true});

        let re = /^\w+([\\.-]?\w+?-{0,4})*@\w+([\\.-]?\w+)*(\.\w{2,6})+$/;
        if (!re.test(this.emailInput.value))
        {
            alert('Поле "E-mail" заполненно некорректно'); //TODO: Выводить пользователю это
            this.setState({loading: false});
            return;
        }

        let _this = this;
        let data = {
            email: this.emailInput.value,
            pass: this.passInput.value,
            confirmPass: this.cpassInput.value,
            first_name: this.nameInput.value,
            last_name: this.snameInput.value,
        };

        this.state.request(regUrl, 'POST', data, {},
            function() {
                const {history} = _this.props;
                history.push('/login');
            }
        );
    }

    viewForm() {
        return (
            <div className="">
                <h4 className="text-center">Регистрация</h4>
                <form onSubmit={this.handleSubmit}>
                    <input
                        name="email"
                        type="email"
                        required={true}
                        placeholder={"E-mail:*"}
                        minLength={5}
                        className={'form-control '}
                        ref={(input) => {this.emailInput = input}}
                    />
                    <input
                        name="sname"
                        type="text"
                        required={true}
                        placeholder={"Фамилия:*"}
                        className={'form-control '}
                        ref={(input) => {this.snameInput = input}}
                    />
                    <input
                        name="name"
                        type="text"
                        required={true}
                        placeholder={"Имя:*"}
                        className={'form-control '}
                        ref={(input) => {this.nameInput = input}}
                    />
                    <input
                        name="pass"
                        type="password"
                        required={true}
                        placeholder={"Пароль:*"}
                        minLength={6}
                        className={'form-control '}
                        ref={(input) => {this.passInput = input}}
                    />
                    <input
                        name="cpass"
                        type="password"
                        required={true}
                        placeholder={"Еще пароль:*"}
                        className={'form-control '}
                        ref={(input) => {this.cpassInput = input}}
                    />
                    <p className="text-center">
                        <button type="submit" className="btn btn-success">Зарегистрироваться</button>
                    </p>
                </form>
            </div>
        );
    }
}

export default RegForm;