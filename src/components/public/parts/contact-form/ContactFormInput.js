import React, { Component } from 'react';


export class ContactFormInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            customPlaceholder: '',
            value: '',
            err: false
        }
    }

    handleChange = (e) => {
        e.preventDefault();
        let value = e.target.value;
        this.setState({value}, () => this.props.onChange(value))
    }

    render() {
        return (
            <div className={`contact-form__input-wrapper ${this.props.width ? 'col-lg-' + this.props.width : ''} ${this.props.className ? this.props.className : ''}`}>
                {this.props.label ?
                <span className="contact-form__input-label">{this.props.label}</span>
                : null}
                <input

                    defaultValue={this.state.value} 
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