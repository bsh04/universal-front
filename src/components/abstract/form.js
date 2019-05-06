import React, { Component } from 'react';

import Loading from '../loading';

import request from '../../services/ajaxManager';

class AbstractForm extends Component {
    constructor(props)
    {
        super(props);

        this.viewLoading = this.viewLoading.bind(this);
        this.viewForm = this.viewForm.bind(this);

        let errorCallback = (data) => {
            this.setState({loading: false});
        };

        this.state = {
            loading: false,
            errors: [],
            request: request,
            errorCallback: errorCallback,
        };
    }

    viewForm() {return '...'}

    viewLoading()
    {
        return (
           <Loading/>
        );
    }

    render()
    {
        if(this.state.loading)
        {
            return this.viewLoading();
        }
        else
        {
            return this.viewForm();
        }
    }
}

export default AbstractForm;
