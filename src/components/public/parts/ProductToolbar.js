import React, { Component } from 'react';

export class ProductToolbar extends Component {
    constructor(props) {
        super(props);

    }

    shouldComponentUpdate(prevProps) {
        if(prevProps !== this.props) {
            return true;
        } else return false;

    }
    

    render() {
        return (
            <div className="products-toolbar">
                <ul className="products-toolbar-group">
                    <ul className="row">
                        <li className="products-toolbar-item">
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
                                        className="products-toolbar-item__selected">{this.props.limitAll ? 'Все' : this.props.limit}</span>
                                </a>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                    <a className="dropdown-item" href="#" data="50"
                                        onClick={(e) => this.props.setLimit(e, false)}>50</a>
                                    <a className="dropdown-item" href="#" data="100"
                                        onClick={(e) => this.props.setLimit(e, false)}>100</a>
                                    <a className="dropdown-item" href="#" data="50"
                                        onClick={(e) => this.props.setLimit(e, true)}>Все</a>
                                </div>
                            </div>

                        </li>
                        <li className="products-toolbar-item">
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
                                        className="products-toolbar-item__selected">{this.props.sortSelectedLabel()}</span>
                                </a>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                    <a className="dropdown-item" href="#" data="title,asc"
                                        onClick={(e) => this.props.setSort(e)}>названию А-Я</a>
                                    <a className="dropdown-item" href="#" data="title,desc"
                                        onClick={(e) => this.props.setSort(e)}>названию Я-А</a>
                                    <a className="dropdown-item" href="#" data="price,asc"
                                        onClick={(e) => this.props.setSort(e)}>цене по возрастанию</a>
                                    <a className="dropdown-item" href="#" data="price,desc"
                                        onClick={(e) => this.props.setSort(e)}>цене по убыванию</a>
                                </div>
                            </div>
                        </li>
                    </ul>
                    
                    <div className="row">
                        <span className="products-toolbar-item__list-view">
                            <a href="#"
                                className={this.props.cardView === 'tile' ? 'active' : 'disabled'}
                                onClick={() => this.props.handleChangeCardView({cardView: 'tile'})}>
                                <i className="fa fa-th"></i>
                            </a>
                        </span>
                        <span className="products-toolbar-item__list-view">
                            <a href="#"
                                className={this.props.cardView === 'list' ? 'active' : 'disabled'}
                                onClick={() => this.props.handleChangeCardView({cardView: 'list'})}>
                                <i className="fa fa-list-ul"></i>
                            </a>
                        </span>
                    </div>
                </ul>
            </div>
        )
    }
}