import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class FooterCatalogListItem extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <li className="catalog-list__item">
                <Link 
                    to={'/catalog/' + this.props.item.id}
                    className="catalog-list__item-text"
                >
                    {this.props.item.title}
                </Link>
            </li>
        )
    }
}