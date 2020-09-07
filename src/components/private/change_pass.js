/**
 * Created by misha on 27.01.19.
 */
import React from 'react';
import AbstractForm from '../abstract/form';
import {connect} from 'react-redux';
import Breadcrumbs from '../breadcrumbs';
import '../../index.scss'
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import request from "../../services/ajaxManager";

class PassChange extends AbstractForm {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            mobileMode: false
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.getSizeWindow.bind(this));
    }

    getSizeWindow() {
        if (window.innerWidth > 1000) {
            this.setState({mobileMode: true})
        } else {
            this.setState({mobileMode: false})
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({loading: true});

        let _this = this;
        let data = {
            'current_pass': this.opassInput.value,
            'new_pass': this.cpassInput.value,
            'confirm_pass': this.cpassInput.value,
        };

        request(
            'user/change/password',
            'POST',
            data,
            {},
            function (response) {
                _this.setState({loading: false});
                _this.props.history.push('/');
            },
            this.state.errorCallback
        );
    }


    viewForm() {
        return (
            <div className="change-password">
                <Breadcrumbs
                    path={[
                        {title: 'Смена пароля'}
                    ]}/>
                <h4>Смена пароля</h4>
                <form onSubmit={this.handleSubmit}>
                    <div className='change-form-input'>
                        <p className='mb-0'>Старый пароль</p>
                        <div className='form-control rounded-pill custom-input w-75'>
                            <input
                                name="pass"
                                type="password"
                                placeholder='Введите старый пароль'
                                required={true}
                                ref={(input) => {
                                    this.opassInput = input
                                }}
                            />
                            <span>*</span>
                        </div>
                    </div>
                    <div className='change-form-input'>
                        <p className='mb-0'>Новый пароль</p>
                        <div className='form-control rounded-pill custom-input w-75'>
                            <input
                                name="pass"
                                type="password"
                                required={true}
                                placeholder='Введите новый пароль'
                                ref={(input) => {
                                    this.passInput = input
                                }}
                            />
                            <span>*</span>
                        </div>
                    </div>
                    <div className='change-form-input'>
                        <p className='mb-0'>Подтвердите пароль</p>
                        <div className='form-control rounded-pill custom-input w-75'>
                            <input
                                name="pass"
                                type="password"
                                required={true}
                                placeholder='Повторите новый пароль'
                                ref={(input) => {
                                    this.cpassInput = input
                                }}
                            />
                            <span>*</span>
                        </div>
                    </div>
                    <div className='change-form-button'>
                        <button type="submit" className="custom-btn rounded-pill">
                            <CheckCircleOutlinedIcon className='mr-2'/>
                            <span>Сменить пароль</span>
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default connect(
    state => ({
        store: state,
    }),
    dispatch => ({})
)(PassChange);