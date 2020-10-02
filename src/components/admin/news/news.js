import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import request from '../../../services/ajaxManager';
import {serverImages} from '../../../services/parameters';

class NewsList extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            news: {},
            add: false,
            edit: null,
        };
    }

    componentWillMount() {
        this.handleGet();
    }

    handleGet() {
        let _this = this;
        request(
            'news/news',
            'GET',
            null,
            {},
            function (response) {
                _this.setState({news: response});
            },
        );
    }

    handleSubmit(e) {
        e.preventDefault();

        let data = new FormData();
        data.append('photo', this.fileInput.files[0]);
        data.append('title', this.titleInput.value);
        data.append('type', 'news');
        data.append('short_content', this.contentInput.value);


        let _this = this;
        let arr = this.state.news.data;


        request(
            'news/',
            'POST',
            data,
            {},
            function (response) {
                console.log(response)
                let arr = [response, ..._this.state.news.data,];
                let news = _this.state.news;
                news.data = arr;

                

                _this.setState({news: news, add: false});
            },
            this.state.errorCallback
        );
    }

    handleEdit(key) {
        /*let data = {
            id: this.state.news[key].id,
            type: 'news',
            title: this.titleEditInput.value,
            short_content: this.contentEditInput.value,
            photo: this.changedFileInput.files[0]
        };*/

        let data = new FormData();

        data.append('id', this.state.news[key].id,);
        data.append('type', 'news');
        data.append('title', this.titleEditInput.value);
        data.append('short_content', this.contentEditInput.value);

        if (this.changedFileInput.files[0] !== undefined) {
            data.append('photo', this.changedFileInput.files[0])
        }
        ;


        let _this = this;

        request(
            'news/',
            'POST',
            data,
            {},
            function (response) {
                let arr = _this.state.news;
                arr[key] = response;
                _this.setState({news: arr, edit: null});
            },
            () => console.log()
        );
    }

    handleDelete(key) {
        let data = {
            id: this.state.news.data[key].id,
        }; 
        console.log(this.state.news.data[key], 'key: ', key)
        let _this = this;
        
        request(
            'news/',
            'DELETE',
            data,
            {},
            function (response) {
                let arr = _this.state.news.data;
                arr.splice(key, 1)
                let news = _this.state.news;
                news.data = arr
                _this.setState({news: news});
            },
            this.state.errorCallback
        );
    }

    viewAdd() {
        if (this.state.add) {
            return (
                <tr>
                    <td colSpan={5}>
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
                            <input
                                name="desc"
                                type="text"
                                required={true}
                                placeholder={"Описание:*"}
                                className={'form-control '}
                                ref={(input) => {
                                    this.contentInput = input
                                }}
                            />
                            <input
                                name="file"
                                type="file"
                                required={true}
                                placeholder={"Файл с даными:*"}
                                className={'form-control '}
                                accept="image/*"
                                ref={(input) => {
                                    this.fileInput = input
                                }}
                            />
                            <br/>
                            <p className="text-center">
                                <button type="submit" className="btn btn-success">
                                    <i className={'fa fa-plus'}> Загрузить файл</i>
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
        } else {
            return (
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                        <button className={'btn btn-success'} onClick={() => {
                            this.setState({add: true})
                        }}>
                            <i className={'fa fa-plus'}> Добавить новость</i>
                        </button>
                    </td>
                </tr>
            );
        }
    }

    render() {
        return (
            <div>
                <h4 className="text-center">Управление новостями</h4>
                <table className={"table table-striped table-hover"}>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Фотография</th>
                        <th>Заголовок</th>
                        <th>Описание</th>
                        <th>Управление</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.viewAdd()}
                    {this.state.news.data ? this.state.news.data.length > 0 ? this.state.news.data.map((item, key) => {
                        if (this.state.edit === key) {
                            return (
                                <tr key={key}>
                                    <td>{key + 1}</td>
                                    <td>
                                        <img src={serverImages + item.photo} style={{width: 'auto', height: 50}}/><br/>
                                        <input
                                            name="file"
                                            type="file"
                                            required={true}
                                            placeholder={"Файл с данными:*"}
                                            className={'form-control '}
                                            ref={(input) => {
                                                this.changedFileInput = input
                                            }}
                                        />
                                    </td>
                                    <td><input
                                        name="title"
                                        type="text"
                                        required={true}
                                        placeholder={"Заголовок:*"}
                                        defaultValue={item.title}
                                        className={'form-control '}
                                        ref={(input) => {
                                            this.titleEditInput = input
                                        }}
                                    /></td>
                                    <td>
                                        <input
                                            name="desc"
                                            type="text"
                                            required={true}
                                            placeholder={"Содержание:*"}
                                            defaultValue={item.short_content}
                                            className={'form-control '}
                                            ref={(input) => {
                                                this.contentEditInput = input
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
                                <td><img src={serverImages + item.photo} style={{width: 'auto', height: 50}}/></td>
                                <td>{item.title}</td>
                                <td>{item.short_content}</td>
                                <td>
                                    <button className={'btn btn-primary'}
                                            onClick={() => {
                                                this.setState({edit: key})
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
                        <td colSpan={4}>Список новостей пуст</td>
                    </tr> : null}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default NewsList;
