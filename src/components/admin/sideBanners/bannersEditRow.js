import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class BannersEditRow extends Component {
    constructor(props) {
        super(props);

        this.fileInput = React.createRef();

        this.state = {
            shortContent: this.props.shortContent,
            link: this.props.link
        }
    }

    onSave = () => {
        let data = {
            shortContent: this.state.shortContent,
            file: this.fileInput.files[0],
            link: this.state.link
        }

        this.props.onSave(data)
    }

    onCancel = () => {
        this.props.onCancel()
    }


    render() {
        return (
            <tr>
                <td>#</td>
                <td>
                    <input 
                        type="text"
                        className="form-control input-group"
                        defaultValue={this.state.shortContent}
                        onChange={(e) => this.setState({shortContent: e.target.value})}    
                    />
                </td>
                <td className="text-center">
                    <input
                        name="file"
                        type="file"
                        required={true}
                        className={'form-control input-group w-2'}
                        ref={(input) => {
                            this.fileInput = input
                        }}
                        accept=".jpg, .jpeg, .png"
                    />
                </td>
                <td className="text-center">
                    <input 
                        type="text"
                        defaultValue={this.state.link}
                        className="form-control input-group"
                        onChange={(e) => this.setState({link: e.target.value})}
                    />
                </td>
                <td className="text-center">
                    <button className="btn btn-primary" onClick={this.onSave}>Сохранить</button>
                    <button className="btn btn-secondary" onClick={this.onCancel}>Отменить</button>
                </td>
            </tr>
        )
    }
}

BannersEditRow.propTypes = {
    onSave: PropTypes.func.isRequired
}

BannersEditRow.defaultProps = {
    shortContent: '',
    link: ''
}