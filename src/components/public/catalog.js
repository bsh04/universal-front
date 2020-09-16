import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import request from "../../services/ajaxManager";

import {CategoriesContext} from '../../services/contexts';

class Catalog extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return <CategoriesContext.Consumer>{contextValue => {
            const {categories} = contextValue;
            return (
                <div>
                    <h1>Каталог</h1>
                    <div className="main-catalog-list">
                        {categories.map((item, key) => {
                            return (
                                <div key={item.id} className="main-catalog-list__item">
                                    <Link to={'/catalog/' + item.id}
                                        className="main-catalog-list__text">
                                        <span>{item.title}</span>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }}
        </CategoriesContext.Consumer>
    }
}

export default Catalog;
