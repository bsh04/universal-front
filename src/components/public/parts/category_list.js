import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import request from "../../../services/ajaxManager";
import {connect} from "react-redux";

class CategoryList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            open: [],
        };
    }

    componentWillMount() {
        this.handleGet();
    }

    handleGet()
    {
        let _this = this;
        request(
            'product/categories',
            'GET',
            null,
            {},
            function (response)
            {
                _this.setState({categories: response});
            },
        );
    }

    changeState(id) {
        let arr = this.state.open;
        if (arr.indexOf(id) === -1) {
            arr.push(id);
        }
        else {
            arr.splice(arr.indexOf(id), 1);
        }

        this.setState({open: arr});
    }

    itemView(item) {
        if (item.children.length > 0) {
            return (
                <div key={item.id} className={'text-left'}>
                    <a href={"#collapseExample" + item.id}
                       className={'alert-link ' + (window.location.pathname === ('/catalog/' + item.id) ? ' active' : '')}
                       onClick={() => {this.props.history.push('/catalog/' + item.id); this.changeState(item.id);}}
                          data-toggle="collapse"
                          role="button"
                          aria-expanded="false"
                          aria-controls={"collapseExample" + item.id}>
                        <i className={'fa ' + (this.state.open.indexOf(item.id) === -1 ? 'fa-caret-right' : 'fa-caret-down')}>  {item.title}</i>
                    </a>
                    <div className="collapse" id={"collapseExample" + item.id}>
                        <div className=" card-body">
                            {item.children.map((child) => {
                                return(
                                    this.itemView(child)
                                );
                            })}
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div key={item.id} className={'text-left'}>
                <Link to={'/catalog/' + item.id}
                      className={'alert-link' + (window.location.pathname === ('/catalog/' + item.id) ? ' active' : '')}>
                    <i className={'fa fa-caret-right'}> {item.title}</i>
                </Link>
            </div>
        );
    }

    render() {
        return (
            <div className="alert alert-secondary">
                <div className="input-group mb-2">
                    <input type="text" className="form-control" id="inlineFormInputGroup" placeholder="Поиск"/>
                    <div className="input-group-prepend">
                        <div className="input-group-text btn btn-success">
                            <i className={'fa fa-search'}></i>
                        </div>
                    </div>
                </div>
                <hr/>
                {this.state.categories.map((item) => {
                    return(
                        this.itemView(item)
                    );
                })}
                <hr/>
                { this.itemView({id: 'new', children: [], title: 'Новые товары'}) }
            </div>
        );
    }
}

export default withRouter(connect(
    (state, ownProps) => ({
        token: state.token
    }),
    dispatch => ({})
)(CategoryList));
