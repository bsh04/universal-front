import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import request from "../../../services/ajaxManager";

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
            <div>
                <h1>Швейный цех</h1>
                <ul>
                {this.state.articles.map((item, key) => {
                    return(
                        <li key={key} className={'text-left'}>
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
