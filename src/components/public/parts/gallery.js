import React, { Component } from 'react';
import { productImageUrl } from '../../../services/parameters';


export class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: this.props.images ? this.props.images : [],
            selected: this.props.currentImage ? this.props.currentImage : 0  
        }
    }

    componentDidUpdate(prevProps) {
        if(JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
            this.setState({images: this.props.images, selected: this.props.currentImage})
        }
    }

    shouldComponentUpdate(prevProps, prevState) {
        if(JSON.stringify(prevProps) !== JSON.stringify(this.props) || JSON.stringify(prevState) !== JSON.stringify(this.state)) {
            return true;
        } else {
            return false
        }
    }
    

    handleControls = (to) => {
        let length = this.state.images.length;
        let current = this.state.selected;

        if(to === 'prev') {
            current = current === 0 ? length - 1 : current - 1;
        } else if (to === 'next') {
            current = current === length - 1 ? 0 : current + 1;
        }

        this.setState({selected: current})
    }

    render() {
        return (
            <div className="gallery">
                <img src={productImageUrl + this.state.images[this.state.selected]} alt="" className="gallery__image"/>
                
                <div className="row justify-content-between gallery-controls">
                    
                    <i className="gallery-controls__prev fa fa-arrow-left" onClick={() => this.handleControls('prev')}></i>
                    <span className="gallery-controls__counter">
                        {`${this.state.selected + 1} / ${this.state.images.length}`}
                    </span>
                    <i className="gallery-controls__next fa fa-arrow-right" onClick={() => this.handleControls('next')}></i>
                </div>
            </div>
        )
    }
}