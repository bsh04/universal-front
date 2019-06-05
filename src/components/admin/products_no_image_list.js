import React, {Component} from 'react';
import request from "../../services/ajaxManager";

class NoImageList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
        };
    }

    componentDidMount() {
        this.handleGet();
    }

    handleGet() {
        let _this = this;
        request(
            'product/without_image',
            'GET',
            null,
            {},
            function (response) {
                _this.setState({products: response});
            },
        );
    }

    render() {
        return (
            <div>
                <h1>Товары без изображения:</h1>
                <table className={'table table-striped table-hover'}>
                    <thead>
                    <tr>
                        <th>Код:</th>
                        <th>Наименование:</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.products.map((item, key) => {
                        return (
                            <tr key={key}>
                                <td>
                                    {item.id}
                                </td>
                                <td>
                                    {item.title}
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default NoImageList;
