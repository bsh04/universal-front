import React, { Component } from 'react';

export class ProductBasketAdd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            count: this.props.inBasket ? this.props.basketCount : 1
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

    shouldComponentUpdate(prevProps, prevState) {
        if(JSON.stringify(prevProps) !== JSON.stringify(this.props) || JSON.stringify(prevState) !== JSON.stringify(this.state)) {
            return true;
        }
    }

    render() {
        
        return (
            <div 
                className={`product-card__basket-add ${this.props.inBasket ? 'inBasket' : ''}`}
                onClick={(e) => {
                    e.stopPropagation();
                    this.props.handleClick(this.state.count);

                }}>
                <div className="product-card__basket-add-counter">
                    <span className="product-card__basket-add-counter-control unselectable" onClick={(e) => this.handleCount(e, false)}>-</span>
                    <input type="text" className="product-card__basket-add-counter-value" value={this.state.count} onChange={(e) => this.setState({count: e.target.value}) }/>
                    <span className="product-card__basket-add-counter-control unselectable" onClick={(e) => this.handleCount(e, true)}>+</span>
                </div>
                <span className="product-card__basket-add-text">В корзину</span>
                <i className="product-card__basket-add-icon"></i>
            </div>
        )
    }
}