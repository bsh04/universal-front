import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import request from '../../services/ajaxManager';
import draftToHtml from 'draftjs-to-html';

class DeliveryAndPayment extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            article: null
        }
    }

    componentWillMount() {
        this.handleGet();
    }

    handleGet() {
        let _this = this;
        request(
            'article/service',
            'GET',
            null,
            {},
            function (response) {
                
                _this.setState({
                        article: response
                    })
            
            },
        );
    }

    render() {
        return (
            <div>
                <h1>Оплата и доставка</h1>
                {this.state.article ? <div dangerouslySetInnerHTML={{__html: this.state.article.content}}></div> : 'Информация отсутствует'}
            </div>
        )
    }
}

export default withRouter(connect(
    (state, ownProps) => ({
        token: state.token
    }),
    dispatch => ({})
)(DeliveryAndPayment));