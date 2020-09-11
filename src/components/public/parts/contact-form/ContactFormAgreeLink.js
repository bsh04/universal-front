import React, { Component } from 'react';

export class ContactFormAgreeLink extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="row justify-content-center mb-3 contact-form__agree">Заполняя поля формы Вы даете согласие на 
                &nbsp;<a href={this.props.link ? this.props.link : ""} className="contact-form__agree-link">обработку персональных данных</a>
            </div>
        )
    }
}