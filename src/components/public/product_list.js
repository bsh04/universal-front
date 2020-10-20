import React, {Component} from 'react';

import request from "../../services/ajaxManager";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {Helmet} from "react-helmet";
import Breadcrumbs from '../breadcrumbs';
import Loading from '../loading';
import {CategoriesContext} from '../../services/contexts';

import ProductCard from './parts/product/ProductCard';
import {SubCategoriesRow} from './parts/SubCategoriesRow';
import {ProductToolbar} from './parts/ProductToolbar';

import { TruePagination } from '../truePagination';

class ProductList extends Component {
    constructor(props) {
        super(props);

        this.isFavorite = this.isFavorite.bind(this);
        this.updateFav = this.updateFav.bind(this);

        this.state = {
            loading: false,
            limitAll: false,
            totalItems: 50,
            products: [],
            favorites: [],
            cardView: 'tile',
            limit: 50,
            offset: 0,
            catList: [],
            sort: ['title', 'asc'],
            request: false,
            path: null,
        };
    }

    loadMore() {
        if (this.productListInnerContainer &&
            this.productListInnerContainer.getBoundingClientRect().bottom + 50 < window.innerHeight
            && this.state.limitAll && this.state.products.length < this.state.totalItems) {

            this.setState({
                loading: true,
                limit: (this.state.limit + 50)
            }, () => this.handleGet(this.props.match.params.category))
        }
    }

    setCategory(cat) {
        if (cat === 'new') {
            return 'Новые товары';
        } else if (cat === 'stock') {
            return 'Товары по акции';
        } else if (this.state.products && this.state.products[0]) {
            return this.state.products[0].category.title;
        }
    }

