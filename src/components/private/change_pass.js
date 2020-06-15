/**
 * Created by misha on 27.01.19.
 */
import React from 'react';
import AbstractForm from '../abstract/form';
import { connect } from 'react-redux';
import Breadcrumbs from '../breadcrumbs';

class PassChange extends AbstractForm {
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
            'current_pass': this.opassInput.value,
            'new_pass': this.cpassInput.value,
            'confirm_pass': this.cpassInput.value,
        };

        this.state.request(
            'user/change/password',
            'POST',
            data,
            {},
            function (response)
            {
                _this.setState({loading: false});
                _this.props.history.push('/');
            },
            this.state.errorCallback
        );
    }

    viewForm() {
        return (
            <div className="w-75">
                <Breadcrumbs 
                    path={[
                        {title: 'Смена пароля'}
                    ]}/>
                <h4 className="text-center">Смена пароля</h4>
                <form onSubmit={this.handleSubmit}>
                    <input
                        name="pass"
                        type="password"
                        required={true}
                        placeholder={"Старый пароль:*"}
                        className={'form-control '}
                        ref={(input) => {this.opassInput = input}}
                    />
                    <input
                        name="pass"
                        type="password"
                        required={true}
                        placeholder={"Новый пароль:*"}
                        className={'form-control '}
                        ref={(input) => {this.passInput = input}}
                    />
                    <input
                        name="pass"
                        type="password"
                        required={true}
                        placeholder={"Подтвердите пароль:*"}
                        className={'form-control '}
                        ref={(input) => {this.cpassInput = input}}
                    />
                    <br/>
                    <p className="text-center">
                        <button type="submit" className="btn btn-success">
                            <i className={'fa fa-edit'}> <span>Сменить пароль</span></i>
                        </button>
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

    })
)(PassChange);