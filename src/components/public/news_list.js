import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import request from "../../services/ajaxManager";
import {Helmet} from "react-helmet";

class NewsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            news: [],
        };
    }

    componentWillMount() {
        this.handleGet();
    }

    handleGet()
    {
        let _this = this;
        request(
            'news/news',
            'GET',
            null,
            {},
            function (response)
            {
                _this.setState({news: response});
            },
        );
    }

    render() {
        return (
            <div itemScope itemType="http://schema.org/NewsArticle">
                <Helmet>
                    <meta charSet="utf-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <meta name="theme-color" content="#000000"/>
                    <title>Новости - Универсал</title>
                    <meta name="keywords" content="купить хозтовары, хозяйственные товары, бытовые товары, хозяйственно-бытовые товары, товары для дома"/>
                    <meta name="description" content="Новости ООО 'Универсал Томск'"/>
                    <meta property="og:description" content="Новости ООО 'Универсал Томск'"/>
                    <meta property="og:title" content="Новости"/>
                    <meta property="og:url" content="https://universal.tom.ru/news"/>
                </Helmet>
                <h1>Новости</h1>
                {this.state.news.map((item, key) => {
                    let date = new Date(item.date);
                    return(
                        <div key={key} className={'row news'}>
                            <div className={'col-md-3'}>
                                <img itemProp="image" className={'newsImage'} alt={'image'} src={'https://api.universal.tom.ru/uploads/news/' + item.photo}/>
                            </div>
                            <div className={'col-md-9'}>
                                <h5 className={'text-left'} itemProp="headline">{item.title}</h5>
                                <p className={'text-left'} itemProp="articleBody">{item.short_content}</p>
                                <p className={'text-right'}>
                                    <small  itemProp="dateline">{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</small>
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default NewsList;
