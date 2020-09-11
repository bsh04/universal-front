import React, {Component} from 'react';
import {Link, withRouter, Redirect} from 'react-router-dom';
import request from "../../../services/ajaxManager";
import {connect} from "react-redux";
import ExtensionIcon from '@material-ui/icons/Extension';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

class CategoryList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: [],
            showAll: false
        };
    }

    itemView(item,index, type = null) {
        if (item.children.length > 0) {
            return (
                <React.Fragment key={index}>
                    <div className="d-flex flex-row align-items-center items py-0 my-0">
                        <ExtensionIcon className='item arrow-icon'/>
                        <a className="pl-2 text-left item" href={'/catalog/' + item.id}>{item.title}</a>
                    </div>
                    <hr/>
                </React.Fragment>
            );
        }
    }

    render() {
        console.log()
        let parts = window.location.pathname.split('/');

        return (
            <>
                <div className='catalog_main pl-3'>
                    <div className={this.state.showAll ? 'list' : 'small-list'}>
                        <div className="row production">
                            <div>
                                <ExtensionIcon className='text-white'/>
                                <a className="pl-2" href="#">НАШЕ ПРОИЗВОДСТВО</a>
                            </div>
                            <ArrowForwardIosIcon className='text-white'/>
                        </div>

                        {this.props.categories ? this.props.categories.map((item,index) => {
                            return (
                                this.itemView(item,index)
                            );
                        }) : null}
                    </div>
                    <div className='show-all'
                            onClick={() => this.setState({showAll: !this.state.showAll})}
                    >
                        {this.state.showAll ? 'СВЕРНУТЬ' : 'РАЗВЕРНУТЬ'}
                        {this.state.showAll ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </div>
                </div>

            </>
        );
    }
}

export default withRouter(connect(
    (state, ownProps) => ({
        token: state.token
    }),
    dispatch => ({})
)(CategoryList));
