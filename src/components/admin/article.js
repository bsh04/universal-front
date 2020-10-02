import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {EditorState, convertToRaw, ContentState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import request from '../../services/ajaxManager';

class ArticleList extends Component {
    constructor(props) {
        super(props);


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

        request(
            'product/categories',
            'GET',
            null,
            {},
            function (response) {
                _this.setState({categories: response})
            }
        )
    }

    handleAdd() {

        let arr = []

        for (let i = 0; i < this.fileInput.files.length; i++) {
            arr.push(this.fileInput.files[i])
        }

        let data = new FormData();
        data.append('title', this.titleInput.value);
        data.append('content', draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())));
        arr.map(item => {
            data.append('images[]', item);
        })
        data.append('icon', this.iconInput.files[0])
        data.append('category', this.state.selectedCategory)

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

        let arr = []

        for (let i = 0; i < this.fileInput.files.length; i++) {
            arr.push(this.fileInput.files[i])
        }

        let data = new FormData();

        data.append("id", this.state.articles[key].id)
        data.append("title", this.titleEditInput.value,)
        data.append("content", draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())))
        arr.map(item => {
            data.append('images[]', item);
        })
        data.append('icon', this.iconInput.files[0])
        data.append('category', this.state.selectedCategory)

        let _this = this;

        request(
            'article/',
            'POST',
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

    onEditorStateChange(editorState) {
        this.setState({
            editorState,
        });
    };

    onEditorStateChangeE(editorStateE) {
        this.setState({
            editorStateE,
        });
    };

    renderSelectItems() {
        if (this.state.categories) {
            return this.state.categories.map((category, key) => {
                    if (category.children.length > 0) {
                        return category.children.map((subCategory, index) => {
                            return <option  key={index + 'sub'}
                                           value={subCategory.id}>{category.title} -- {subCategory.title}</option>
                        })
                    } else {
                        return <option value={category.id} key={key}>{category.title}</option>
                    }
                }
            )
        }
    }

    handleSelectValue = (e) => {
        this.setState({selectedCategory: e.target.value})
    }

    viewAdd() {
        if (this.state.add) {
            return (
                <tr>
                    <td colSpan={3}>
                        <form>
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
                            <div className='d-flex justify-content-between'>
                                <div className='d-flex flex-column mt-3'>
                                    <p>Файл превью швейного цеха</p>
                                    <form className='d-flex justify-content-center'>
                                        <input
                                            name="file"
                                            type="file"
                                            required={true}
                                            placeholder={"Файл с даными:*"}
                                            className={'form-control w-50'}
                                            ref={(input) => {
                                                this.iconInput = input
                                            }}
                                            accept=".jpg, .jpeg, .png"
                                        />
                                        <br/>
                                    </form>
                                </div>
                                <div className='d-flex flex-column mt-3'>
                                    <p>Файлы примеров изделий</p>
                                    <form className='d-flex justify-content-center'>
                                        <input
                                            name="file"
                                            type="file"
                                            required={true}
                                            placeholder={"Файл с даными:*"}
                                            className={'form-control w-50'}
                                            ref={(input) => {
                                                this.fileInput = input
                                            }}
                                            multiple
                                            accept=".jpg, .jpeg, .png"
                                        />
                                        <br/>
                                    </form>
                                </div>
                                <div className='d-flex flex-column mt-3 w-25'>
                                    <p>Выбор категории</p>
                                    <select className="custom-select" onChange={this.handleSelectValue} value={this.state.selectedCategory}>
                                        <option onClick={() => this.setState({selectedCategory: null})} value={null}>Не выбрано</option>
                                        {this.renderSelectItems()}
                                    </select>
                                </div>
                            </div>
                            <p className='pt-3 text-center'><strong>Внимание! </strong>При добавлении новых
                                файлов, старые удалятся</p>
                            <p className="text-center">
                                <div className="btn btn-success" onClick={() => this.handleAdd()}>
                                    <i className={'fa fa-plus'}> Добавить</i>
                                </div>
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
        } else {
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
            <div className='w-100'>
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
                    {this.viewAdd()}
                    {this.state.articles.length > 0 ? this.state.articles.map((item, key) => {
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
                                        <div className='d-flex justify-content-between'>
                                            <div className='d-flex flex-column mt-3'>
                                                <p>Файл превью швейного цеха</p>
                                                <form className='d-flex justify-content-center'>
                                                    <input
                                                        name="file"
                                                        type="file"
                                                        required={true}
                                                        placeholder={"Файл с даными:*"}
                                                        className={'form-control w-50'}
                                                        ref={(input) => {
                                                            this.iconInput = input
                                                        }}
                                                        multiple
                                                        accept=".jpg, .jpeg, .png"
                                                    />
                                                    <br/>
                                                </form>
                                            </div>
                                            <div className='d-flex flex-column mt-3'>
                                                <p>Файлы примеров изделий</p>
                                                <form className='d-flex justify-content-center'>
                                                    <input
                                                        name="file"
                                                        type="file"
                                                        required={true}
                                                        placeholder={"Файл с даными:*"}
                                                        className={'form-control w-50'}
                                                        ref={(input) => {
                                                            this.fileInput = input
                                                        }}
                                                        multiple
                                                        accept=".jpg, .jpeg, .png"
                                                    />
                                                    <br/>
                                                </form>
                                            </div>
                                            <div className='d-flex flex-column mt-3 w-25'>
                                                <p>Выбор категории</p>
                                                <select className="custom-select" onChange={this.handleSelectValue} value={item.category && item.category.id ? item.category.id : null}>
                                                    <option onClick={() => this.setState({selectedCategory: null})} value={null}>Не выбрано</option>
                                                    {this.renderSelectItems()}
                                                </select>
                                            </div>
                                        </div>
                                        <p className='pt-3 text-center'><strong>Внимание! </strong>При добавлении новых
                                            файлов, старые удалятся</p>
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
                                                } else {
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
                    </tr>}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ArticleList;
