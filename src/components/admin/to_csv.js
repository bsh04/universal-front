import React, {Component} from 'react';
import request from "../../services/ajaxManager";
import { serverUrl } from "../../services/parameters";

class ExportCategoryList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
        };
    }

    componentDidMount() {
        this.handleGet();
    }

    handleGet() {
        let _this = this;
        request(
            'product/categories',
            'GET',
            null,
            {},
            function (response) { console.log(response);
                _this.setState({categories: response});
            },
        );
    }

    handleExport(id) {
        window.open(serverUrl + 'product/csv/' + id + '/' + (id - 5), '__blank');
        // request(
        //     'product/csv/' + id,
        //     'GET',
        //     null,
        //     {},
        //     function (response) {
        //         console.log(response);
        //     },
        // );
    }

    viewTr(item, depth) {
        let _this = this;
        let array = [];

        let str = '';
        for (let i = 0; i < depth; i++) {
            str += '>';
        }

        array.push(<tr key={item.id}>
            <td>
                {str} {item.id}
            </td>
            <td>
                {item.title}
            </td>
            <td>
                <button className="btn btn-success" onClick={() => this.handleExport(item.id)}>
                    Экспортировать данные
                </button>
            </td>
        </tr>);

        if (item.children)
        {
            item.children.forEach(function(element) {
                (_this.viewTr(element, depth + 1)).forEach(function(p) {array.push(p)});
            });
        }

        return(array);
    }

    render() {
        return (
            <div>
                <h1>Экспорт данных:</h1>
                <table className={'table table-striped table-hover'}>
                    <thead>
                    <tr>
                        <th>Код:</th>
                        <th>Наименование:</th>
                        <th>Экспорт</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.categories.map((item, key) => {
                        return (
                            this.viewTr(item, 0)
                        );
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ExportCategoryList;
