import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
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

    handleGet() {
        let _this = this;
        request(
            'product/categories',
            'GET',
            null,
            {},
            function (response) {
                let sorted = response.map(item => {
                    
                    if(item.children.length > 1){
                        item.children = item.children.sort((current, next) => {
                            if(current.title < next.title) {
                                return -1;
                            }
                            if(current.title > next.title) {
                                return 1;
                            }
                            return 0
                        })
                    }
                    return item;                    
                })

                _this.setState({categories: sorted});
            },
        );
    }

    changeState(id) {
        let arr = this.state.open;
        if (arr.indexOf(id) === -1) {
            arr.push(id);
        } else {
            arr.splice(arr.indexOf(id), 1);
        }

        this.setState({open: arr});
    }

    itemView(item, type = null) {
        let parts = window.location.pathname.split('/');
        if (item.children.length > 0) {
            return (
                <div key={item.id} className={'text-left'}>
                    <a href={"#collapseExample" + item.id}
                       className={'alert-link ' + (window.location.pathname === ('/catalog/' + item.id) || (parts[1] === 'catalog' && parts[2] == item.id) ? ' active' : '')}
                       onClick={() => {
                           this.props.history.push('/catalog/' + item.id);
                           this.changeState(item.id);
                       }}
                       data-toggle="collapse"
                       role="button"
                       aria-expanded="false"
                       aria-controls={"collapseExample" + item.id}>
                        <span>{item.title}</span>
                    </a>
                    <div className="collapse" id={"collapseExample" + item.id}>
                        <div className=" card-body">
                            {item.children.map((child) => {
                                return (
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
                      className={'alert-link' + (window.location.pathname === ('/catalog/' + item.id) || (parts[1] === 'catalog' && parts[2] == item.id) ? ' active' : '')}>
                    {type !== 'bold' ? <span>{item.title}</span> : <b><span>{item.title}</span></b>}
                </Link>
            </div>
        );
    }

    render() {
        let parts = window.location.pathname.split('/');

        return (
            <div className="alert alert-success">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    if (this.state.searchInCat) {
                        this.props.history.push('/' + parts[1] + '/' + parts[2] + '/' + this.search.value);
                    } else {
                        this.props.history.push('/catalog/search?q=' + this.search.value);
                    }
                }}>
                    <div className="input-group mb-2">
                        <input type="text"
                               className="form-control"
                               id="inlineFormInputGroup"
                               ref={(input) => this.search = input}
                               defaultValue={(parts[1] === 'catalog' && parts.length > 3) ? parts[3] : ''}
                               placeholder="Поиск"/>
                        <div className="input-group-prepend">
                            <div className="input-group-text btn btn-success" onClick={() => {
                                if (this.state.searchInCat) {
                                    this.props.history.push('/' + parts[1] + '/' + parts[2] + '/' + this.search.value);
                                } else {
                                    this.props.history.push('/catalog/search?q=' + this.search.value);
                                }
                            }}>
                                <i className={'fa fa-search'}></i>
                            </div>
                        </div>
                    </div>
                    <div className="form-check mb-2 mr-sm-2">
                        <input className="form-check-input" type="checkbox" id="inlineFormCheck"
                               ref={(input) => this.categorySearch = input}
                               onClick={() => {
                                   this.setState({searchInCat: this.categorySearch.checked})
                               }}/>
                        <label className="form-check-label" htmlFor="inlineFormCheck">
                            Искать внутри выбранной категории
                        </label>
                    </div>
                </form>
                {this.itemView({id: 'new', children: [], title: 'Новые товары'}, 'bold')}
                {this.itemView({id: 'stock', children: [], title: 'Товары по акции'}, 'bold')}
                <hr/>
                {this.state.categories.map((item) => {
                    return (
                        this.itemView(item)
                    );
                })}
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
