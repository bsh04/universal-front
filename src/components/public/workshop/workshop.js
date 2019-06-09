import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import request from "../../../services/ajaxManager";
import {connect} from "react-redux";
import { withRouter } from "react-router";

class Workshop extends Component {
    constructor(props) {
        super(props);

        this.state = {
            article: null,
        };
    }

    componentWillMount() {
        this.handleGet(this.props.match.params.id);
    }

    componentWillReceiveProps(props) {
        this.handleGet(props.match.params.id);
    }

    handleGet(cat)
    {
        let _this = this;
        request(
            'article/' + cat,
            'GET',
            null,
            {},
            function (response)
            {
                _this.setState({article: response});
            },
        );
    }

    render() {
        return (
            <div itemScope itemType="http://schema.org/Article">
                <h1 itemProp="headline">{this.state.article ? this.state.article.title : ''}</h1>
                <div itemProp="articleBody" dangerouslySetInnerHTML={{ __html: this.state.article ? (this.state.article.content).replace(/font-family\:[^;]+;?/g, '') : ''}}></div>
            </div>
        );
    }
}

export default withRouter(connect(
    (state, ownProps) => ({
        token: state.token,
    }),
    dispatch => ({})
)(Workshop));
