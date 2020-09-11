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
        }, () => this.props.onToggleBtnPress(!this.state.groupHidden));
    }

    render() {
        return (
            <div className="footer-group__title" onClick={this.handleToggleBtnPress}>
                <span>{this.props.title}</span>
                <span className="hr"/>
                {this.props.toggleBtn
                    ? <div className="footer-group__toggle-btn">
                        <i className={`fa fa-chevron-${!this.state.groupHidden ? 'up' : 'down'}`}></i>
                    </div>
                    : null
                }
            </div>
        )
    }
}