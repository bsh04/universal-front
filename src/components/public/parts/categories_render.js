import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Categories_render extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            additionalData: [
                {
                    title: 'Новые товары',
                    id: 'new',
                    children: []
                }, {
                    title: 'Популярные товары',
                    id: 'popular',
                    children: []
                }, {
                    title: 'Акционные товары',
                    id: 'stock',
                    children: []
                }, {
                    title: 'Сезонные товары',
                    id: 'season',
                    children: []
                },
            ],
        }
    }

    ;

    addImageBackground = (id) => {
        if(this.state.additionalData.find(item => item.id === id)) {
            return 'icons-left-menu_' + id;
        }
        return '';
    }

    render() {
        return (
            <div
                className={`d-flex flex-row align-items-center justify-content-left ${this.props.open === this.props.item.id && this.props.item.children.length > 0 ? 'active' : 'items'}`}
                onMouseOver={() => {
                    this.props.checkOpen(this.props.item.id)
                }}
            >
                {
                    this.props.item.children.length > 0
                        ?
                        <div className={`container-categories`}>
                            <div className='d-flex align-items-center'>
                                <img className={`icons-left-menu ${this.addImageBackground(this.props.item.id)}`}
                                     src={require(`../../../images/left_menu/category_icon_${this.props.item.id}.png`)}/>
                                <Link
                                    className={`pl-2 text-left item `}
                                    to={'/catalog/' + this.props.item.id}
                                >{this.props.item.title}</Link>
                            </div>
                            {
                                this.props.open === this.props.item.id
                                    ?
                                    <div className='subcategories'>
                                        {
                                            this.props.item.children.map((item, index) => <Link key={index}
                                                                                             to={'/catalog/' + item.id}
                                                                                             className='dropdown-item'>{item.title}</Link>)
                                        }
                                    </div>
                                    :
                                    null
                            }
                        </div>
                        :
                        <>
                            <img className={`icons-left-menu ${this.addImageBackground(this.props.item.id)}`}
                                 src={require(`../../../images/left_menu/category_icon_${this.props.item.id}.png`)}/>
                            <Link
                                className={`pl-2 text-left item `}
                                to={'/catalog/' + this.props.item.id}>{this.props.item.title}</Link>
                        </>
                }
            </div>
        );
    }
}

export default Categories_render;