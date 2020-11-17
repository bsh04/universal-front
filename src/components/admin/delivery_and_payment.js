import React, {Component} from "react";
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {EditorState, convertToRaw, ContentState} from 'draft-js';

// import {Editor} from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';

import request from '../../services/ajaxManager';

class DeliveryAndPayment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            article: null,
            editorState: EditorState.createEmpty(),
        }
    }

    componentWillMount() {
        this.handleGet();
    }

    componentDidMount() {
    }

    handleGet() {
        let _this = this;
        request(
            'article/service',
            'GET',
            null,
            {},
            function (response) {
                let article = null;
                if (!Array.isArray(response)) {
                    article = response;
                    // let contentBlock = htmlToDraft(article.content);
                    // if (contentBlock) {
                    //     let contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                    //     let editorState = EditorState.createWithContent(contentState);
                    //     _this.setState({editorState: editorState, article: article});
                    // }
                }
            },
        );
    }

    handleCreate() {
        let data = new FormData();
        data.append('title', 'Оплата и доставка');
        data.append('content', draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())));
        data.append('type', 'service');

        let _this = this;

        request(
            'article/',
            'POST',
            data,
            {},
            function (response) {
                _this.props.history.push('/deliveryandpayment');
            },
            function (err) {
                alert(err)
            }
        );
    }

    handleEdit() {
        let data = {
            id: this.state.article.id,
            title: 'Оплата и доставка',
            content: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
            type: 'service'
        };

        let _this = this;

        request(
            'article/',
            'PUT',
            data,
            {},
            function (response) {
                _this.props.history.push('/deliveryandpayment');
            },
            this.state.errorCallback
        );
    }

    onEditorStateChange(editorState) {
        this.setState({
            editorState,
        });
    };

    render() {

        return (
            <div>
                <table className={"table table-striped table-hover"}>
                    <thead>
                    <tr>
                        <th>{this.state.article ? this.state.article.title : ''}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            {
                                // window
                                // &&
                                // <Editor
                                //     editorState={this.state.editorState}
                                //     initialContentState={this.state.article ? this.state.article.content : ''}
                                //     toolbarClassName="toolbarClassName"
                                //     wrapperClassName="wrapperClassName"
                                //     editorClassName="editorClassName"
                                //     editorStyle={{
                                //         border: '1px solid #ffffff',
                                //         backgroundColor: '#ffffff',
                                //         minHeight: '50vh'
                                //     }}
                                //     onEditorStateChange={(editorState) => this.onEditorStateChange(editorState)}
                                //     toolbar={{
                                //         options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
                                //     }}
                                // />
                            }
                        </td>
                    </tr>
                    </tbody>
                </table>
                <button className={'btn btn-primary'}
                        onClick={() => {

                            if (this.state.article) {
                                this.handleEdit();
                            } else {
                                this.handleCreate();
                            }
                        }}>
                    <i className={'fa fa-edit'}> Изменить</i>
                </button>
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