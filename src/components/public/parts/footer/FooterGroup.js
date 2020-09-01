import React, { Component } from 'react';
import { FooterGroupTitle } from './FooterGroupTitle';


export class FooterGroup extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className={'footer-group' + ' ' + 'footer-group' + '_' + (this.props.groupName ? this.props.groupName : '')}>
                <FooterGroupTitle title={this.props.title}/>
                {this.props.children}
            </div>
        )
    }
}