import React, { Component } from 'react';

export class Carousel extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            start: 0,
            length: this.props.length,
            slideTo: '',

            
        }
    }

    componentDidMount() {
        
        window.addEventListener('resize', this.childrendLengthControl);
        
        if(this.props.interval !== undefined) {
            let intervalId = setInterval(() => {
                this.handleControls('next');
            }, this.props.interval);
            
            this.setState({intervalId});
        }
        this.childrendLengthControl();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.childrendLengthControl);

        clearInterval(this.state.intervalId);
    }

    childrendLengthControl = (event) => {
        if(this.carouselBodyRef && this.props.length !== 1) {
            let length = Math.floor(this.carouselBodyRef.clientWidth / 262);
            
            this.setState({length}); 
        }        
    }
    
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.isMobile !== this.props.isMobile) {
            this.setState({length: this.props.length})
        }
    }

    refreshInterval = () => {
        clearInterval(this.state.intervalId);
        
        if(this.props.interval === undefined) {
            return null
        }

        if(this.state.timeoutId) {
            while(this.state.timeoutId --) {
                clearTimeout(this.state.timeoutId);
            }
        }

        let timeoutId = setTimeout(() => {
            let intervalId = setInterval(() => {
                this.handleControls('next');
            }, this.props.interval);
            
            this.setState({intervalId});
        }, 1000);

        this.setState({timeoutId});
    }

    handleControls = (to) => {
        let itemsLength = this.props.children.length;
        let start = this.state.start;

        this.setState({slideTo: to})

        if(to === 'prev') {
            start = start === 0 ? itemsLength - 1 : start - 1;
        } else if (to === 'next') {
            start = start === itemsLength ? 1 : start + 1;
        }
        
        this.setState({start}, () => {
            setTimeout(() => {
                this.setState({slideTo: ''})
            }, 400);
        });
        
    }

    renderChildrens() {
        let items = this.props.children;
        
        if(this.props.banner) {
            return items[this.state.start]
        }

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

    handleBannerSlide = (key) => {
        this.setState({start: key});
    }
    

    render() {        

        return <div className={'custom-carousel'}>
            
            {this.props.title ?
            <div className="carousel__title">
                {this.props.titleIcon ? this.renderIcons() : null}
                {this.props.title}
            </div>
            : null}
            
            {this.props.banner ?
            
                <span className="banner-controls">
                    {this.props.children.map((item, key) => {
                        return (
                            <span 
                                className={`banner-controls__item ${key == this.state.start ? 'banner-controls__item_active' : ''}`}
                                key={key}
                                onClick={() => this.handleBannerSlide(key)}
                            />
                        )
                    })}
                </span>
            
            : null}
            
            {!this.props.banner ? 
            <span className="carousel__control_prev" onClick={() => {
                this.refreshInterval();
                this.handleControls('prev');
            }}></span> : null}
            {!this.props.banner ? 
            <span className="carousel__control_next" onClick={() => {
                this.refreshInterval();
                this.handleControls('next');
            }}></span> : null}

            <div className={`carousel-body ${'slide-' + this.state.slideTo}`} ref={ref => this.carouselBodyRef = ref}>
                
                {this.renderChildrens()}
            </div>
        </div>
    }
}