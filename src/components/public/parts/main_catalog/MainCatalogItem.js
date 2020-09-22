import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class MainCatalogItem extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        let { item } = this.props;

        return (
            <Link to={this.props.to ? this.props.to : '/catalog/' + item.id} 
                className="main-catalog-list__item unselectable">
                <div className="main-catalog-list__item-img-wrapper">
                    <img src={require(`../../../../images/catalog/category_${item.id}.png`)} 
                        alt={item.title} 
                        className="main-catalog-list__item-img"
                    />
                </div>
                <span className="main-catalog-list__item-text">{item.title}</span>
                
            </Link>
        )
    }
}