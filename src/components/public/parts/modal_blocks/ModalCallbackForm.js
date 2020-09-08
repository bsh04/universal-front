import React, { Component } from 'react';
import { ContactFormInput } from '../contact-form/ContactFormInput';
import { ContactFormSubmit } from '../contact-form/ContactFormSubmit';
import { ModalFrame } from '../modal/ModalFrame';
import { ContactFormAgreeLink } from '../contact-form/ContactFormAgreeLink';


export class ModalCallbackForm extends Component {
    constructor(props) {
        super(props);

    }

    

    render() {
        return (
            <ModalFrame visible={this.props.visible} handleToggle={this.props.handleToggle}>
                <div className="contact-form-title">Обратный звонок</div>
                
                <ContactFormInput 
                    type="text"
                    label={"Имя"}
                    onChange={(value) => console.log('value',value)}
                    width={12}
                    required
                />
                <ContactFormInput 
                    type="tel"
                    label={"Телефон"}
                    placeholder="+7 (XXX) XXX - XX - XX"
                    onChange={(value) => console.log('value',value)}
                    width={12}
                    required
                />
                
                <ContactFormInput 
                    type="time"
                    label={"Время удобное для звонка"}
                    onChange={(value) => console.log('value',value)}
                    width={12}
                    required
                />
                <ContactFormInput 
                    type="text"
                    label={"Проверочный код"}
                    onChange={(value) => console.log('value',value)}
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