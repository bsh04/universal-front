import React, { Component } from 'react';


export class FooterContactsSocial extends Component {
    constructor(props) {
        super(props);

    }

    iconSwitch(name) {
        name = name.toLowerCase();

        switch(name) {
            case 'vk':
                return 'fa-vk'
        }
    }

    socialListRender() {
        return this.props.list.map((item, index) => {
            return (
                <a className="footer-contacts__social-link"><i className={"fa " + this.iconSwitch(item.name)}></i></a>
            )
        })
    }

    render() {
        return (
            <div className="footer-contacts__social">
                <span className="footer-contacts__social-title">
                    Присоединяйтесь к нам:
                </span>
                
            </div>
        )
    }
}