    componentDidMount() {
        this.handleGet(this.props.match.params.category);

        if (this.props.token !== false) {
            this.getFavorites();
        }
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.loadMore.bind(this));
    }

    componentDidUpdate(prevProps, prevState) {

        if(JSON.stringify(this.props.location.pathname) !== JSON.stringify(prevProps.location.pathname) 
        || JSON.stringify(this.props.location.search) !== JSON.stringify(prevProps.location.search)) {
            
            this.handleGet(this.props.match.params.category);
            
            let path = this.setCategory(this.props.match.params.category) // название категории по русски
            
            this.setState({
                path: path,
                cat: this.props.match.params.category,
            });
        }
        
        

    }

    getFavorites() {
        let _this = this;

        request(
            'product/favorite',
            'GET',
            null,
            {},
            function (response) {
                _this.setState({favorites: response});
            },
        );
    }

    handleGet = (cat) => {
        this.setState({ready: false})


        if (!cat) {
            return null;
        }

        let pickPage = this.props.location.search ? this.props.location.search.split('=')[1] : null;

        let obj = {
            cat: cat,
            limit: this.state.limit,
            sort_field: `${this.state.sort[0]}`,
            sort: `${this.state.sort[1]}`,
            offset: pickPage ? this.state.limit * (pickPage - 1) : this.state.offset,
        }
        let str = "";
        
        for (let key in obj) {
            if (str !== "") {
                str += "&";
            }
            str += key + "=" + encodeURIComponent(obj[key]);
        }
        
        let _this = this;

        if (cat === 'search') {

            if (!this.state.request && this.props.location.search.length > 0) {
                this.setState({request: true});
                request(
                    'product/search' + '?' + str + (this.props.match.params.searchValue ? '&data=' + this.props.match.params.searchValue : ''),
                    'POST',
                    {
                        data: (/%[0-9a-f]{2}/i.test(this.props.location.search.substr(3)) ?
                            decodeURI(this.props.location.search.substr(3)) :
                            this.props.location.search.substr(3))
                    },
                    {},
                    function (response) {
                        let totalItems = response.length - 1;

                        response.splice(-1, 1);
                        _this.setState({
                            products: response,
                            catList: [],
                            totalItems: totalItems,
                            request: false,
                            ready: true
                        });

                    },
                    function (err) {
                        alert('Ошибка запроса', 'Невозможно выполнить запрос')
                    }
                );
            }
        } else {
            request(
                'product/' + cat + '?' + str + (this.props.match.params.searchValue ? '&data=' + this.props.match.params.searchValue : ''),
                'GET',
                null,
                {},
                function (response) {
                    let totalItems = response.pop().count - 1;

                    response.splice(-1, 1);

                    let categories = [];
                    
                    response.map(item => {
                        let tmp = {id: item.category.id, title: item.category.title}
                        if (categories.find((element) => {
                            return tmp.id === element.id
                        }) === undefined) {
                            categories.push(tmp);
                        }
                    });
                    _this.setState({products: response}, () => {
                        _this.setState({
                            path: _this.setCategory(_this.props.match.params.category),
                            totalItems: totalItems,
                            loading: false,
                            ready: true
                        })
                    });
                }
            );
        }
    }

    updateFav(obj) {
        let arr = this.state.favorites;
        let result;

        if (this.isFavorite(obj)) {
            result = this.state.favorites.filter(item => {
                return obj.id !== item.id;
            });
        } else {
            result = arr;
            result.push(obj);
        }

        this.setState({favorites: result});
    }

    isFavorite(obj) {
        let result = this.state.favorites.filter(item => {
            return obj.id === item.id;
        });

        return result.length > 0;
    }

    setLimit = (e, all = false) => {
        let limit = e.target.getAttribute('data');
        this.setState({
            limit: limit,
            offset: 0,
            limitAll: all
        }, () => {
            this.handleGet(this.props.match.params.category)
        });
        if (all) {
            window.addEventListener("scroll", this.loadMore.bind(this));
        }

    }

    setSort = (e) => {
        let sort = e.target.getAttribute('data').split(',');
        this.setState({
            sort: sort
        }, () => {
            this.handleGet(this.props.match.params.category)
        })
    }

    sortSelectedLabel = () => {
        let param = this.state.sort.join('-')

        switch (param) {
            case 'title-asc':
                return 'названию А-Я'
            case 'title-desc':
                return 'названию Я-А'
            case 'price-asc':
                return 'цене по возрастанию'
            case 'price-desc':
                return 'цене по убыванию'
        }
    }

    paginationItems() {
        let arr = new Array(Math.ceil(this.state.totalItems / this.state.limit)).fill('');

        return arr.map((item, key) => {
            return (
                <li key={key} className="page-item">
                    <a className="page-link" onClick={() => this.setState({offset: (this.state.limit * key)})}>
                        {key + 1}
                    </a>
                </li>
            )
        });
    }

    
    render() {
        return (
            <CategoriesContext.Consumer>
                {contextValue => {
                    
                    let catList = [];
                    let productPageTitle = null;

                    if (contextValue.categories && contextValue.categories.length > 0 && this.props.match.params.category !== 'new'
                        && this.props.match.params.category !== 'stock' && this.props.match.params.category !== 'search') {

                        let obj = contextValue.categories.find(item => item.id === this.props.match.params.category);

                        if (obj && obj.title) {
                            productPageTitle =  obj.title;
                        } else {
                            contextValue.categories.map(item => item.children ? item.children.map(item => item.id === this.props.match.params.category ? productPageTitle = item.title : null) : null)
                        }

                        if (obj && obj.children !== undefined) {
                            catList = obj.children;
                            if (catList !== undefined && catList.length > 0) {
                                obj = catList.find(item => item.id === this.props.match.params.category)
                            }

                        } else {
                            let obj = contextValue.categories.find(item => {
                                if (item.children !== undefined && item.children.length > 0
                                    && item.children.find(item => item.id === this.props.match.params.category)) {
                                    return item;
                                }
                            });
                            catList = obj.children;
                        }



                    } else {
                        catList = this.state.catList;
                    }


                    return <div className="w-100">
                        <Helmet>
                            <meta charSet="utf-8"/>
                            <meta name="viewport" content="width=device-width, initial-scale=1"/>
                            <meta name="theme-color" content="#000000"/>
                            <title>Каталог - Универсал</title>
                            <meta name="keywords"
                                  content="купить хозтовары, хозяйственные товары, бытовые товары, хозяйственно-бытовые товары, товары для дома"/>
                            <meta name="description"
                                  content="Товары для дома, хозяйственные товары, спец. одежда и многое другое!"/>
                            <meta property="og:description"
                                  content="Множество товаров для дома, хозяйства, авто и многого другого!"/>
                            <meta property="og:title" content="Каталог"/>
                            <meta property="og:url" content="https://universal.tom.ru/catalog/*"/>
                        </Helmet>
                        {this.state.path && this.state.products.length > 0
                            ?
                            <Breadcrumbs
                                path={[{title: 'Каталог', link: '/catalog'}].concat(
                                    this.props.match.params.category !== 'new'
                                    && this.props.match.params.category !== 'stock'
                                    && this.state.products[0].category.parent
                                    && this.state.products[0].category.parent.id !== this.props.match.params.category ?
                                        [{
                                            title: this.state.products[0].category.parent.title,
                                            link: ('/catalog/' + this.state.products[0].category.parent.id)
                                        }] : [],
                                    [
                                        this.state.products[0].category.parent
                                        && this.state.products[0].category.parent.id === this.props.match.params.category ?
                                            {title: this.state.products[0].category.parent.title} :
                                            {title: this.state.path}]
                                )}/>
                            : null}



                        {productPageTitle ?
                            <h3 className="page-title">{productPageTitle}</h3>
                            : null}

                        {this.props.match.params.category !== 'new' && this.props.match.params.category !== 'stock'
                        && this.props.match.params.category !== 'search' && catList.length > 0 ?
                            <SubCategoriesRow catList={catList} location={this.props.location}/>
                            : null}

                        <ProductToolbar
                            cardView={this.state.cardView}
                            handleChangeCardView={(obj) => this.setState({cardView: obj.cardView})}
                            sortSelectedLabel={this.sortSelectedLabel}
                            setSort={this.setSort}
                            setLimit={this.setLimit}
                            limitAll={this.state.limitAll}
                            limit={this.state.limit}
                        />

                        {
                            this.state.ready
                                ?
                                <>
                                    <div className="row products-wrapper"
                                         ref={(target) => this.productListInnerContainer = target}>
                                        {this.state.products.length > 0 ? this.state.products.map((item, key) => {
                                            if (key < this.state.limit) {
                                                
                                                return (
                                                    <ProductCard 
                                                        key={key}    
                                                        item={item}
                                                        update={this.updateFav}
                                                        favorite={this.isFavorite(item)}
                                                        cardView={this.state.cardView}
                                                    />
                                                );
                                            } else {
                                                return null;
                                            }
                                        }) : <p className={'text-center'}>Товары не найдены</p>}
                                    </div>
                                    <TruePagination 
                                        numberOfPages={Math.ceil(this.state.totalItems / this.state.limit)}
                                        onPageSelect={(page) => this.props.history.push(`?page=${page}`)}
                                    />
                                </>
                                :
                                <Loading/>
                        }
                    </div>
                }}
            </CategoriesContext.Consumer>
        );
    }
}

export default withRouter(connect(
    (state, ownProps) => ({
        token: state.token,
    }),
    dispatch => ({})
)(ProductList));
