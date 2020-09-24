import React, {Component} from 'react';
import {Link, withRouter, Redirect} from 'react-router-dom';
import request from "../../../services/ajaxManager";
import {connect} from "react-redux";
import ExtensionIcon from '@material-ui/icons/Extension';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import SubcategoryList from "./subcategory_list";
import Categories_render from "./categories_render";

class CategoryList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: [],
            showAll: false
        };
    }

    componentDidMount() {
        window.addEventListener("click", () => this.closCategory())
    }

    closCategory() {
        this.setState({openSubcategory: ''})
    }

    checkOpen = (id) => {
        this.setState({openSubcategory: id})
    }

    render() {
        let parts = window.location.pathname.split('/');
        return (
            <>
                <div className='catalog_main'>
                    <div className={this.state.showAll ? 'list' : 'small-list'}>
                        <div className="row production">
                            <div className='d-flex align-items-center'>
                                <img className='icons-left-menu'
                                     src={require(`../../../images/left_menu/factory.png`)}/>
                                <a className="pl-2" href="/workshop">НАШЕ ПРОИЗВОДСТВО</a>
                            </div>
                            <ArrowForwardIosIcon className='text-white'/>
                        </div>

                        {this.props.categories ? this.props.categories.map((item, index) => {
                            return (
                                <Categories_render checkOpen={this.checkOpen} item={item} key={index} open={this.state.openSubcategory}/>
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
