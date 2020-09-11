import React, { Component } from 'react';
import { FooterCatalogListItem } from './FooterCatalogListItem';

export class FooterCatalog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cols: null,
        }
    }

    componentDidMount() {
        this.updateSize();
        window.addEventListener('resize', this.updateSize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateSize);
    }

    updateSize = () => {
        let width = window.innerWidth;
        let cols;

        if(width > 1660){
            cols = 4;
            this.setState({cols});
        } else if(width < 1660 && width > 1200) {
            cols = 3;
            this.setState({cols});
        } else if(width <= 1200 && width > 600) {
            cols = 2;
            this.setState({cols});
        } else if (width <= 600) {
            cols = 1;
            this.setState({cols});
        }
        
    }

    renderColumns() {
        
        let items = this.props.list.map((item, index) => {
            return (
                <FooterCatalogListItem item={item} key={item.id.toString()} />
            )
        });

        let step = Math.ceil(items.length / this.state.cols);
        let arr = [];
        
        for(let i = 0; i < items.length; i+=step) {
            arr.push(items.slice(i, i+step));
        }
        
        return arr.map((item, key) => {
            return <div className={`col-${12 / this.state.cols}`} key={key.toString()}>
                {key === 0 
                ? <span className="catalog-list__item_first">
                    <span className="catalog-list__item-text">{this.props.catalogTitle}</span>
                </span>
                : null}
                {item}
            </div>
        });
    }

    render() {
        return (
            <ul className="footer-catalog">
                <div className="row">
                    {this.props.list && this.props.list.length > 0 && this.state.cols
                    ? this.renderColumns()
                    : null}
                </div>
            </ul>
        )
    }
}