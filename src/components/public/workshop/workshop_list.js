import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import request from "../../../services/ajaxManager";
import {Helmet} from "react-helmet";
import Breadcrumbs from '../../breadcrumbs';

class ArticleList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            articles: [],
        };
    }

    componentWillMount() {
        this.handleGet();
    }

    handleGet()
    {
        let _this = this;
        request(
            'article/',
            'GET',
            null,
            {},
            function (response)
            {
                _this.setState({articles: response});
            },
        );
    }

    render() {
        return (
            <div itemScope itemType="http://schema.org/ItemList">
                <Helmet>
                    <meta charSet="utf-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <meta name="theme-color" content="#000000"/>
                    <title>Швейный цех - Универсал</title>
                    <meta name="keywords" content="купить хозтовары, хозяйственные товары, бытовые товары, хозяйственно-бытовые товары, товары для дома"/>
                    <meta name="description" content="Товары для дома, хозяйственные товары, спец. одежда и многое другое! Изготовление на заказ. Низкие цены."/>
                    <meta property="og:description" content="Множество товаров для дома, хозяйства, авто и многого другого! Изготовление на заказ. Низкие цены."/>
                    <meta property="og:title" content="Швейный цех"/>
                    <meta property="og:url" content="https://universal.tom.ru/workshop"/>
                </Helmet>
                <Breadcrumbs path={[{title: 'Швейный цех'}]} />
                <h1 itemProp="headline">Швейный цех</h1>
                <div className="workshop-banner">
                    <img src={require("../../../images/workshop_banner.jpeg")} alt="Швейное производство" className="workshop-banner__image"/>
                </div>
                <ul className="main-catalog-list pl-0 mt-3 mx-auto" style={{listStyle: 'none'}}>
                {this.state.articles.map((item, key) => {
                    return(
                        <li itemProp="itemListElement" key={key} className={'text-left main-catalog-list__item'}>
                            <Link to={'/workshop/' + item.id} className="main-catalog-list__text">{item.title}</Link>
                        </li>
                    );
                })}
                </ul>
            </div>
        );
    }
}

export default ArticleList;
