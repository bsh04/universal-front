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
            return <Link 
                className={`footer__link footer__link_${this.props.link.slice(1)}`} 
                to={this.props.link}
                onClick={() => window.scrollTo(0, 0)}
                >{this.props.title}</Link>

        } else if(this.props.type === 'shedule'){
            return <span className="footer__link footer__link_shedule">
                пн-пт - 9:00 - 17:00 <br/>
                сб  - 9:00 - 14:00, вс - выходной 
            </span>

        } else if(this.props.type !== 'address') {
            return (
                <a 
                    href={`${this.props.type}: ${this.props.link}`}
                    className={`footer__link footer__link_${this.props.type}`}>
                    {this.renderContent()}
                </a>)
        
        } else if (this.props.type === 'address') {
            return (
                <a 
                    href={`${'http://maps.google.com/?q=' + this.props.address}`}
                    className={`footer__link footer__link_address`}>
                    {this.renderContent() + '\n' + 'Работаем по РФ'}
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