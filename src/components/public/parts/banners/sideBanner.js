import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { serverImages } from '../../../../services/parameters';

export default class SideBanner extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Link to={this.props.item.link} className="side-banner-wrapper">
                <img 
                    src={serverImages + this.props.item.photo}
                    alt="Промо"
                    className="side-banner__img"
                />
            </Link>
        )
    }
}