import React, { Component } from 'react';
import { ContactFormInput } from './contact-form/ContactFormInput';
import { ContactFormSubmit } from './contact-form/ContactFormSubmit';
import { ContactFormAgreeLink } from './contact-form/ContactFormAgreeLink';
import request from '../../../services/ajaxManager';

export default class ContactForm extends Component {
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
            isSuccess: false
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

        let fieldsValited = data.name.length > 1 && data.message.length > 5 && data.tel.length > 4 && data.email.length > 4;
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
                        
                        captchaResult: '',
                        userInputCaptcha: '',

                        errName: null,
                        isSuccess: true
                    })        
                },
                function(err) {}
            );
        }
    }

    render() {
        return (
            <div className="contact-form contact-form_main">
                
                <div className="col">
                    <div className="contact-form__title-wrapper">
                        <div className="contact-form-title">Есть вопросы? Спрашивайте!</div>
                        <div className="contact-form-subtitle">Вы можете задать вопрос по работе магазина или спросить об интересующем вас товаре. <br/>Наши специалисты вам помогут</div>
                    </div>
                    {this.state.errName ?
                        <span className="contact-form__err-text">
                            {this.state.errName === 'fields' ? 
                                'Все поля формы должны быть заполнены!' 
                                : this.state.errName === 'captcha' ? 'Проверночный код введен неверно!' : ''}
                        </span>
                    : null}
                    {this.state.isSuccess ?
                        <span className="contact-form__success-text">
                            {'Ваш вопрос успешно отправлен!'}
                        </span>
                    : null}
                    <div className="row">
                        
                        <ContactFormInput 
                            type="text"
                            placeholder="Имя"
                            label={"Имя"}
                            onChange={(value) => this.setState({name: value})}
                            width={4}
                        />
                        <ContactFormInput 
                            type="tel"
                            placeholder="+7 (XXX) XXX - XX - XX"
                            label={"Телефон"}
                            value={this.state.telView}
                            onChange={(value) => this.setState({
                                tel: value.tel,
                                telView: value.telView,
                            })}
                            width={4}
                        />
                       <ContactFormInput 
                            type="email"
                            placeholder="E-mail"
                            label={"E-mail"}
                            onChange={(value) => this.setState({email: value})}
                            width={4}
                        />
                        
                    </div>
                    <div className="row">
                             <ContactFormInput 
                                type="text"
                                placeholder=""
                                label={"Что бы вас заинтересовало?"}
                                onChange={(value) => this.setState({message: value})}
                                width={8}
                            />
                            <ContactFormInput 
                                type="text"
                                placeholder={this.state.captcha}
                                label={"Проверочный код"}
                                
                                onChange={(value) => this.setState({userInputCaptcha: value})}
                                width={4}
                            />
                    </div>
                </div>
                <ContactFormAgreeLink link=""/>
                <div className="row">
                    <ContactFormSubmit 
                        title="Отправить"
                        onClick={this.handleSubmit}
                    />
                </div>
            </div>
        )
    }
}
