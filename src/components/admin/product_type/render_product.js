import React, {Component} from 'react';

class RenderProduct extends Component {
    constructor(props) {
        super(props);


    }

    async handleChange(type) {
        this.props.handleChange(type, !this.props.item[type], this.props.item.id);
    }

    render() {
        return (
            <tr key={this.props.item.id}>
                <td>
                    {this.props.item.id}
                </td>
                <td className='text-left'>
                    {this.props.item.title}
                </td>
                <td className='d-flex flex-column'>
                    <div className='d-flex align-items-center'>
                        <input className='mr-2' type="checkbox" defaultChecked={this.props.item.season} onClick={() => this.handleChange('season')}/>
                        <p className='mb-0'>Сезонные</p>
                    </div>
                    <div className='d-flex align-items-center'>
                        <input className='mr-2' type="checkbox" defaultChecked={this.props.item.produced} onClick={() => this.handleChange('produced')}/>
                        <p className='mb-0 text-left'>Собственное производство</p>
                    </div>
                    <div className='d-flex align-items-center'>
                        <input className='mr-2' type="checkbox" defaultChecked={this.props.item.popular} onClick={() => this.handleChange('popular')}/>
                        <p className='mb-0'>Популярные</p>
                    </div>
                </td>
            </tr>
        );
    }
}

export default RenderProduct;