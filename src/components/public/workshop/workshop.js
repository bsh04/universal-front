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
            listMaterials: [
                {
                    id: 1,
                    title: 'Бязь',
                    body: '100% хлопок. Ткань не такая гладкая и мягкая, как сатин и поплин, изготавливается с помощью крестообразного плетения нескрученной пряжи. Главные свойства бязевого постельного белья: гигиеничность, экологическая чистота, лёгкость, низкая сминаемость и способность на долгие годы сохранять яркость рисунка. Бязь выдерживает огромное количество стирок, к тому же это недорогой материал',
                    image: require('../../../images/workshop_list/materials/material-byaz.png'),
                    imageMobile: require('../../../images/workshop_list/materials/material-byaz-mobile.png')
                },
                {
                    id: 2,
                    title: 'Сатин',
                    body: '100% хлопок. Изготавливается из крученой нити двойного плетения. Отличительной особенностью сатина является его гладкая, шелковистая, блестящая лицевая поверхность, напоминающая шелк. Изнанка у материала слегка шероховатая, так что сатиновое постельное белье не сползет во время сна. Сатин является одним из немногих текстильных материалов, который удачно сочетает в себе нежность шелка и тепло хлопка. Такие постельные принадлежности почти не мнутся, не электризуются, хорошо пропускают воздух и долговечны. Кроме того, это удачный вариант постельного белья для любителей домашних животных — шелковистость и гладкость материала не дает возможность шерсти прилипать. Еще одно преимущество сатина — сохраняет свой изначальный внешний вид до 300 стирок. Так что постельное белье из этого материала абсолютно не капризно в использовании',
                    image: require('../../../images/workshop_list/materials/material-satin.png'),
                    imageMobile: require('../../../images/workshop_list/materials/material-satin-mobile.png')
                },
                {
                    id: 3,
                    title: 'Поплин',
                    body: '100% хлопок. Ткань полотняного переплетения из хлопчатобумажных, вискозных, шелковых или синтетических волокон с мелким поперечным рубчиком (тонкие основные (продольные) нити полотна переплетаются с более толстыми уточными). Благодаря такому плетению тонкие нити будто изгибаются вокруг толстых и закрывают их таким образом, что более толстые и грубые располагаются внутри ткани, а тонкие и мягкие — снаружи. Именно поэтому поплин получается такой нежный и приятный на ощупь, но в то же время обладает высокой прочностью. Поплиновая ткань характерна своеобразным благородным блеском из-за чего ее и сравнивают с сатином. Так же этот материал отлично выглядит в любой цветовой гамме. Постельные принадлежности из поплина не нужно гладить. Они отличаются особой легкостью, отлично пропускают воздух и почти не мнутся',
                    image: require('../../../images/workshop_list/materials/material-poplin.png'),
                    imageMobile: require('../../../images/workshop_list/materials/material-poplin-mobile.png')
                },
                {
                    id: 4,
                    title: 'Полиэстер',
                    body: 'По свойствам полиэстер похож на хлопок, а внешне схож с шерстяным изделием. К свойствам ткани можно отнести ее устойчивость к ультрафиолетовым излучениям. Такая структура сохраняет свои свойства при воздействии с химическими веществами, имеет высокую прочность. Постельное белье из такой ткани легко стирается и не мнется, имеет высокую прочность, легко и приятно к телу, быстро сохнет',
                    image: require('../../../images/workshop_list/materials/material-poliester.png'),
                    imageMobile: require('../../../images/workshop_list/materials/material-poliester-mobile.png')
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
                {id: 1, title: 'Полуторный', body: 'Это стандартный комплект, состоящий из одного пододеяльника 215*143см, одной простыни 215*145см, и двух наволочек 70*70см'},
                {id: 2, title: 'Двуспальный', body: 'В него входит один пододеяльник 215*175см, одна простыня 220*200 см, две наволочки 70*70см'},
                {
                    id: 3,
                    title: 'Двуспальный ЕВРО',
                    body: 'Отличие этих комплектов от двуспальных в размере пододеяльника – здесь он 215*200см. Размеры простыни и наволочек те же, что и в двуспальном'
                },
                {id: 4, title: 'Семейный', body: 'Этот комплект постельного белья подразумевает наличие двух пододеяльников 215*143см, одной простыни 240*220 см и двух наволочек 70*70 см'},
                {id: 5, title: 'Детский', body: 'Предназначен для малышей, которые спят в детских кроватках. Состоит из одной пододеяльника 100*150см, одной простыни 100*150 см и одной наволочки 50*50 см'},
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
            <img key={index} src={item.image}/>
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

    renderLinens() {
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
                            parse(this.state.article.content).map((item, index) => {
                                if (index%2 === 0 && index < 4) {
                                    return item
                                }
                            })
                        }
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
        )
    }

    render() {
        if (this.state.article) {
            if (this.state.article.title === 'ПОСТЕЛЬНОЕ БЕЛЬЕ') {
                return this.renderLinens()
            } else {
                return <div>{parse(this.state.article.content)}</div>
            }
        } else {
            return null
        }
    }
}

export default withRouter(connect(
    (state, ownProps) => ({
        token: state.token,
    }),
    dispatch => ({})
)(Workshop));
