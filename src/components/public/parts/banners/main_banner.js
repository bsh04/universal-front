import React, { Component } from 'react';

export class MainBanner extends Component {
    constructor(props) {
        super(props);

    }


    render() {
        return (
            <div className={`banner banner-bg banner-bg_${this.props.promoName}`}>
                <div className="banner-body">
                    <div className={`banner-body__text-wrap ${this.props.promoName}`}>
                        <span className="banner-body__text_small">
                            {this.props.textSmall}
                        </span>
                        <span className="banner-body__text_big">
                            {this.props.textBig}
                        </span>
                    </div>

                    <div className="banner-body-button" onClick={() => this.props.onLinkClick()}>
                        Подробнее
                    </div>
                </div>
            </div>
        )
    }
}