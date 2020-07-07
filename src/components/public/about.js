import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import request from "../../services/ajaxManager";
import {CategoriesContext} from '../../services/contexts';

class About extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <CategoriesContext.Consumer>
                { contextValue => {
                    const categories = contextValue;

                    return (
                        <div>
                            <br/>
                            <h2>Все это можно приобрести в нашей компании:</h2>
                            <ul className={'text-left'}>
                                {categories.map((item, key) => {
                                    return (
                                        <li key={key}>
                                            <Link to={'/catalog/' + item.id}>{item.title}</Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )
                }}
            </CategoriesContext.Consumer>
        );
    }
}

export default About;
