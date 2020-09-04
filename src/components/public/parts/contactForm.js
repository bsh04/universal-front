import React, { Component } from 'react';
import { ContactFromInput } from './contact-form/ContactFormInput';
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
            <div className="contact-form">
                <div className="row">
                    <div className="row">
                        <div className="contact-form-title">Есть вопросы — спрашивайте!</div>
                        <div className="contact-form-subtitle">Вы можете задать вопрос по работе магазина или спросить о интересующем вас товаре. <br/>Наши специалисты вам помогут</div>
                    </div>
                    <div className="col-8">
                        
                        <div className="row">
                        <ContactFromInput 
                            type="text"
                            placeholder="Имя"
                            label={"Имя"}
                            onChange={(value) => console.log('value',value)}
                            width={6}
                        />
                        <ContactFromInput 
                            type="tel"
                            placeholder="+7 (XXX) XXX - XX - XX"
                            label={"Телефон"}
                            onChange={(value) => console.log('value',value)}
                            width={6}
                        />
                        <ContactFromInput 
                            type="text"
                            placeholder=""
                            label={"Что бы вас заинтересовало?"}
                            onChange={(value) => console.log('value',value)}
                            width={12}
                        />
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="row">
                            <ContactFromInput 
                                type="email"
                                placeholder="E-mail"
                                label={"E-mail"}
                                onChange={(value) => console.log('value',value)}
                                width={12}
                            />
                            <ContactFromInput 
                                type="text"
                                placeholder=""
                                label={"Проверочный код"}
                                onChange={(value) => console.log('value',value)}
                                width={12}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">Заполняя поля формы Вы даете согласие на <a href="">обработку персональных данных</a></div>
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