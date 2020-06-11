import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Helmet} from "react-helmet";

import News from './parts/news';
import CardCarousel from './parts/cards_carousel';
import request from "../../services/ajaxManager";

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            news: [],
            stocks: [],
        }
    }

    componentWillMount() {
        this.handleGet();
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
    }

    render() {
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
                <h3 className="text-center"><Link to='/news'>Новости</Link></h3>
                <News type="news"/>
                <br/>
                <h3 className="text-center"><Link to='/news'>Акции</Link></h3>
                <News type="stocks"/>
                <br/>
            </div>
        );
    }
}

export default Index;
