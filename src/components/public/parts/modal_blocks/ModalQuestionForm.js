import React, { Component } from 'react';
import { ContactFormInput } from '../contact-form/ContactFormInput';
import { ContactFormSubmit } from '../contact-form/ContactFormSubmit';
import { ModalFrame } from '../modal/ModalFrame';
import { ContactFormAgreeLink } from '../contact-form/ContactFormAgreeLink';
import request from '../../../../services/ajaxManager';

export class ModalQuestionForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            name: '',
            message: '',
            tel: '',
            email: '',

            telView: '',
            
            captcha: '',
            captchaResult: '',
            userInputCaptcha: '',

            errName: null,
        }

    }

    componentDidMount() {
        this.makeCaptcha();
    }

    makeCaptcha() {
        let a = Math.ceil(Math.random()*10);
        let b = Math.ceil(Math.random()*10);

        let captcha = `${a} + ${b} = `

        let result = a + b;

        this.setState({
            captcha,
            captchaResult: result
        });
    }

    handleSubmit = () => {
        let data = {
            name: this.state.name,
            message: this.state.message,
            tel: this.state.tel,
            email: this.state.email
        }

        let fieldsValited = data.name.length > 1 && data.message.length > 1 && data.tel.length > 1 && data.email.length > 1;
        let captchaValited = parseInt(this.state.captchaResult) === parseInt(this.state.userInputCaptcha);

        if(!fieldsValited) {
            this.setState({
                errName: 'fields'
            });
        } else if(!captchaValited) {
            this.setState({
                errName: 'captcha'
            });
        } else if(fieldsValited && captchaValited) {
            let _this = this;

            request(
                'fb/',
                'POST',
                data,
                {},
                function(response) {
                    _this.setState({
                        name: '',
                        message: '',
                        tel: '',
                        email: '',

                        telView: '',
                        
                        captcha: '',
                        captchaResult: '',
                        userInputCaptcha: ''
                    }, () => {
                        _this.props.handleToggle();
                        _this.props.handleThanks();
                    })
                },
                function(err) {
                    
                }
            );
        }
    }

    render() {
        return (
            <ModalFrame visible={this.props.visible} handleToggle={this.props.handleToggle}>
                <div className="contact-form-title">Задать вопрос</div>
                {this.state.errName ?
                <span className="contact-form__err-text">
                    {this.state.errName === 'fields' ? 
                        'Все поля формы должны быть заполнены!' 
                        : this.state.errName === 'captcha' ? 'Проверночный код введен неверно!' : ''}
                </span>
                : null}
                <ContactFormInput 
                    type="text"
                    label={"Имя"}
                    onChange={(value) => this.setState({name: value})}
                    value={this.state.name}
                    width={12}
                    required
                />
                <ContactFormInput 
                    type="tel"
                    label={"Телефон"}
                    placeholder="+7 (XXX) XXX - XX - XX"
                    onChange={(value) => this.setState({
                        tel: value.tel,
                        telView: value.telView,
                    })}
                    value={this.state.telView}
                    width={12}
                    required
                />
                <ContactFormInput 
                    type="email"
                    label={"E-mail"}
                    placeholder="mailexample@mail.ru"
                    onChange={(value) => this.setState({email: value})}
                    value={this.state.email}
                    width={12}
                    required
                />
                <ContactFormInput 
                    type="text"
                    label={"Ваш вопрос"}
                    onChange={(value) => this.setState({message: value})}
                    value={this.state.message}
                    width={12}
                    required
                />
                <ContactFormInput 
                    type="text"
                    label={'Проверочный код'}
                    placeholder={this.state.captcha}
                    onChange={(value) => this.setState({userInputCaptcha: value})}
                    width={12}
                    required
                />
                <ContactFormAgreeLink link=""/>
                <ContactFormSubmit 
                    title="Отправить"
                    onClick={this.handleSubmit}
                />
                
            </ModalFrame>
        )
    }
}