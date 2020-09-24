import React, {Component} from 'react';

class Categories_render extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        }
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
                                <img className='icons-left-menu'
                                     src={require(`../../../images/left_menu/category_icon_${this.props.item.id}.png`)}/>
                                <a
                                    className={`pl-2 text-left item `}
                                >{this.props.item.title}</a>
                            </div>
                            {
                                this.props.open === this.props.item.id
                                    ?
                                    <div className='subcategories'>
                                        {
                                            this.props.item.children.map((item, index) => <a key={index}
                                                                                             href={'/catalog/' + item.id}
                                                                                             className='dropdown-item'>{item.title}</a>)
                                        }
                                    </div>
                                    :
                                    null
                            }
                        </div>
                        :
                        <>
                            <img className='icons-left-menu'
                                 src={require(`../../../images/left_menu/category_icon_${this.props.item.id}.png`)}/>
                            <a
                                className={`pl-2 text-left item `}
                                href={'/catalog/' + this.props.item.id}>{this.props.item.title}</a>
                        </>
                }
            </div>
        );
    }
}

export default Categories_render;