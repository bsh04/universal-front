import React, { Component } from 'react';

export class ModalFrame extends Component {
    constructor(props) {
        super(props);

        this.frameRef = React.createRef();
        this.wrapperRef = React.createRef();

        this.state = {
            scrollY: 0,
        }
    }

    
    componentDidMount(){
        document.addEventListener("keydown", this.onEscKeyPress, false);
        document.addEventListener("mousedown", this.handleClickOutside, false)
    }
    componentWillUnmount(){
        document.removeEventListener("keydown", this.onEscKeyPress, false);
        document.removeEventListener("mousedown", this.handleClickOutside, false);
    }

    componentDidUpdate(prevProps) {
        
        if(prevProps.visible !== this.props.visible) {
            const fix = 50;
            let scrollY = window.scrollY;
            
            if(this.props.visible) {
                this.setState({scrollY}, () => {
                    document.body.style.position = 'fixed';
                    document.body.style.top = (`${(scrollY + fix) * -1}px`);
                })
                
            } else {
                document.body.style.position = '';
                document.body.style.top = '';
                window.scrollTo(0, this.state.scrollY);
            }
            
        }
    }

    onEscKeyPress = (event) => {
        if(event.keyCode === 27 && this.props.visible === true) {
            this.props.handleToggle(false)
        }
    }

    handleClickOutside = (e) => {
        e.stopPropagation(); 
        
        
        if(this.wrapperRef && this.wrapperRef.current.contains(e.target) && (this.frameRef && !this.frameRef.current.contains(e.target))) {
            this.props.handleToggle();
        }
    }

    render() {
        return (
            <div className={`modal-wrapper ${this.props.visible? 'active' : ''}`} ref={this.wrapperRef}>
                <div className={`modal-frame modal-frame_bg ${this.props.className ? this.props.className : ''}`} ref={this.frameRef}>

                    <i className="fa fa-close" onClick={() => this.props.handleToggle()}></i>
                    <div className="modal-frame-inner">{this.props.children}</div>
                </div>                
            </div>
        )
    }
}