import React, { Component } from 'react';
import { ContactFormInput } from '../contact-form/ContactFormInput';
import { ContactFormSubmit } from '../contact-form/ContactFormSubmit';
import { ModalFrame } from '../modal/ModalFrame';
import { ContactFormAgreeLink } from '../contact-form/ContactFormAgreeLink';


export class ModalThanks extends Component {
    constructor(props) {
        super(props);

    }

    

    render() {
        return (
            <ModalFrame visible={this.props.visible} handleToggle={this.props.handleToggle} size={'modal-frame_bg-small'}>
                <div className="contact-form-title">Спасибо</div>
                <span className="contact-form-text">Ваше сообщение отправлено</span>
                
            </ModalFrame>
        )
    }
}