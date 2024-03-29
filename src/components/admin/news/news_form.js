/**
 * Created by misha on 27.01.19.
 */
import React from 'react';
import AbstractForm from '../../abstract/form';
import { connect } from 'react-redux';

class NewsList extends AbstractForm {
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
            <div className="">
                <form onSubmit={this.handleSubmit}>
                    <input
                        name="file"
                        type="file"
                        required={true}
                        placeholder={"Файл с данными:*"}
                        className={'form-control '}
                        ref={(input) => {this.fileInput = input}}
                    />
                    <br/>
                    <p className="text-center">
                        <button type="submit" className="btn btn-success">Загрузить файл</button>
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
)(NewsList);