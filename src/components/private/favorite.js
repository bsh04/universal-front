import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import request from '../../services/ajaxManager';

class Favorite extends Component {
    constructor(props) {
        super(props);

        this.handleBasketAdd = this.handleBasketAdd.bind(this);

        this.state = {
            products: [],
            form: [],
        };
    }

    componentWillMount() {
        this.handleGet();
    }

    handleGet()
    {
        let _this = this;
        request(
            'product/favorite',
            'GET',
            null,
            {},
            function (response)
            {
                _this.setState({products: response});
            },
        );
    }

    handleDelete(key)
    {
        let data = {
            id: this.state.products[key].id,
        };

        let _this = this;

        request(
            'product/favorite',
            'DELETE',
            data,
            {},
            function (response)
            {
                let arr = _this.state.products;
                arr.splice(key, 1);
                _this.setState({products: arr});
            },
            this.state.errorCallback
        );
    }

    handleBasketAdd(key) {
        let data = {
            product: this.state.products[key].id,
            count: this.countInput.value,
        };

        let _this = this;

        request(
            'product/basket',
            'POST',
            data,
            {},
            function (response)
            {
                let form = _this.state.form;
                form.push(_this.state.products[key].id);
                _this.setState({message: response.message, form: form});
            },
            this.state.errorCallback
        );
    }

    render() {
        return (
            <div>
                <h4 className="text-center">Избранные товары:</h4>
                <table className={"table table-striped table-hover"}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th></th>
                            <th>Описание</th>
                            <th>Управление</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.products.length > 0 ? this.state.products.map((item, key) => {
                            let isNew = Math.ceil(Math.abs(((new Date()) - (new Date(item.updated))) / (1000 * 60 * 60 * 24))) < 14;

                            return (
                                <tr key={key}>
                                    <td>{key + 1}</td>
                                    <td>
                                        <img className="fav-img" src={item.photo === 'placeholder.jpg' ? require('../../images/image-placeholder.png') : '' } alt="Card image cap"/>
                                    </td>
                                    <td>
                                        <h5 className={'text-left'}>{item.title}</h5>
                                        <p className="card-text">
                                            <small className="text-muted">Код товара: {item.id} </small> {isNew ? <span className="badge badge-success">Новинка!</span> : ''}<br/>
                                            Цена: {item.price} р.
                                        </p>
                                        {this.state.form.indexOf(item.id) === -1 ?
                                            <form className="form-inline" onSubmit={(e) => {e.preventDefault()}}>
                                                <div className="input-group mb-2 mr-sm-2">
                                                    <input
                                                        name="desc"
                                                        type="number"
                                                        required={true}
                                                        placeholder={"Количество:"}
                                                        min={1}
                                                        defaultValue={1}
                                                        className="form-control mb-1 mr-sm-1"
                                                        ref={(input) => {this.countInput = input}}
                                                    />
                                                    <div className="input-group-prepend">
                                                        <button className="btn btn-success mb-1 " onClick={() => this.handleBasketAdd(key)}>
                                                            <i className={'fa fa-cart-plus'}></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </form> :
                                            <div className="alert alert-success" role="alert">
                                                <i className={'fa fa-check'}> {this.state.message}</i>
                                            </div>
                                        }
                                    </td>
                                    <td>
                                        <button className={'btn btn-danger'}
                                                onClick={() => this.handleDelete(key)}>
                                            <i className={'fa fa-trash'}> Удалить</i>
                                        </button>
                                    </td>
                                </tr>
                            );
                        }) : <tr>
                            <td colSpan={4}>Список избранных товаров пуст</td>
                        </tr> }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Favorite;