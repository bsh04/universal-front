import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import request from '../../../services/ajaxManager';
import Loading from '../../loading';

class StocksList extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            news: [],
            add: false,
            edit: null,
            loading: false
        };
    }

    componentDidMount() {
        this.handleGet();
    }

    handleGet()
    {
        let _this = this;
        request(
            'news/stocks',
            'GET',
            {},
            {},
            function (response)
            {
                
                _this.setState({news: response.data});
            },
        );
    }

    handleSubmit(e) {
        this.setState({loading: true});

        e.preventDefault();

        let data = new FormData();
        data.append('photo', this.fileInput.files[0]);
        data.append('mobile_photo', this.mobfileInput.files[0]);
        data.append('title', "Акция"/* this.titleInput.value */);
        data.append('link', this.linkInput.value);
        data.append('type', 'stocks');
        data.append('short_content', this.contentInput.value);

        let _this = this;
         
        request(
            'news/',
            'POST',
            data,
            {},
            function (response) {
                
                let arr = _this.state.news;
                arr.push(response);
                _this.setState({news: arr, add: false, loading: false});
            },
            function(err) {
                console.log('error:', err)
            },
            
        );
    }

    handleEdit(key) {
        let data = {
            id: this.state.news[key].id,
            link: this.linkEditInput.value,
            short_content: this.contentEditInput.value,
        };

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
            function(err) {
            }
        );
    }

    handleDelete(key) {
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
                            {/* <input
                                name="title"
                                type="text"
                                required={true}
                                placeholder={"Заголовок:*"}
                                className={'form-control '}
                                ref={(input) => {this.titleInput = input}}
                            />
                            */}
                            <input
                                name="link"
                                type="text"
                                required={true}
                                placeholder={"Категория:*"}
                                className={'form-control '}
                                ref={(input) => {this.linkInput = input}}
                            /> 
                            <br/>
                            <input
                                name="desc"
                                type="text"
                                required={true}
                                placeholder={"Описание:*"}
                                
                                className={'form-control '}
                                ref={(input) => {this.contentInput = input}}
                            />
                            <br/>
                            <label htmlFor="fileInput">Баннер полноэкранный</label>
                            <input
                                id="fileInput"
                                name="file"
                                type="file"
                                required={true}
                                placeholder={"Баннер полноэкранный:*"}
                                className={'form-control '}
                                accept="image/*"
                                ref={(input) => {this.fileInput = input}}
                            />
                            <br/>
                            <label htmlFor="fileInput">Баннер мобильный</label>
                            <input
                                id="mobFileInput"
                                name="mobfile"
                                type="file"
                                required={true}
                                placeholder={"Баннер мобильный:*"}
                                className={'form-control '}
                                accept="image/*"
                                ref={(input) => {this.mobfileInput = input}}
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
                        <button className={'btn btn-outline-success btn-sm'} onClick={() => {this.setState({add: true})}}>
                            <i className={'fa fa-plus'}> Добавить акцию</i>
                        </button>
                    </td>
                </tr>
            );
        }
    }

    render() {
        return (
            <div className="position-relative">
                {this.state.loading ?
                <div className="position-absolute" style={{top: '25%', left: '40%'}}><Loading /> </div>
                 
                : null}

                <h4 className="text-center">Управление акциями</h4>
                <table className={"table table-striped table-hover"}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Категория</th>
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
                                            name="link"
                                            type="text"
                                            required={true}
                                            placeholder={"Категория:*"}
                                            defaultValue={item.link}
                                            className={'form-control '}
                                            ref={(input) => {this.linkEditInput = input}}
                                        /> 
                                        <br/></td>
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
                                    <td>{item.link}</td>
                                    <td>{item.short_content}</td>
                                    <td>
                                        {/* <button className={'btn btn-primary'}
                                                onClick={() => {this.setState({edit: key})}}>
                                            <i className={'fa fa-edit'}> Изменить</i>
                                        </button> */}
                                        <button className={'btn btn-outline-danger btn-sm'}
                                                onClick={() => this.handleDelete(key)}>
                                            <i className={'fa fa-trash'}> Удалить</i>
                                        </button>
                                    </td>
                                </tr>
                            );
                        }) : <tr>
                            <td colSpan={4}>Список акций пуст</td>
                        </tr> }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default StocksList;
