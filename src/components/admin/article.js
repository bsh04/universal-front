import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import request from '../../services/ajaxManager';

class ArticleList extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.onEditorStateChange = this.onEditorStateChange.bind(this);
        this.onEditorStateChangeE = this.onEditorStateChangeE.bind(this);

        this.state = {
            articles: [],
            add: false,
            edit: null,
            editorState: EditorState.createEmpty(),
            editorStateE: EditorState.createEmpty(),
        };
    }

    componentWillMount() {
        this.handleGet();
    }

    handleGet() {
        let _this = this;
        request(
            'article/',
            'GET',
            null,
            {},
            function (response) {
                _this.setState({articles: response});
            },
        );
    }

    handleSubmit(e) {
        e.preventDefault();

        let data = new FormData();
        data.append('title', this.titleInput.value);
        data.append('content', draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())));

        let _this = this;

        request(
            'article/',
            'POST',
            data,
            {},
            function (response) {
                let arr = _this.state.articles;
                arr.push(response);
                _this.setState({articles: arr, add: false});
            },
            this.state.errorCallback
        );
    }

    handleEdit(key) {
        let data = {
            id: this.state.articles[key].id,
            title: this.titleEditInput.value,
            content: draftToHtml(convertToRaw(this.state.editorStateE.getCurrentContent())),
        };

        let _this = this;

        request(
            'article/',
            'PUT',
            data,
            {},
            function (response) {
                let arr = _this.state.articles;
                arr[key] = response;
                _this.setState({articles: arr, edit: null, editorStateE: EditorState.createEmpty()});
            },
            this.state.errorCallback
        );
    }

    handleDelete(key) {
        let data = {
            id: this.state.articles[key].id,
        };

        let _this = this;

        request(
            'article/',
            'DELETE',
            data,
            {},
            function (response) {
                let arr = _this.state.articles;
                arr.splice(key, 1);
                _this.setState({articles: arr});
            },
            this.state.errorCallback
        );
    }

    onEditorStateChange(editorState)
    {
        this.setState({
            editorState,
        });
    };

    onEditorStateChangeE(editorStateE)
    {
        this.setState({
            editorStateE,
        });
    };

    viewAdd() {
        if (this.state.add) {
            return (
                <tr>
                    <td colSpan={3}>
                        <form onSubmit={this.handleSubmit}>
                            <input
                                name="title"
                                type="text"
                                required={true}
                                placeholder={"Заголовок:*"}
                                className={'form-control '}
                                ref={(input) => {
                                    this.titleInput = input
                                }}
                            />
                            <br/>
                            <label>Текст статьи</label>
                            <Editor
                                editorState={this.state.editorState}
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName="editorClassName"
                                editorStyle={{border: '1px solid #ffffff', backgroundColor: '#ffffff',}}
                                onEditorStateChange={this.onEditorStateChange}
                                toolbar={{
                                    options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
                                }}
                            />
                            <br/>
                            <p className="text-center">
                                <button type="submit" className="btn btn-success">
                                    <i className={'fa fa-plus'}> Добавить</i>
                                </button>
                                <button className={'btn btn-warning'} onClick={() => {
                                    this.setState({add: false})
                                }}>
                                    <i className={'fa fa-times'}> Отмена</i>
                                </button>
                            </p>
                        </form>
                    </td>
                </tr>
            );
        }
        else {
            return (
                <tr>
                    <td></td>
                    <td></td>
                    <td>
                        <button className={'btn btn-success'} onClick={() => {
                            this.setState({add: true, editorState: EditorState.createEmpty()})
                        }}>
                            <i className={'fa fa-plus'}> Добавить</i>
                        </button>
                    </td>
                </tr>
            );
        }
    }

    render() {
        return (
            <div>
                <h4 className="text-center">Управление швейным цехом</h4>
                <table className={"table table-striped table-hover"}>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Заголовок</th>
                        <th>Управление</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.viewAdd() }
                    { this.state.articles.length > 0 ? this.state.articles.map((item, key) => {
                            if (this.state.edit === key) {
                                return (
                                    <tr key={key}>
                                        <td>{key + 1}</td>
                                        <td>
                                            <input
                                                name="title"
                                                type="text"
                                                required={true}
                                                placeholder={"Заголовок:*"}
                                                defaultValue={item.title}
                                                className={'form-control '}
                                                ref={(input) => {
                                                    this.titleEditInput = input
                                                }}
                                            />
                                            <br/>
                                            <label>Текст статьи</label>
                                            <Editor
                                                editorState={this.state.editorStateE}
                                                initialContentState={item.content ? item.content : ''}
                                                toolbarClassName="toolbarClassName"
                                                wrapperClassName="wrapperClassName"
                                                editorClassName="editorClassName"
                                                editorStyle={{border: '1px solid #ffffff', backgroundColor: '#ffffff',}}
                                                onEditorStateChange={this.onEditorStateChangeE}
                                                toolbar={{
                                                    options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
                                                }}
                                            />
                                        </td>
                                        <td>
                                            <button className="btn btn-success"
                                                    onClick={() => this.handleEdit(key)}>
                                                <i className={'fa fa-save'}> Сохранить</i>
                                            </button>
                                            <button className={'btn btn-warning'}
                                                    onClick={() => {
                                                        this.setState({edit: null})
                                                    }}>
                                                <i className={'fa fa-times'}> Отмена</i>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            }

                            return (
                                <tr key={key}>
                                    <td>{key + 1}</td>
                                    <td>{item.title}</td>
                                    <td>
                                        <button className={'btn btn-primary'}
                                                onClick={() => {
                                                    let contentBlock = htmlToDraft(item.content);
                                                    if (contentBlock) {
                                                        let contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                                                        let editorStateE = EditorState.createWithContent(contentState);
                                                        this.setState({editorStateE: editorStateE, edit: key});
                                                    }
                                                    else {
                                                        this.setState({edit: key});
                                                    }
                                                }}>
                                            <i className={'fa fa-edit'}> Изменить</i>
                                        </button>
                                        <button className={'btn btn-danger'}
                                                onClick={() => this.handleDelete(key)}>
                                            <i className={'fa fa-trash'}> Удалить</i>
                                        </button>
                                    </td>
                                </tr>
                            );
                        }) : <tr>
                            <td colSpan={4}>Список услуг швейного цеха пуст</td>
                        </tr> }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ArticleList;
