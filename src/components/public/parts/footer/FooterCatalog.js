import React, { Component } from 'react';
import { FooterCatalogListItem } from './FooterCatalogListItem';

export class FooterCatalog extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <ul className="footer-catalog">
                <li className="catalog-list__item">
                    <span className="catalog-list__item-text">{this.props.catalogTitle}</span>
                </li>
                {this.props.list && this.props.list.length > 0
                ? this.props.list.map((item, index) => {
                    return (
                        <FooterCatalogListItem item={item} key={item.id.toString()} />
                    )
                })
                : null}
            </ul>
        )
    }
}