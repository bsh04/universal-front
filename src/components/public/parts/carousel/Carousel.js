import React, { Component } from 'react';

export class Carousel extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            start: 0,
            length: this.props.length,
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.isMobile !== this.props.isMobile) {
            this.setState({length: this.props.length})
        }
    }
    

    handleControls = (to) => {
        let itemsLength = this.props.children.length;
        let start = this.state.start;

        if(to === 'prev') {
            start = start === 0 ? itemsLength - 1 : start - 1;
        } else if (to === 'next') {
            start = start === itemsLength ? 1 : start + 1;
        }
        
        this.setState({start: start})
    }

    renderChildrens() {
        let items = this.props.children;
        
        let start = this.state.start;
        let end = (start + this.state.length >= items.length) ? items.length : start + this.state.length;
        
        let result = items.slice(start, end);
        
        if(result.length < this.state.length) {
            let range = this.state.length - result.length;

            if(start > end - this.state.length) {
                result = [  ...result, ...items.slice(0, range)]
            } else if(start + this.state.length > items.length) {
                result = [ ...result, ...items.slice(0, range) ]
            }
        }

        
        return result;
    }

    renderIcons() {
        //'stock', 'new', 'produced', 'season'
        
        return <i className={`carousel__title-icon carousel__title-icon_${this.props.titleIcon}`}></i>
        
    }

    

    render() {        

        return <div className={'custom-carousel'}>
            
            <div className="carousel__title">
                {this.props.titleIcon ? this.renderIcons() : null}
                {this.props.title}
            </div>
            <span className="carousel__control_prev" onClick={() => this.handleControls('prev')}></span>
                <span className="carousel__control_next" onClick={() => this.handleControls('next')}></span>
            <div className="carousel-body">
                
                {this.renderChildrens()}
            </div>
        </div>
    }
}