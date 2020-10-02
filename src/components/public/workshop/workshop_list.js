import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import request from "../../../services/ajaxManager";
import {Helmet} from "react-helmet";
import Breadcrumbs from '../../breadcrumbs';
import CircularProgress from '@material-ui/core/CircularProgress';
import {articleImages} from '../../../services/parameters'

class ArticleList extends Component {
    constructor(props) {
        super(props);


        this.state = {
            articles: [],
            ready: false
        };
    }

    componentWillMount() {
        this.handleGet();

        this.getSizeWindow()
        this.getSizeWindow = this.getSizeWindow.bind(this)
        window.addEventListener('resize', this.getSizeWindow.bind(this))
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.getSizeWindow.bind(this))
    }


    getSizeWindow() {
        if (window.innerWidth < 768) {
            this.setState({mobileMode: true})
        } else {
            this.setState({mobileMode: false})
        }
    }

    handleGet() {
        let _this = this;
        request(
            'article/',
            'GET',
            null,
            {},
            function (response) {
                _this.setState({articles: response, ready: true});
            },
        );
    }

    renderList(item, key) {
        return (
            <Link className='item-container' key={key} to={'/workshop/' + item.id}>
                <img src={item.icon ? articleImages + item.icon : null}/>
                <p className="text">{item.title}</p>
            </Link>
        );
    }

    render() {
        return (
            <div className='workshop-list-container' itemScope itemType="http://schema.org/ItemList">
                <Helmet>
                    <meta charSet="utf-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <meta name="theme-color" content="#000000"/>
                    <title>Швейный цех - Универсал</title>
                    <meta name="keywords"
                          content="купить хозтовары, хозяйственные товары, бытовые товары, хозяйственно-бытовые товары, товары для дома"/>
                    <meta name="description"
                          content="Товары для дома, хозяйственные товары, спец. одежда и многое другое! Изготовление на заказ. Низкие цены."/>
                    <meta property="og:description"
                          content="Множество товаров для дома, хозяйства, авто и многого другого! Изготовление на заказ. Низкие цены."/>
                    <meta property="og:title" content="Швейный цех"/>
                    <meta property="og:url" content="https://universal.tom.ru/workshop"/>
                </Helmet>
                <Breadcrumbs path={[{title: 'Швейный цех'}]}/>
                <h4 itemProp="headline">Швейный цех</h4>
                {
                    this.state.ready ?
                        <>
                            <div className="workshop-banner">
                                {
                                    this.state.mobileMode
                                        ?
                                        <img
                                            src={require("../../../images/workshop_list/workshop_main_image_mobile.png")}
                                            alt="Швейное производство"/>
                                        :
                                        <img src={require("../../../images/workshop_list/workshop_main_image.png")}
                                             alt="Швейное производство"/>
                                }
                            </div>
                            <div className="workshop-list-body">
                                {this.state.articles.map((item, key) => this.renderList(item, key))}
                            </div>
                        </>
                        :
                        <CircularProgress className='mt-5'/>
                }
            </div>
        );
    }
}

export default ArticleList;
