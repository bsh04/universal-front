import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import request from "../../services/ajaxManager";
import {Helmet} from "react-helmet";
import Breadcrumbs from '../breadcrumbs';
import Pagination from "../pagination";


class NewsList extends Component {
    constructor(props) {
        super(props);

        this.handleGet = this.handleGet.bind(this)

        this.state = {
            news: null,
        };
    }

    componentDidMount() {
        this.handleGet();
    }

    renderItems(item, index) {
        let date = new Date(item.date);
        return (
            <div key={index} className="card card-container">
                <div className="image-wrapper">
                    <img itemProp="image" className={'card-img-top'} alt={'image'}
                        src={'https://api.universal.tom.ru/uploads/news/' + item.photo}/>
                </div>
                <div className="card-body">
                    <small itemProp="dateline">{date.getDate()}.{date.getMonth() + 1}.{date.getFullYear()}</small>
                    <h5 className='card-title' itemProp="headline">{item.title}</h5>
                    <p className="card-text">{item.short_content}</p>
                </div>
            </div>
        );
    }

    handleGet = (_, page) => {
        let _this = this;
        request(
            `news/news?page=${page ? page : 1}`,
            'GET',
            null,
            {},
            function (response) {
                console.log(response)
                _this.setState({news: response});
            },
        );
    }

    render() {
        return (
            <div className='news' itemScope itemType="http://schema.org/NewsArticle">
                <Helmet>
                    <meta charSet="utf-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <meta name="theme-color" content="#000000"/>
                    <title>Новости - Универсал</title>
                    <meta name="keywords"
                          content="купить хозтовары, хозяйственные товары, бытовые товары, хозяйственно-бытовые товары, товары для дома"/>
                    <meta name="description" content="Новости ООО 'Универсал Томск'"/>
                    <meta property="og:description" content="Новости ООО 'Универсал Томск'"/>
                    <meta property="og:title" content="Новости"/>
                    <meta property="og:url" content="https://universal.tom.ru/news"/>
                </Helmet>
                <Breadcrumbs path={[{title: 'Новости'}]}/>
                <h1>Новости</h1>
                <div className='news-container'>
                    {
                        this.state.news
                            ?
                            this.state.news.data.length > 0
                                ?
                                this.state.news.data.map((item, key) => this.renderItems(item, key))
                                : null
                            : null
                    }
                </div>
                <div>
                    {
                        this.state.news
                            ?
                            this.state.news.data.length > 0
                                ?
                                <Pagination numberItems={this.state.news.count}
                                            offset={Number(this.state.news.data.length)}
                                            handleGet={this.handleGet}
                                            currentCategory
                                />
                                : null
                            : null
                    }
                </div>
            </div>
        );
    }
}

export default NewsList;
