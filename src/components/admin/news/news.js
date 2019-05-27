import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import request from '../../../services/ajaxManager';

class NewsList extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            news: [],
            add: false,
            edit: null,
        };
    }

    componentWillMount() {
        this.handleGet();
    }

    handleGet()
    {
        let _this = this;
        request(
            'news',
            'GET',
            null,
            {},
            function (response)
            {
                _this.setState({news: response});
            },
        );
    }

    handleSubmit(e)
    {
        e.preventDefault();

        let data = new FormData();
        data.append('photo', this.fileInput.files[0]);
        data.append('title', this.titleInput.value);
        data.append('short_content', this.contentInput.value);

        let _this = this;

        request(
            'news/',
            'POST',
            data,
            {},
            function (response)
            {
                let arr = _this.state.news;
                arr.push(response);
                _this.setState({news: arr, add: false});
            },
            this.state.errorCallback
        );
    }

    handleEdit(key)
    {
        let data = {
            id: this.state.news[key].id,
            title: this.titleEditInput.value,
            short_content: this.contentEditInput.value,
        };

        let _this = this;

        request(
            'news/',
            'PUT',
            data,
            {},
            function (response)
            {
                let arr = _this.state.news;
                arr[key] = response;
                _this.setState({news: arr, edit: null});
            },
            this.state.errorCallback
        );
    }

    handleDelete(key)
    {
        let data = {
            id: this.state.news[key].id,
        };

        let _this = this;

        request(
            'news/',
            'DELETE',
            data,
            {},
            function (response)
            {
                let arr = _this.state.news;
                arr.splice(key, 1)
                _this.setState({news: arr});
            },
            this.state.errorCallback
        );
    }

    viewAdd() {
        if (this.state.add) {
            return (
                <tr>
                    <td colSpan={4}>
                        <form onSubmit={this.handleSubmit}>
                            <input
                                name="title"
                                type="text"
                                required={true}
                                placeholder={"Заголовок:*"}
                                className={'form-control '}
                                ref={(input) => {this.titleInput = input}}
                            />
                            <input
                                name="desc"
                                type="text"
                                required={true}
                                placeholder={"Описание:*"}
                                className={'form-control '}
                                ref={(input) => {this.contentInput = input}}
                            />
                            <input
                                name="file"
                                type="file"
                                required={true}
                                placeholder={"Файл с даными:*"}
                                className={'form-control '}
                                accept="image/*"
                                ref={(input) => {this.fileInput = input}}
                            />
                            <br/>
                            <p className="text-center">
                                <button type="submit" className="btn btn-success">
                                    <i className={'fa fa-plus'}> Загрузить файл</i>
                                </button>
                                <button className={'btn btn-warning'} onClick={() =>  {this.setState({add: false})}}>
                                    <i className={'fa fa-times'}> Отмена</i>
                                </button>
                            </p>
                        </form>
                    </td>
                </tr>
            );
        }
        else {
            return(
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                        <button className={'btn btn-success'} onClick={() => {this.setState({add: true})}}>
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
                            <th>Заголовок</th>
                            <th>Описание</th>
                            <th>Управление</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.viewAdd() }
                        { this.state.news.length > 0 ? this.state.news.map((item, key) => {
                            if (this.state.edit === key) {
                                return(
                                    <tr key={key}>
                                        <td>{key + 1}</td>
                                        <td><input
                                            name="title"
                                            type="text"
                                            required={true}
                                            placeholder={"Заголовок:*"}
                                            defaultValue={item.title}
                                            className={'form-control '}
                                            ref={(input) => {this.titleEditInput = input}}
                                        /></td>
                                        <td>
                                            <input
                                                name="desc"
                                                type="text"
                                                required={true}
                                                placeholder={"Содержание:*"}
                                                defaultValue={item.short_content}
                                                className={'form-control '}
                                                ref={(input) => {this.contentEditInput = input}}
                                            />
                                        </td>
                                        <td>
                                            <button className="btn btn-success"
                                                    onClick={() => this.handleEdit(key)}>
                                                <i className={'fa fa-save'}> Сохранить</i>
                                            </button>
                                            <button className={'btn btn-warning'}
                                                    onClick={() =>  {this.setState({edit: null})}}>
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
                                    <td>{item.short_content}</td>
                                    <td>
                                        <button className={'btn btn-primary'}
                                                onClick={() => {this.setState({edit: key})}}>
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
                        </tr> }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default NewsList;
