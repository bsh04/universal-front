/**
 * Created by misha on 27.01.19.
 */
import React from 'react';
import AbstractForm from '../abstract/form';
import { connect } from 'react-redux';

class OrderAdd extends AbstractForm {
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
            'address': this.addressInput.value,
            'phone': this.phoneInput.value,
            'comment': this.commentInput.value ? this.commentInput.value : null,
            'pay_type': 'money', //this.typeSelect.value,
        };

        this.state.request(
            'order/',
            'POST',
            data,
            {},
            function (response)
            {
                _this.setState({loading: false});
                _this.props.history.push('/user/order');
            },
            this.state.errorCallback
        );
    }

    viewForm() {
        return (
            <div className="w-75">
                <h4 className="text-center">Уточнение данных для заказа:</h4>
                <p className={'text-left'}>
                    ФИО: { this.props.user.fio } <br/>
                    Email: {this.props.user.email}
                </p>
                <form onSubmit={this.handleSubmit}>
                    <input
                        name="email"
                        type="text"
                        required={true}
                        placeholder={"Телефон:*"}
                        defaultValue={this.props.user.phone}
                        minLength={5}
                        className={'form-control '}
                        ref={(input) => {this.phoneInput = input}}
                    />
                    <input
                        name="fio"
                        type="text"
                        required={true}
                        placeholder={"Адрес:*"}
                        defaultValue={this.props.user.address}
                        className={'form-control '}
                        ref={(input) => {this.addressInput = input}}
                    />
                    <input
                        name="comment"
                        type="text"
                        required={false}
                        maxLength={250}
                        placeholder={"Комментарий к заказу"}
                        className={'form-control '}
                        ref={(input) => {this.commentInput = input}}
                    />
                    <p className={'text-left'}>
                        Доставка по г.Томску от 3000 руб бесплатна (кроме отдаленных районов).<br/>
                        Доставка по области Х руб/км.<br/>
                        Доставка до терминала указанной покупателем транспортной компании (почтовой службы) бесплатна
                    </p>
                    {/*<label>Способ оплаты</label>*/}
                    {/*<select className={'form-control'} ref={(input) => {this.typeSelect = input}}>*/}
                    {/*    <option value={'card'}>Картой курьеру</option>*/}
                    {/*    <option value={'money'}>Наличными курьеру</option>*/}
                    {/*</select>*/}
                    <br/>
                    <p className="text-center">
                        <button type="submit" className="btn btn-success">
                            <i className={'fa fa-check'}> <span>Оформить заказ</span></i>
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

    })
)(OrderAdd);