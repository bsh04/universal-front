import React, { Component } from 'react';
import { ContactFormInput } from '../contact-form/ContactFormInput';
import { ContactFormSubmit } from '../contact-form/ContactFormSubmit';
import { ModalFrame } from '../modal/ModalFrame';
import { ContactFormAgreeLink } from '../contact-form/ContactFormAgreeLink';


export class ModalBasketAddAlert extends Component {
    constructor(props) {
        super(props);

    }

    

    render() {
        return (
            <ModalFrame visible={this.props.visible} handleToggle={this.props.handleToggle} className={'modal-frame_bg-small'}>
                <span className="contact-form-text">Товар добавлен в корзину</span>
                <div className="row basket-add-alert">
                    <ContactFormSubmit 
                        title="Оформить заказ"
                        onClick={() => null}
                    />
                    <ContactFormSubmit 
                        className="basket-add-alert__submit"
                        title="Продолжить покупки"
                        onClick={this.props.handleToggle}
                    />
                </div>
                
                
            </ModalFrame>
        )
    }
}