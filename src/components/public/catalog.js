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
                <div className="main-catalog-list">
                    {this.state.categories.map((item, key) => {
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
    }
}

export default Catalog;
