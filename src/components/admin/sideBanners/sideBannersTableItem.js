import React, { Component } from 'react';
import { serverImages } from '../../../services/parameters';


export default class SideBannersTableItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td>{this.props.index}</td>
                <td>{this.props.item.title}</td>
                <td><img src={serverImages + this.props.item.photo} alt="Фото баннера" width={50} height={30}/></td>
                <td>{this.props.item.link}</td>
                <td>
                    <button 
                        className="btn btn-outline-danger btn-sm"
                        onClick={this.props.onPressDelete}
                    >
                        Удалить
                    </button>
                </td>
            </tr>
        )
    }
}