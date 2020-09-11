import React, { Component } from 'react';

export class ProductBasketAdd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            count: 1
        }
    }

    handleCount(event, action) {
        event.stopPropagation();
        let count = this.state.count;

        if(action === false) {
            count <= 1 ? count = 1 : count -= 1;
        } else if(action === true) {
            count += 1
        }

        this.setState({count})
    }

    render() {
        return (
            <div className="product-card__basket-add" onClick={() => this.props.handleClick(this.state.count)}>
                <div className="product-card__basket-add-counter">
                    <span className="product-card__basket-add-counter-control unselectable" onClick={(e) => this.handleCount(e, false)}>-</span>
                    <span className="product-card__basket-add-counter-value">{this.state.count}</span>
                    <span className="product-card__basket-add-counter-control unselectable" onClick={(e) => this.handleCount(e, true)}>+</span>
                </div>
                <span className="product-card__basket-add-text">В корзину</span>
                <i className="product-card__basket-add-icon"></i>
            </div>
        )
    }
}