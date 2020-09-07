import React, { Component } from 'react';
import { ContactFormInput } from './contact-form/ContactFormInput';
import { ContactFormSubmit } from './contact-form/ContactFormSubmit';



export default class ContactForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
        }
    }

    handleSubmit = () => {
        console.log(this.state)
    }

    render() {
        return (
            <div className="contact-form contact-form_main">
                <div className="col">
                    <div className="contact-form__title-wrapper">
                        <div className="contact-form-title">Есть вопросы — спрашивайте!</div>
                        <div className="contact-form-subtitle">Вы можете задать вопрос по работе магазина или спросить о интересующем вас товаре. <br/>Наши специалисты вам помогут</div>
                    </div>
                    <div className="row">
                        
                        
                        <ContactFormInput 
                            type="text"
                            placeholder="Имя"
                            label={"Имя"}
                            onChange={(value) => console.log('value',value)}
                            width={4}
                        />
                        <ContactFormInput 
                            type="tel"
                            placeholder="+7 (XXX) XXX - XX - XX"
                            label={"Телефон"}
                            onChange={(value) => console.log('value',value)}
                            width={4}
                        />
                       <ContactFormInput 
                            type="email"
                            placeholder="E-mail"
                            label={"E-mail"}
                            onChange={(value) => console.log('value',value)}
                            width={4}
                        />
                        
                    </div>
                    <div className="row">
                             <ContactFormInput 
                                type="text"
                                placeholder=""
                                label={"Что бы вас заинтересовало?"}
                                onChange={(value) => console.log('value',value)}
                                width={8}
                            />
                            <ContactFormInput 
                                type="text"
                                placeholder="9 + 4 ="
                                label={"Проверочный код"}
                                onChange={(value) => console.log('value',value)}
                                width={4}
                            />
                    </div>
                </div>
                <div className="row justify-content-center mb-3">Заполняя поля формы Вы даете согласие на 
                    &nbsp;<a href="" className="contact-form__agree-link">обработку персональных данных</a></div>
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