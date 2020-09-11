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
                    title: 'Сорк пошива - 2-3 рабочих дня',
                    image: require('../../../images/workshop_list/advantages.png')
                },
                {
                    id: 2,
                    title: 'Фабричное качество пошива',
                    image: require('../../../images/workshop_list/advantages.png')
                },
                {
                    id: 3,
                    title: 'Только качественные ткани',
                    image: require('../../../images/workshop_list/advantages.png')
                }
            ],
            listMaterials: [
                {
                    id: 1,
                    title: 'Бязь',
                    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque cupiditate hic praesentium reiciendis repellat. Alias aliquid aspernatur delectus dignissimos nemo perferendis sunt suscipit velit voluptatibus. Accusamus, adipisci aliquam architecto consequuntur corporis culpa cum dignissimos ducimus earum eius esse, excepturi explicabo facere facilis id incidunt ipsam iusto labore magni molestiae nam nisi nulla odit pariatur possimus quae qui quia quos ratione rerum suscipit tempora vel velit, veritatis voluptate voluptatibus voluptatum! A.',
                    image: require('../../../images/workshop_list/material.png')
                },
                {
                    id: 2,
                    title: 'Сатин',
                    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquam aliquid architecto blanditiis commodi cupiditate dicta dolor ducimus eaque eius facere impedit incidunt laborum nam nostrum odit officiis perferendis porro, quae quia sapiente totam ut, velit veritatis voluptate. Accusamus eligendi expedita labore laudantium non reiciendis repellat suscipit tempore! Aspernatur debitis dicta labore laborum libero non placeat repellat temporibus ullam unde? Expedita nemo quibusdam soluta totam! Ab accusantium dignissimos esse ex expedita fugit ipsa ipsum iste iusto laboriosam libero modi nam nemo, nihil nobis nulla possimus provident quaerat quam quas qui reiciendis reprehenderit repudiandae sed similique sint suscipit totam ullam voluptatem!',
                    image: require('../../../images/workshop_list/material.png')
                },
                {
                    id: 3,
                    title: 'Поплин',
                    body: 'Lorem ipsum dolor sit amet, laboriosam minus necessitatibus possimus quasi, rem suscipit. A aliquam aliquid aspernatur at, cupiditate dolore fugiat id magni neque nisi nobis, nostrum pariatur provident qui quidem quisquam quod, temporibus tenetur velit veniam veritatis voluptas voluptatum! Ad architecto, consectetur corporis dolores, enim eveniet excepturi impedit inventore maxime numquam officiis quibusdam tempore voluptatibus? Aliquam animi assumenda, commodi cumque ex, exercitationem expedita iusto nostrum nulla obcaecati reiciendis tempora totam, voluptas voluptate voluptates? Ad aut consequuntur cupiditate delectus dignissimos dolorem ducimus ea eaque eligendi eos eveniet ex excepturi fugiat, hic incidunt ipsam labore molestias, mollitia natus officiis optio perspiciatis qui repellendus rerum tempora tempore ullam unde ut velit veritatis vero voluptatem!',
                    image: require('../../../images/workshop_list/material.png')
                },
                {
                    id: 4,
                    title: 'Полиэстер',
                    body: 'Lorem ipsum dolor sit amet, Ad architecto, consectetur corporis dolores, enim eveniet excepturi impedit inventore maxime numquam officiis quibusdam tempore voluptatibus? Aliquam animi assumenda, commodi cumque ex, exercitationem expedita iusto nostrum nulla obcaecati reiciendis tempora totam, voluptas voluptate voluptates? Ad aut consequuntur cupiditate delectus dignissimos dolorem ducimus ea eaque eligendi eos eveniet ex excepturi fugiat, hic incidunt ipsam labore molestias, mollitia natus officiis optio perspiciatis qui repellendus rerum tempora tempore ullam unde ut velit veritatis vero voluptatem!',
                    image: require('../../../images/workshop_list/material.png')
                }
            ],
            listExamples: [
                {image: require('../../../images/workshop_list/examples.png')},
                {image: require('../../../images/workshop_list/examples.png')},
                {image: require('../../../images/workshop_list/examples.png')},
                {image: require('../../../images/workshop_list/examples.png')},
                {image: require('../../../images/workshop_list/examples.png')},
                {image: require('../../../images/workshop_list/examples.png')},
            ],
            listSize: [
                {id: 1, title: 'Полуторный', body: 'Это стандартный комплект, состоящий из одного пододеяльника 215'},
                {id: 2, title: 'Двуспальный', body: 'В него входит один пододеяльник 215*175см, одна простыня 220*20'},
                {
                    id: 3,
                    title: 'Двуспальный ЕВРО',
                    body: 'Отличие этих комплектов от двуспальных в размере пододеяльника '
                },
                {id: 4, title: 'Семейный', body: 'Этот комплект постельного белья подразумевает наличие двух подо'},
                {id: 5, title: 'Детский', body: 'Предназначен для малышей, которые спят в детских кроватках. Сос'},
            ]
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
        if (window.innerWidth < 1000) {
            this.setState({mobileMode: true})
        } else {
            this.setState({mobileMode: false})
        }
    }

    handleGet(cat) {
        let _this = this;
        request(
            'article/' + cat,
            'GET',
            null,
            {},
            function (response) {
                _this.setState({article: response});
            },
        );
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
                    <img src={item.image}/>
                </div>
                <div className='material-item-description'>
                    <h5>{item.title}</h5>
                    <p>{item.body}</p>
                </div>
            </div>
        )
    }

    renderExamples(item, index) {
        return (
            <img src={item.image}/>
        )
    }

    renderSize(item, index) {
        return (
            <div className='size-list-item' key={index}>
                <div className='size-item-description'>
                    <h5>{item.title}</h5>
                    <p>{item.body}</p>
                </div>
            </div>
        )
    }

    render() {
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
                    <p>
                        {
                            this.state.article ?
                                parse(this.state.article.content).map((item, index) => {
                                    return item
                                    // if (index === 0 || index === 2) {
                                    //     console.log(item)
                                    //     if (index === 2)item.props.children.map((li, index) => index%2 !== 0 ? li.props.children.props.style.color = 'gray'  : null)
                                    //     else item.props.children.props.style.color = 'gray';
                                    //     return item
                                    // }
                                })
                                :
                                null
                        }
                    </p>
                </div>
                <div className='workshop-item-advantages'>
                    <p className='advantages'>наши преимущества</p>
                    {
                        this.state.listAdvantages.map((item, index) => this.renderAdvantages(item, index))
                    }
                </div>
                {
                    this.state.mobileMode
                        ?
                        <div className='workshop-item-materials'>
                            <div className='materials-header'>
                                <h4>Материалы</h4>
                            </div>
                            <div className='materials-body'>
                                {
                                    this.state.listMaterials.map((item, index) => <DetailsMaterials item={item}
                                                                                                    index={index}/>)
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
                                    this.state.listMaterials.map((item, index) => this.renderMaterials(item, index))
                                }
                            </div>
                        </div>
                }
                <div className='workshop-item-examples'>
                    {
                        this.state.listExamples.map((item, index) => this.renderExamples(item, index))
                    }
                </div>
                {
                    this.state.mobileMode
                        ?
                        <div className='workshop-item-size'>
                            <div className='size-header'>
                                <h4>Размеры</h4>
                            </div>
                            <p>Постельное белье отличается не только размерами, но и комплектами</p>
                            <div className='size-body'>
                                {
                                    this.state.listSize.map((item, index) => <DetailsSize item={item} index={index}/>)
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
                            <p>Постельное белье отличается не только размерами, но и комплекта</p>
                            <div className='size-body'>
                                {
                                    this.state.listSize.map((item, index) => this.renderSize(item, index))
                                }
                            </div>
                        </div>
                }

                <div className='workshop-item-order'>
                    <img src={require('../../../images/workshop_list/order.png')}/>
                    <p>Также мы можем изготовить постельное белье по вашим размерам</p>
                </div>
            </div>
        );
    }
}

export default withRouter(connect(
    (state, ownProps) => ({
        token: state.token,
    }),
    dispatch => ({})
)(Workshop));
