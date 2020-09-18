import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Helmet} from "react-helmet";

import News from './parts/news';
import NewsCard from './parts/newsCard';
import CardCarousel from './parts/cards_carousel';
import CategoryList from '../public/parts/category_list';
import request from "../../services/ajaxManager";
import { CategoriesContext } from '../../services/contexts';
import DeliveryAndPaymentIndexPage from "./parts/deliveryAndPayment";

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            news: [],
            stocks: [],
            showCatalogOutMenu: true,
        }
    }

    componentWillMount() {
        this.handleGet();
    }

    componentWillUnmount() {
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
                <div className='w-100'>
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
                    
                    <div>
                        <div className={"col-md-12"}>
                            <h3 ><Link to='/news'>Новости</Link></h3>
                            <News type="news"/>
                            <br/>
                            <h3><Link to='/catalog/stock'>Акции</Link></h3>
                            <News type="stocks"/>
                            <br/>
                        </div>
                    </div>
                </div>
            )
    }
}

export default Index;
