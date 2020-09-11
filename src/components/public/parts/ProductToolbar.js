import React, { Component } from 'react';

export class ProductToolbar extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="products-toolbar mb-2 col-12">
                <ul className="products-toolbar-group row justify-content-between" style={{paddingRight: 0}}>
                    <ul className="row col-xl-3 col-lg-3 col-md-3 col-sm-12 justify-content-center">
                        <li className="products-toolbar-item mr-2">
                            <a href="#"
                                className={this.state.cardView === 'tile' ? 'text-success' : 'text-secondary'}
                                onClick={() => {
                                    this.setState({
                                        cardView: 'tile'
                                    })
                                }}>
                                <i className="fa fa-th"></i>
                            </a>
                        </li>
                        <li className="products-toolbar-item">
                            <a href="#"
                                className={this.state.cardView === 'list' ? 'text-success' : 'text-secondary'}
                                onClick={() => {
                                    this.setState({
                                        cardView: 'list'
                                    })
                                }}>
                                <i className="fa fa-list"></i>
                            </a>
                        </li>
                    </ul>
                    
                    <ul className="row col-xl-8 col-lg-8 col-md-8 col-sm-12 justify-content-center">
                        <li className="products-toolbar-item mr-1">
                            <div className="dropdown">
                                <span className="products-toolbar-item__text">Товаров на странице: </span>
                                <a className="dropdown-toggle"
                                    href="#"
                                    role="button"
                                    id="dropdownMenuLink"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false">
                                    <span
                                        className="products-toolbar-item__selected">{this.state.limitAll ? 'Все' : this.state.limit}</span>
                                </a>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                    <a className="dropdown-item" href="#" data="50"
                                        onClick={(e) => this.setLimit(e, false)}>50</a>
                                    <a className="dropdown-item" href="#" data="100"
                                        onClick={(e) => this.setLimit(e, false)}>100</a>
                                    <a className="dropdown-item" href="#" data="50"
                                        onClick={(e) => this.setLimit(e, true)}>Все</a>
                                </div>
                            </div>

                        </li>
                        <li className="products-toolbar-item mr-1">
                            <div className="dropdown">
                                <span className="products-toolbar-item__text">Сортировать по: </span>
                                <a className="dropdown-toggle products-toolbar-item__text"
                                    href="#"
                                    role="button"
                                    id="dropdownMenuLink"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false">
                                    <span
                                        className="products-toolbar-item__selected">{this.sortSelectedLabel()}</span>
                                </a>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                    <a className="dropdown-item" href="#" data="title,asc"
                                        onClick={(e) => this.setSort(e)}>названию А-Я</a>
                                    <a className="dropdown-item" href="#" data="title,desc"
                                        onClick={(e) => this.setSort(e)}>названию Я-А</a>
                                    <a className="dropdown-item" href="#" data="price,asc"
                                        onClick={(e) => this.setSort(e)}>цене по возрастанию</a>
                                    <a className="dropdown-item" href="#" data="price,desc"
                                        onClick={(e) => this.setSort(e)}>цене по убыванию</a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </ul>
            </div>
        )
    }
}