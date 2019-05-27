import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import request from "../../services/ajaxManager";

class Catalog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
        };
    }

    componentWillMount() {
        this.handleGet();
    }

    handleGet()
    {
        let _this = this;
        request(
            'product/categories',
            'GET',
            null,
            {},
            function (response)
            {
                _this.setState({categories: response});
            },
        );
    }

    render() {
        return (
            <div>
                <h1>Каталог</h1>
                <ul className={'text-left'}>
                    {this.state.categories.map((item, key) => {
                        return (
                            <li key={key}>
                                <Link to={'/catalog/' + item.id}>{item.title}</Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default Catalog;
