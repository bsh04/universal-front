import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import request from "../../../services/ajaxManager";
import {Helmet} from "react-helmet";

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
                    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <meta name="theme-color" content="#000000"/>
                    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
                    <title>Швейный цех - Универсал</title>
                    <meta name="keywords" content="купить хозтовары, хозяйственные товары, бытовые товары, хозяйственно-бытовые товары, товары для дома"/>
                    <meta name="description" content="Товары для дома, хозяйственные товары, спец. одежда и многое другое! Изготовление на заказ. Низкие цены."/>
                    <meta property="og:description" content="Множество товаров для дома, хозяйства, авто и многого другого! Изготовление на заказ. Низкие цены."/>
                    <meta property="og:title" content="Швейный цех"/>
                    <meta property="og:url" content="https://universal.tom.ru/workshop"/>
                </Helmet>
                <h1 itemProp="headline">Швейный цех</h1>
                <ul>
                {this.state.articles.map((item, key) => {
                    return(
                        <li itemProp="itemListElement" key={key} className={'text-left'}>
                            <Link to={'/workshop/' + item.id}>{item.title}</Link>
                        </li>
                    );
                })}
                </ul>
            </div>
        );
    }
}

export default ArticleList;
