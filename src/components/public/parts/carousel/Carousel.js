import React, { Component } from 'react';

export class Carousel extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            start: 0,
            length: this.props.length,
            items: this.props.children ? this.props.children : [],
        }
    }


    handleControls = (to) => {
        let itemsLength = this.props.children.length;
        let current = this.state.start;

        if(to === 'prev') {
            current = current === 0 ? ((itemsLength) - this.state.length) : current - 1;
        } else if (to === 'next') {
            current = current === ((itemsLength - 1) - this.state.length) ? 0 : current + 1;
        }

        this.setState({start: current})
    }

    renderBody() {
        let items = this.props.children;
        
        let start = this.state.start;
        let end = this.state.start + this.state.length;
        
        return items.slice(start, end);;
    }


    render() {
        console.log(this.state.start, this.state.start + this.state.length)

        return <div className={'custom-carousel'}>
            <div className="carousel__title">{this.props.title}</div>
            <div className="carousel-body toSlide">
                <span className="carousel__control_prev" onClick={() => this.handleControls('prev')}></span>
                <span className="carousel__control_next" onClick={() => this.handleControls('next')}></span>
                {this.renderBody()}
            </div>
        </div>
    }
}