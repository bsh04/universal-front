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

    changeState(id) {
        let arr = this.state.open;
        if (arr.indexOf(id) === -1) {
            arr.push(id);
        } else {
            arr.splice(arr.indexOf(id), 1);
        }

        this.setState({
            open: arr,
        });
    }

    itemView(item, type = null) {
        if (item.children.length > 0) {
            return (
                <>
                    <div className="d-flex flex-row align-items-center items py-0 my-0">
                        <ExtensionIcon className='item arrow-icon'/>
                        <a className="pl-2 text-left item" href="#">{item.title}</a>
                    </div>
                    <hr/>
                </>
            );
        }

        // <div key={item.id} className={'text-left '}>
        //     <Link to={'/catalog/' + item.id}
        //           className={'alert-link'}
        //           onClick={() => {
        //               this.props.onClick()
        //           }}>
        //         {type !== 'bold' ? <span>{item.title}</span> : <b><span>{item.title}</span></b>}
        //     </Link>
        // </div>
    }

    render() {
        console.log()
        let parts = window.location.pathname.split('/');

        return (
            <>
                <div className='catalog_main'>
                    <div className={this.state.showAll ? 'catalog_main list' : 'catalog_main small-list'}>
                        <div className="row production">
                            <ExtensionIcon className='text-white'/>
                            <a className="pl-2" href="#">НАШЕ ПРОИЗВОДСТВО</a>
                            <ArrowForwardIosIcon className='text-white' style={{right: 10}}/>
                        </div>

                        {/*{this.itemView({id: 'new', children: [], title: 'Новые товары'}, 'bold')}*/}
                        {/*{this.itemView({id: 'stock', children: [], title: 'Товары по акции'}, 'bold')}*/}
                        {this.props.categories ? this.props.categories.map((item) => {
                            return (
                                this.itemView(item)
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
