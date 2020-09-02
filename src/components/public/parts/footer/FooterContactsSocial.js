import React, { Component } from 'react';


export class FooterContactsSocial extends Component {
    constructor(props) {
        super(props);

    }

    iconSwitch(name) {
        name = name.toLowerCase();

        switch(name) {
            case 'facebook':
                return 'fa fa-facebook-f'
            case 'google-plus':
                return 'fa fa-google-plus'
            case 'twitter':
                return 'fa fa-twitter'
            case 'instagram':
                return 'fa fa-instagram'
            case 'skype':
                return 'fa fa-skype'
            case 'telegram':
                return 'fa fa-telegram'
            case 'vk':
                return 'fa fa-vk'
            case 'youtube': 
                return 'fa fa-youtube'

        }
    }

    socialListRender() {
        return this.props.list.map((item, index) => {
            return (
                <a href={item.link} key={index.toString()}
                    className="footer-contacts__social-link">
                        <i className={this.iconSwitch(item.name)}></i>
                </a>
            )
        })
    }

    render() {
        return (
            <div className="footer-contacts__social">
                <span className="footer-contacts__social-title">
                    Присоединяйтесь к нам!
                </span>
                <span className="footer-contacts__social-list">
                    {this.socialListRender()}
                </span>
            </div>
        )
    }
}
