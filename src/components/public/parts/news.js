import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import request from "../../../services/ajaxManager";
import Breadcrumbs from '../../breadcrumbs';

class News extends Component {
    constructor(props) {
        super(props);

        this.state = {
            news: [],
            type: ''
        };
    }

    componentDidMount() {
        window.$('.carousel').carousel();
        this.handleGet();
    }

    handleGet() {
        let _this = this;
        request(
            'news/news',
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
            <div id={"carouselExampleIndicators" + this.props.type} className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    {this.state.news ? this.state.news.data ? this.state.news.data.map((item, key) => {
                        return (
                            <li key={key} data-target={"#carouselExampleIndicators" + this.props.type} data-slide-to={key}
                                className={key === 0 ? "active" : ''}/>
                        );
                    }) : null : null}
                </ol>
                <div className="carousel-inner">
                    {this.state.news ? this.state.news.data ? this.state.news.data.map((item, key) => {
                        return (
                            <div key={key} className={"carousel-item " + (key === 0 ? "active" : '')}>
                                <img className="" src={"https://api.universal.tom.ru/uploads/news/" + item.photo}
                                     alt={(key + 1) + " slide"}/>
                                <div className="carousel-caption d-none d-md-block">
                                    <h5 className={''}>{item.title}</h5>
                                    <p className={''}>{item.short_content}</p>
                                </div>
                            </div>
                        );
                    }) : null : null}
                </div>
                <a className="carousel-control-prev" href={"#carouselExampleIndicators" + this.props.type} role="button"
                   data-slide="prev">
                    <i className={'fa fa-arrow-left'}/>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href={"#carouselExampleIndicators" + this.props.type} role="button"
                   data-slide="next">
                    <i className={'fa fa-arrow-right'}/>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        );
    }
}

export default News;
