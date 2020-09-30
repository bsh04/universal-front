import React, { Component } from 'react';

export class ProductToolbar extends Component {
    constructor(props) {
        super(props);

        this.selectLimitRef = React.createRef();
        this.selectSortRef = React.createRef();

        this.state = {
            dropdownList: [this.selectLimitRef, this.selectSortRef]
        }
    }

    componentDidMount() {
        if(this.selectLimitRef && this.selectSortRef) {
            this.selectLimitRef.current.addEventListener('click', this.handleDropdownClick);
            this.selectSortRef.current.addEventListener('click', this.handleDropdownClick);
        }
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
        if(this.selectLimitRef && this.selectSortRef) {
            this.selectLimitRef.current.removeEventListener('click', this.handleDropdownClick);
            this.selectSortRef.current.removeEventListener('click', this.handleDropdownClick);
        }
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if(!event.target) {
            return null
        }
        if ((this.selectLimitRef && !this.selectLimitRef.current.contains(event.target)) 
        && this.selectSortRef && !this.selectSortRef.current.contains(event.target)
        && event.target.classList && !event.target.classList.contains('products-toolbar-dropdown__list-item') ) {
            this.state.dropdownList.forEach(item => item.current.classList.remove('active'));
        }
    };

    shouldComponentUpdate(prevProps) {
        if(prevProps !== this.props) {
            return true;
        } else return false;

    }

    handleDropdownClick = (e) => {
        this.state.dropdownList.forEach(item => {
            item.current.classList.remove('active');
            if(e.target === item.current) {
                item.current.classList.toggle('active');
            }
        });
    }

    handlehandleSelectLimit = (e, all) => {
        
        this.props.setLimit(e, all ? true : false);
        this.state.dropdownList.forEach(item => item.current.classList.remove('active'));
    }

    handleSelectSort = (e) => {
        this.props.setSort(e);
        this.state.dropdownList.forEach(item => item.current.classList.remove('active'));
    }
    

    render() {
        return (
            <div className="products-toolbar row">
                
                <div className="products-toolbar-dropdown">
                    <span className="products-toolbar-dropdown__title">Товаров на странице: </span>
                    
                    <div className="products-toolbar-dropdown__toggle" ref={this.selectLimitRef}>
                        <span className="products-toolbar-dropdown__toggle-text">
                            {this.props.limitAll ? 'Все' : this.props.limit}
                        </span>
                        <span className="products-toolbar-dropdown__toggle-icon"></span>

                        <div className="products-toolbar-dropdown__list">
                            <span className="products-toolbar-dropdown__list-item" data="50"
                                onClick={(e) => this.handlehandleSelectLimit(e)}>50</span>
                            <span className="products-toolbar-dropdown__list-item" data="100"
                                onClick={(e) => this.handlehandleSelectLimit(e)}>100</span>
                            <span className="products-toolbar-dropdown__list-item" data="50"
                                onClick={(e) => this.handlehandleSelectLimit(e, true)}>Все</span>
                        </div>
                    </div>

                    
                </div>
                
                <div className="products-toolbar-dropdown">
                    <span className="products-toolbar-dropdown__title">Сортировать по: </span>
                    <div className="products-toolbar-dropdown__toggle products-toolbar-dropdown__toggle_second"
                        ref={this.selectSortRef}
                    >
                        <span className="products-toolbar-dropdown__toggle-text">
                            {this.props.sortSelectedLabel()}
                        </span>
                        <span className="products-toolbar-dropdown__toggle-icon"></span>

                        <div className="products-toolbar-dropdown__list">
                            <span className="products-toolbar-dropdown__list-item" data="title,asc"
                                onClick={(e) => this.handleSelectSort(e)}>названию А-Я</span>
                            <span className="products-toolbar-dropdown__list-item" data="title,desc"
                                onClick={(e) => this.handleSelectSort(e)}>названию Я-А</span>
                            <span className="products-toolbar-dropdown__list-item" data="price,asc"
                                onClick={(e) => this.handleSelectSort(e)}>цене по возрастанию</span>
                            <span className="products-toolbar-dropdown__list-item" data="price,desc"
                                onClick={(e) => this.handleSelectSort(e)}>цене по убыванию</span>
                            </div>
                    </div>
                    
                </div>
                    
                <div className="products-toolbar-view-control">
                    <span className="products-toolbar-view-control__item">
                        <span
                            className={this.props.cardView === 'tile' ? 'active' : 'disabled'}
                            onClick={() => this.props.handleChangeCardView({cardView: 'tile'})}>
                            <i className="fa fa-th"></i>
                        </span>
                    </span>
                    <span className="products-toolbar-view-control__item">
                        <span
                            className={this.props.cardView === 'list' ? 'active' : 'disabled'}
                            onClick={() => this.props.handleChangeCardView({cardView: 'list'})}>
                            <i className="fa fa-list-ul"></i>
                        </span>
                    </span>
                </div>
                
            </div>
        )
    }
}