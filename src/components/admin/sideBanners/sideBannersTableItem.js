import React, { Component } from 'react';


export default class SideBannersTableItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td>№</td>
                <td>Название</td>
                <td>Файл</td>
                <td>Ссылка</td>
                <td>
                    <button 
                        className="btn btn-success"
                        onClick={() => this.setState({showCreateRow: true})}
                    >
                        Добавить
                    </button>
                </td>
            </tr>
        )
    }
}