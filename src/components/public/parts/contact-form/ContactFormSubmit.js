import React, { Component } from 'react';


export class ContactFormSubmit extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className={`contact-form__submit-btn ${this.props.className || ''}`} onClick={this.props.onClick} >
                <span>{this.props.title ? this.props.title : 'Кнопка'}</span>
            </div>
        )
    }
}
