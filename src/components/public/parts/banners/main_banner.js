import React, { Component } from 'react';
import { serverImages } from '../../../../services/parameters';

export class MainBanner extends Component {
    constructor(props) {
        super(props);

    }

    
    render() {
        let isMobile = this.props.isMobile;
        let imgPath = isMobile ? 'mobile_' : '';

        return (
            <div className={`banner`} onClick={() => this.props.onLinkClick()}>
                <div className="banner-body">
                    <img src={`${serverImages + this.props.item[imgPath + 'photo']}`} className="banner-bg"/>
                    {/* <div className={`banner-body__text-wrap ${this.props.promoName}`}>
                        <span className="banner-body__text_small">
                            {this.props.textSmall}
                        </span>
                        <span className="banner-body__text_big">
                            {this.props.textBig}
                        </span>
                        <div className="banner-body-button unselectable" >
                            Подробнее
                        </div>
                    </div> */}
                </div>
            </div>
        )
    }
}