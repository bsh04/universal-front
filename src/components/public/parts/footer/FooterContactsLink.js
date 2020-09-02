import React, { Component } from 'react';

import { Link } from 'react-router-dom';

export class FooterContactsLink extends Component {
    constructor(props) {
        super(props);

    }

    phoneNumberTransform(tel) {
        return tel.split('').map((char, index) => {
            if(index === 1) char = char + ' (';
            if(index === 5) char = char + ') ';
            if(index === 7 || index === 9) char = char + '-';
            
            return char;
        }).join('');
    }

    renderContent() {
        const {type} = this.props;

        switch(type) {
            case 'tel':
                return this.phoneNumberTransform(this.props.link);
            case 'mailto': 
                return this.props.link;
            case 'address': 
                return this.props.address
        }
    }

    renderLink () {
        if(!this.props.type) {
            return <Link to={this.props.link}><i class="footer-contacts__link-icon fa fa-phone"></i></Link>

        } else if(this.props.type === 'shedule'){
            return <span className="footer-contacts__link ">
                пн-пт - 9:00 - 17:00 <br/>
                сб  - 9:00 - 14:00, вс - выходной 
            </span>
        } else if(this.props.type !== 'address') {
            return (
                <a 
                    href={`${this.props.type}: ${this.props.link}`}
                    className={`footer-contacts__link footer-contacts__link_${this.props.type}`}>
                    {this.renderContent()}
                    <i class="footer-contacts__link-icon fa fa-phone"></i>
                </a>)
        
        } else if (this.props.type === 'address') {
            return (
                <a 
                    href={`${'http://maps.google.com/?q=' + this.props.address}`}
                    className={`footer-contacts__link footer-contacts__link_address`}>
                    {this.renderContent() + '\n' + 'Работаем по РФ'}
                    <i class="footer-contacts__link-icon fa fa-phone"></i>
                </a>
            )
        } 
    }

    render() {
        
        return (
            <React.Fragment>
                {this.renderLink()}
            </React.Fragment>
        )
    }
}