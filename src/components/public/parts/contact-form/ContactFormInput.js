import React, { Component } from 'react';


export class ContactFormInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            customPlaceholder: '',
            value: '',
            err: false,
        }
    }

    handleChange = (e) => {
        e.preventDefault();
        let value = e.target.value;
        
        if(this.props.type === 'tel') {
            this.props.onChange(this.phoneNumberMask(value));
        } else {
            this.props.onChange(value);
        }
    }


    phoneNumberMask = (value) => {
        if(value.toString()[0] === '+') {
            value = value.slice(1);
        }
        
        let result = value.replace(/[^\d;]/g, '');
        let transformed = '';

        transformed = result.split('').map((char, index) => {

            if(index === 1) {
                return char = ' (' + char; 
            } else if(index === 4) {
                return ') ' + char 
            } else if(index === 7) {
                return ' - ' + char
            } else if(index === 9) {
                return ' - ' + char
            }else if(index === 0 && char !== '+') {
                char = '+7';
                return char;
            } else return char
        
        }).join('');

        return {
            telView: transformed.slice(0, 22),
            tel: result.slice(0, 11)
        };
    }

    render() {
        return (
            <div className={`contact-form__input-wrapper ${this.props.width ? 'col-lg-' + this.props.width : ''} ${this.props.className ? this.props.className : ''}`}>
                {this.props.label ?
                <span className="contact-form__input-label">{this.props.label}</span>
                : null}
                {this.props.required ?
                <span className="contact-form__required-badge"></span>
                : null}
                <input
                    required={this.props.required}
                    pattern={this.props.pattern ? this.props.pattern : null }
                    value={this.props.value} 
                    type={this.props.type ? this.props.type : "text"}
                    className={"contact-form__input" + (this.state.err ? " error" : "")}
                    placeholder={this.props.placeholder ? this.props.placeholder : this.state.customPlaceholder}
                    onChange={this.handleChange}
                    pattern={this.props.type === 'tel' ? "[0-9]{3}-[0-9]{3}-[0-9]{4}" : null}
                />
            </div>
        )
    }
}