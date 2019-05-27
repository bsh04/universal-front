import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import request from "../../../services/ajaxManager";

class News extends Component {
    constructor(props) {
        super(props);

        this.state = {
            news: [],
        };
    }

    componentWillMount() {
        this.handleGet();
    }

    componentDidMount() {
        window.$('.carousel').carousel();
    }

    handleGet()
    {
        let _this = this;
        request(
            'news',
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
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    {this.state.news.map((item, key) => {
                        return (
                            <li key={key} data-target="#carouselExampleIndicators" data-slide-to={key} className={key === 0 ? "active" : ''}></li>
                        );
                    })}
                </ol>
                <div className="carousel-inner">
                    {this.state.news.map((item, key) => {
                        return (
                            <div key={key} className={"carousel-item " + (key === 0 ? "active" : '')}>
                                <img className="" src={"https://ts.vladimirov-mv.name/uploads/news/" + item.photo}
                                     alt={(key + 1) + " slide"}/>
                                <div className="carousel-caption d-none d-md-block">
                                    <h5 className={''}>{item.title}</h5>
                                    <p className={''}>{item.short_content}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <i className={'fa fa-arrow-left'}></i>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <i className={'fa fa-arrow-right'}></i>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        );
    }
}

export default News;
