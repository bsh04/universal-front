import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import request from "../../services/ajaxManager";

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
            <div>
                <h1>Новости</h1>
                {this.state.news.map((item, key) => {
                    let date = new Date(item.date);
                    return(
                        <div key={key} className={'row news'}>
                            <div className={'col-md-3'}>
                                <img className={'newsImage'} alt={'image'} src={'https://ts.vladimirov-mv.name/uploads/news/' + item.photo}/>
                            </div>
                            <div className={'col-md-9'}>
                                <h5 className={'text-left'}>{item.title}</h5>
                                <p className={'text-left'}>{item.short_content}</p>
                                <p className={'text-right'}>
                                    <small>{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</small>
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
