import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import request from "../../services/ajaxManager";

class About extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
        };
    }

    componentWillMount() {
        this.handleGet();
    }

    handleGet()
    {
        let _this = this;
        request(
            'product/categories',
            'GET',
            null,
            {},
            function (response)
            {
                _this.setState({categories: response});
            },
        );
    }

    render() {
        return (
            <div>
                <h1>О Компании Универсал</h1>
                <p className={'text-left'}>
                    Основным направлением деятельности <strong>ООО "МиДи"</strong> является оптовая торговля товарами народного потребления: посуда, хозяйственные товары, инструменты. Наша цель - предоставление качественных товаров широкого ассортимента по разумным ценам.<br/><br/>
                    Большое количество товарных групп, низкие цены, взаимовыгодные условия работы, внимательное отношение к покупателям способствует росту и развитию компании.<br/><br/>
                    Мы не собираемся останавливаться на достигнутом, постоянно совершенствуем наши знания и опыт, расширяя ассортимент предлагаемых товаров.<br/><br/>
                    Приглашаем к сотрудничеству!
                </p>
                <br/>
                <h2>Все это можно приобрести в нашей компании:</h2>
                <ul className={'text-left'}>
                    {this.state.categories.map((item, key) => {
                        return (
                            <li key={key}>
                                <Link to={'/catalog/' + item.id}>{item.title}</Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default About;
