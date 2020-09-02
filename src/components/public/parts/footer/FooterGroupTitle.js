import React, { Component } from 'react';


export class FooterGroupTitle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            groupHidden: false
        }
    }

    handleToggleBtnPress = () => {
        this.setState({
            groupHidden: !this.state.groupHidden
        })
    }

    render() {
        return (
            <div className="footer-group__title">
                <span>{this.props.title}</span>
                <hr/>
                {this.props.toggleBtn
                    ? <div 
                        className="footer-group__toggle-btn"
                        onClick={this.handleToggleBtnPress}
                    >
                        <i className={`fa fa-chevron-${!this.state.groupHidden ? 'up' : 'down'}`}></i>
                    </div>
                    : null
                }
            </div>
        )
    }
}