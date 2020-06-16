import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Helmet} from "react-helmet";

import News from './parts/news';
import NewsCard from './parts/newsCard';
import CardCarousel from './parts/cards_carousel';
import request from "../../services/ajaxManager";

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            news: [],
            stocks: [],
            categories: [],
            showCatalogOutMenu: true
        }
    }

    componentWillMount() {
        this.handleGet();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.checkWidnowSize.bind(this));
    }

    handleGet() {
        let _this = this;

        request(
            'product/new',
            'GET',
            null,
            {},
            function (response) {
                _this.setState({news: response});
            },
        );
        request(
            'product/stock',
            'GET',
            null,
            {},
            function (response) {
                _this.setState({stocks: response});
            },
        );
        request(
            'product/categories',
            'GET',
            null,
            {},
            function (response) {
                let sorted = response.map(item => {
                    
                    if(item.children.length > 1){
                        item.children = item.children.sort((current, next) => {
                            if(current.title < next.title) {
                                return -1;
                            }
                            if(current.title > next.title) {
                                return 1;
                            }
                            return 0
                        })
                    }
                    return item;                    
                })

                _this.setState({categories: sorted});
            },
        );
    }

    componentDidMount() {
        this.checkWidnowSize();
        window.addEventListener("resize", this.checkWidnowSize.bind(this));
    }

    checkWidnowSize() {
        if(window.innerWidth <= 1200) {
            this.setState({
                showCatalogOutMenu: false
            })
        } else {
            this.setState({
                showCatalogOutMenu: true
            })
        }
        if(window.innerWidth <= 992) {
            this.setState({
                isMobile: true
            })
        } else {
            this.setState({
                isMobile: false
            })
        }
    }

    itemView(item, type = null) {
        return (
            <div key={item.id} className="main-catalog-list__item">
                <Link to={'/catalog/' + item.id}
                      className="main-catalog-list__text">
                    <span>{item.title}</span>
                </Link>
            </div>
        );
    }

    render() {
        let items = this.state.categories.map(item => {
            return this.itemView(item)
        });
        
        return (
            <div>
                <Helmet>
                    <meta charSet="utf-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <meta name="theme-color" content="#000000"/>
                    <title>Главная - Универсал</title>
                    <meta name="keywords" content="купить хозтовары, хозяйственные товары, бытовые товары, хозяйственно-бытовые товары, товары для дома"/>
                    <meta name="description" content="Товары для дома, хозяйственные товары, спец. одежда и многое другое!"/>
                    <meta property="og:description" content="Множество товаров для дома, хозяйства, авто и многого другого!"/>
                    <meta property="og:title" content="Главная"/>
                    <meta property="og:url" content="https://universal.tom.ru/"/>
                </Helmet>
                
                { !this.state.isMobile 
                ? <div className="row">
                    {this.state.showCatalogOutMenu 
                    ?<div className="col-md-3 p-0">
                        <div className="main-catalog-list">
                            {items}
                        </div>
                    </div>
                    : null }
                    <div className={this.state.showCatalogOutMenu ? "col-md-9" : "col-md-12"}>
                        <h3 className="text-center"><Link to='/news'>Новости</Link></h3>
                        <News type="news"/>
                        <br/>
                        <h3 className="text-center"><Link to='/catalog/stock'>Акции</Link></h3>
                        <News type="stocks"/>
                        <br/>
                    </div>
                </div>
                : <div>
                    <NewsCard type={{title: 'Новинки', category: 'product/new'}} />
                    <NewsCard type={{title: 'Акции', category: 'product/stock'}} />
                    <h3 className="text-center mt-3"><Link to='/news'>Новости</Link></h3>
                    <News type="news"/>
                </div> }
            </div>
        );
    }
}

export default Index;
