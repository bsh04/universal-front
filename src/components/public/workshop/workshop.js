import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import request from "../../../services/ajaxManager";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import Breadcrumbs from '../../breadcrumbs';
import DetailsMaterials from "./detailsMaterials";
import DetailsSize from "./detailsSize";
import parse from 'html-react-parser'
import login from "../sign_action/login";
import {articleImages} from '../../../services/parameters'
import ProductCard from "../parts/product/ProductCard";

class Workshop extends Component {
    constructor(props) {
        super(props);

        this.state = {
            article: null,
            mobileMode: false,
            showDetails: false,
            listAdvantages: [
                {
                    id: 1,
                    title: 'Срок пошива - 2-3 рабочих дня',
                    image: require('../../../images/workshop_list/advantages/clock.png')
                },
                {
                    id: 2,
                    title: 'Фабричное качество пошива',
                    image: require('../../../images/workshop_list/advantages/advantages.png')
                },
                {
                    id: 3,
                    title: 'Только качественные ткани',
                    image: require('../../../images/workshop_list/advantages/quilt.png')
                }
            ],
        };
    }

    componentWillMount() {

        this.getSizeWindow()
        this.getSizeWindow = this.getSizeWindow.bind(this)
        window.addEventListener('resize', this.getSizeWindow.bind(this))

        this.handleGet(this.props.match.params.id);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.getSizeWindow.bind(this))
    }

    componentWillReceiveProps(props) {
        this.handleGet(props.match.params.id);
    }

    getSizeWindow() {
        if (window.innerWidth < 768) {
            this.setState({mobileMode: true})
        } else {
            this.setState({mobileMode: false})
        }
    }

    handleGet(cat) {
        let _this = this;
        request(
            `article/${cat}`,
            'GET',
            null,
            {},
            function (response) {
                console.log(response)
                _this.setState({article: response}, () => _this.getProducts());
            },
        );
        request(
            'product/favorite',
            'GET',
            null,
            {},
            function (response) {
                _this.setState({favorites: response, ready: true, numberItems: response.length});
            },
        );
    }

    getProducts() {
        let _this = this
        if (this.state.article.category) {
            request(
                `product/${this.state.article.category.id}`,
                'GET',
                {},
                {},
                function (response) {
                    response.splice(-1, 1);
                    _this.setState({products: response})
                },
                function (err) {
                    console.log(err)
                }
            )
        }
    }

    renderAdvantages(item, index) {
        return (
            <div className='advantage-list-item' key={index}>
                <div className='advantage-item-image'>
                    <img src={item.image}/>
                </div>
                <p>{item.title}</p>
            </div>
        )
    }

    renderMaterials(item, index) {
        return (
            <div className='material-list-item' key={index}>
                <div className='material-item-image'>
                    {
                        item.image
                            ?
                            <img src={articleImages + item.image}/>
                            :
                            <div className='material-item-image__splash'>
                                <p>Нет фото</p>
                            </div>
                    }
                </div>
                <div className='material-item-description'>
                    <h5>{item.title}</h5>
                    <p>{item.content}</p>
                </div>
            </div>
        )
    }

    renderExamples(item, index) {
        return (
            <div className='workshop-item-examples__images'>
                <img className='workshop-item-examples__image' key={index} src={articleImages + item}/>
            </div>
        )
    }

    renderSize(item, index) {
        return (
            <div className='size-list-item' key={index}>
                <div className='size-item-description'>
                    <h5>{item.title}</h5>
                    <p>{item.content}</p>
                </div>
            </div>
        )
    }

    isFavorite = (obj) => {
        let result = this.state.favorites.filter(item => {
            return obj.id === item.id;
        });

        return result.length > 0;
    }

    updateFav = (obj) => {
        let arr = this.state.favorites;
        let result;

        if (this.isFavorite(obj)) {
            result = this.state.favorites.filter(item => {
                return obj.id !== item.id;
            });
        } else {
            result = arr;
            result.push(obj);
        }

        this.setState({favorites: result});
    }


    renderAll() {
        return (
            <div className='workshop-item' itemScope itemType="http://schema.org/Article">
                {this.state.article
                    ?
                    <Breadcrumbs
                        path={[
                            {title: 'Швейный цех', link: '/workshop'},
                            {title: this.state.article.title}
                        ]}/>
                    : null}
                <h4 itemProp="headline">{this.state.article ? this.state.article.title : ''}</h4>
                <div className='workshop-item-description'>
                    {
                        this.state.article && this.state.article.content ? parse(this.state.article.content) : null
                    }
                </div>
                {
                    this.state.article && this.state.article.materials.length !== 0
                        ?
                        this.state.mobileMode
                            ?
                            <div className='workshop-item-materials'>
                                <div className='materials-header'>
                                    <h4>Материалы</h4>
                                </div>
                                <div className='materials-body'>
                                    {
                                        this.state.article.materials.map((item, index) =>
                                            <DetailsMaterials item={item} index={index}/>)
                                    }
                                </div>
                            </div>
                            :
                            <div className='workshop-item-materials'>
                                <div className='materials-header'>
                                    <img src={require('../../../images/workshop_list/material-title.png')} alt=""/>
                                    <h4>Материалы</h4>
                                    <hr/>
                                </div>
                                <div className='materials-body'>
                                    {
                                        this.state.article.materials.map((item, index) => this.renderMaterials(item, index))
                                    }
                                </div>
                            </div>
                        :
                        null
                }
                {
                    this.state.article && this.state.article.images ?

                        <div className='workshop-item-examples'>
                            {
                                this.state.article.images.map((item, index) => this.renderExamples(item, index))
                            }
                        </div>
                        :
                        null
                }
                {
                    this.state.article && this.state.article.sizes
                        ?
                        this.state.mobileMode
                            ?
                            <div className='workshop-item-size'>
                                <div className='size-header'>
                                    <h4>Размеры</h4>
                                </div>
                                <p>Постельное белье отличается не только размерами, но и комплектацией. По виду КПБ
                                    разделяют на</p>
                                <div className='size-body'>
                                    {
                                        this.state.article.sizes.map((item, index) =>
                                            <DetailsSize item={item} index={index}/>)
                                    }
                                </div>
                            </div>
                            :
                            <div className='workshop-item-size'>
                                <div className='size-header'>
                                    <img src={require('../../../images/workshop_list/size.png')} alt=""/>
                                    <h4>Размеры</h4>
                                    <hr/>
                                </div>
                                <div className='size-body'>
                                    {
                                        this.state.article && this.state.article.sizes && this.state.article.sizes.map((item, index) => this.renderSize(item, index))
                                    }
                                </div>
                            </div>
                        :
                        null
                }

                <div className='workshop-item-order'>
                    {
                        this.state.article && this.state.article.utp
                            ?
                            <div className='workshop-item-order__header'>
                                <img src={require('../../../images/workshop_list/order.png')}/>
                                <p>{this.state.article.utp}</p>
                            </div>
                            :
                            null
                    }
                    <div className='workshop-item-advantages'>
                        <p className='advantages'>наши преимущества</p>
                        {
                            this.state.listAdvantages.map((item, index) => this.renderAdvantages(item, index))
                        }
                    </div>
                    <div className='workshop-item-order__body'>
                        {
                            this.state.products
                                ?
                                this.state.products.map((item, index) => <ProductCard favorite={this.isFavorite(item)}
                                                                                      update={this.updateFav}
                                                                                      item={item} key={index}/>)
                                :
                                null
                        }
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return this.renderAll()
    }
}

export default withRouter(connect(
    (state, ownProps) => ({
        token: state.token,
    }),
    dispatch => ({})
)(Workshop));
