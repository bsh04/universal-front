import React, { Component } from 'react';


export class FooterGroupTitle extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="footer-group__title">
                <span>{this.props.title}</span>
                <hr/>
            </div>
        )
    }
}