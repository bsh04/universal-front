/**
 * Created by misha on 27.01.19.
 */
import React from 'react';
import AbstractForm from '../abstract/form';
import { connect } from 'react-redux';

class ProductUpdate extends AbstractForm {
    constructor(props)
    {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e)
    {
        e.preventDefault();
        this.setState({loading: true});

        let data = new FormData();
        data.append('file', this.fileInput.files[0]);
        data.append('her', 'her');

        let _this = this;

        this.state.request(
            'product/update',
            'POST',
            data,
            {},
            function (response)
            {
                _this.setState({loading: false, message: response.message});
            },
            this.state.errorCallback
        );
    }

    viewForm() {
        return (
            <div className="w-75">
                <h4 className="text-center">Обновить данные о продуктах</h4>
                <form onSubmit={this.handleSubmit}>
                    <input
                        name="file"
                        type="file"
                        required={true}
                        placeholder={"Файл с даными:*"}
                        className={'form-control '}
                        ref={(input) => {this.fileInput = input}}
                    />
                    <br/>
                    <p className="text-center">
                        <button type="submit" className="btn btn-success">
                            <i className={'fa fa-upload'}> <span>Загрузить файл</span></i>
                        </button>
                    </p>
                </form>
                {this.state.message ?
                    <div className="alert alert-success" role="alert">{this.state.message}</div> : ''}
            </div>
        );
    }
}

export default connect(
    state => ({
        store: state,
    }),
    dispatch => ({

    })
)(ProductUpdate);