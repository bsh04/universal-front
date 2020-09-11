import React, { Component } from 'react';

export class ServiceBtn extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="service-btn" onClick={() => this.props.onClick()}>
                {this.props.icon ? 
                <i className={this.props.icon}></i> : null}
            </div>
        )
    }
}