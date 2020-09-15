/**
 * Created by misha on 27.01.19.
 */
import React from 'react';
import AbstractForm from '../abstract/form';
import {connect} from 'react-redux';
import Breadcrumbs from "../breadcrumbs";
import {Link} from "react-router-dom";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import delivery from '../../images/delivery.png'
import parcel from '../../images/parcel.png'
import shipment from '../../images/shipment.png'

class OrderAdd extends AbstractForm {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
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
            function (response) {
                _this.setState({loading: false});
                _this.props.history.push('/user/order');
            },
            this.state.errorCallback
        );
    }

    viewForm() {
        return (
            <div className="order-add">
                <Breadcrumbs
                    path={[
                        {title: 'Уточнение данных для заказа'}
                    ]}/>
                <h4>Уточнение данных для заказа</h4>
                <hr className='hr-1'/>
                <div className='mobile-mode'>
                    <div className='order-add-text'>
                        <p>
                            Имя
                        </p>
                        <p>
                            {this.props.user.fio}
                        </p>
                    </div>
                    <hr className='hr-2'/>
                    <div className='order-add-text'>
                        <p>
                            Email
                        </p>
                        <p>
                            {this.props.user.email}
                        </p>
                    </div>
                    <hr className='hr-3'/>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className='order-add-form-input'>
                        <p>Телефон</p>
                        <div className='form-control rounded-pill custom-input'>
                            <input
                                name="email"
                                type="text"
                                required={true}
                                placeholder={"+7 (ХХХ) - ХХХ - ХХ - ХХ"}
                                defaultValue={this.props.user.phone}
                                minLength={5}
                                ref={(input) => {
                                    this.phoneInput = input
                                }}
                            />
                            <span>*</span>
                        </div>
                    </div>
                    <div className='order-add-form-input'>
                        <p>Адрес</p>
                        <div className='form-control rounded-pill custom-input'>
                            <input
                                className='custom-input'
                                name="fio"
                                type="text"
                                required={true}
                                placeholder={"Введите Ваш адрес"}
                                defaultValue={this.props.user.address}
                                ref={(input) => {
                                    this.addressInput = input
                                }}
                            />
                            <span>*</span>
                        </div>
                    </div>
                    <div className='order-add-form-input'>
                        <p>Комментарий к заказу</p>
                        <div className='form-control rounded-pill custom-input'>
                            <input className='custom-input'
                                    name="comment"
                                    type="text"
                                    required={false}
                                    maxLength={250}
                                    ref={(input) => {
                                        this.commentInput = input
                                    }}
                            />
                            <span>*</span>
                        </div>
                    </div>
                    <hr/>
                    <div className='order-add-delivery'>
                        <div className='paragraph'>
                            <img src={parcel} alt=""/>
                            <p>Доставка по г.Томску от 3000 руб бесплатна (кроме отдаленных районов)</p>
                        </div>
                        <div className='paragraph'>
                            <img src={shipment}/>
                            <p>Доставка по области Х руб/км</p>
                        </div>
                        <div className='paragraph'>
                            <img src={delivery}/>
                            <p>
                                Доставка до терминала указанной покупателем транспортной компании (почтовой службы)
                                бесплатна</p>
                        </div>
                    </div>
                    <hr className='hr-4'/>
                    <div className='order-add-button'>
                        <button type="submit" className="custom-btn rounded-pill w-100">
                            <CheckCircleOutlinedIcon className='text-white'/>
                            <span>Оформить заказ</span>
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default connect(
    state => ({
        user: state.user,
    }),
    dispatch => ({})
)(OrderAdd);