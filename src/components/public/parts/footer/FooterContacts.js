import React, { Component } from 'react';
import { FooterContactsLink } from './FooterContactsLink';
import { FooterContactsSocial } from './FooterContactsSocial';

export class FooterContacts extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <div className="footer-contacts">
                <div className="footer-contacts-row-wrap">
                    <FooterContactsLink type='tel' link='+73822909291' />
                    <FooterContactsLink type='tel' link='+73822904432' />
                    <FooterContactsLink type='tel' link='+73822902668' />
                    <FooterContactsLink type='mailto' link='razov@mail.tomsknet.ru' />
                </div>
                <div className="footer-contacts-row-wrap">
                    <FooterContactsLink type='address' address='г. Томск, ул. Бердская, 31' />
                    <FooterContactsLink type='shedule'/>
                </div>
                <div className="footer-contacts-row-wrap">
                    <FooterContactsSocial />
                </div>
                <div></div>
            </div>
        )
    }
}
