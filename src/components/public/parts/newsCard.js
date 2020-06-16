import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Card from './card';

import request from "../../../services/ajaxManager";
import {connect} from "react-redux";
import { withRouter } from "react-router";


class NewsCard extends Component {
    constructor(props) {
        super(props);

        this.isFavorite = this.isFavorite.bind(this);
        this.updateFav = this.updateFav.bind(this);
        
        this.state = {
            type: this.props.type,
            items: [],
            favorites: [],
            cardView: 'tile',

        }
    }

    componentWillMount() {
        let _this = this;

        request(
            this.state.type.category,
            'GET',
            null,
            {},
            function (response) {
                let products = response.filter(item => {
                    if(!item.count) {
                        return item;
                    }
                });
                _this.setState({items: products})
            },
        );
    }

    updateFav(obj) {
        let arr = this.state.favorites;
        let result;

        if (this.isFavorite(obj)) {
            result =  this.state.favorites.filter(item => {
                return obj.id !== item.id;
            });
        }
        else {
            result = arr;
            result.push(obj);
        }

        this.setState({favorites: result});
    }

    isFavorite(obj) {
        let result =  this.state.favorites.filter(item => {
            return obj.id === item.id;
        });

        return result.length > 0;
    }
    
    render() {
        if(this.state.items.length > 0) {
            return(
                <div className="row justify-content-center">
                <h3 className="text-center"><Link to={`/${this.state.type.category.split('/')[1]}`}>{this.state.type.title}</Link></h3>
                    <div id={"carouselExampleIndicators" + this.state.type.category.split('/')[1]} className="news-card carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                            { this.state.items
                            ? this.state.items.map((item, key) => {
                                return (
                                    <div key={key} 
                                        className={"carousel-item " + (key === 0 ? "active" : '')}
                                        style={{paddingBottom: '10px'}}>

                                        <Card item={item} update={this.updateFav}
                                            favorite={this.isFavorite(item) ? true : false}
                                            cardView={this.state.cardView}
                                            mainPage/>
                                    </div>
                                );
                            }) : <p className={'text-center'}>Товары не найдены</p>}
                        </div>
                        <a className="carousel-control-prev news-card__controls" href={"#carouselExampleIndicators" + this.state.type.category.split('/')[1]} role="button"
                            data-slide="prev">
                            <i className={'fa fa-chevron-left'}></i>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next news-card__controls" href={"#carouselExampleIndicators" + this.state.type.category.split('/')[1]} role="button"
                        data-slide="next">
                            <i className={'fa fa-chevron-right'}></i>
                            <span className="sr-only">Next</span>
                        </a>
                        
                    </div>
                </div>
            )
        } else return null;
    }
}

export default withRouter(connect(
    (state, ownProps) => ({
        token: state.token,
    }),
    dispatch => ({})
)(NewsCard));