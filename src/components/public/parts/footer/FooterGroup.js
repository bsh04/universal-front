import React, { Component } from 'react';
import { FooterGroupTitle } from './FooterGroupTitle';


export class FooterGroup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contentVisible: true
        }
    }

    render() {
        return (
            <div className={
                'footer-group' + ' ' 
                + (this.props.groupName ? 'footer-group' + '_' + this.props.groupName : '')}
            >
                {this.props.title
                    ? <FooterGroupTitle 
                        title={this.props.title} 
                        toggleBtn={this.props.toggleBtn} 
                        onToggleBtnPress={(bool) => this.setState({contentVisible: bool})}
                    />
                    : null
                }
                {this.state.contentVisible ? this.props.children : null}
            </div>
        )
    }
}