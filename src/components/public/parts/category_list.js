import React, {Component} from 'react';
import {Link, withRouter, Redirect} from 'react-router-dom';
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

    componentDidMount() {
        this.setState({
            categories: this.props.categories
        })
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
        let parts = window.location.pathname.split('/');
        if (item.children.length > 0) {
            
            return (
                <div key={item.id} className={'text-left '} >
                    <a href={"#collapseExample" + item.id}
                       onClick={() => this.setState({subMenuActive: item.id})}
                       className={`alert-link ${this.state.subMenuActive === item.id ? '' : 'collapsed'}`}
                       data-toggle="collapse"
                       role="button"
                       aria-expanded={`${this.state.subMenuActive === item.id ? 'true' : 'false'}`}
                       aria-controls={"collapseExample" + item.id}>
                        <span>{item.title}</span>
                    </a>
                    <div className={`${this.state.subMenuActive === item.id ? '' : 'collapse'}`} id={"collapseExample" + item.id}>
                        <div className="card-body ">
                            { item.children.map((child) => {
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
            <div key={item.id} className={'text-left '}>
                <Link to={'/catalog/' + item.id}
                      className={'alert-link'}>
                    {type !== 'bold' ? <span>{item.title}</span> : <b><span>{item.title}</span></b>}
                </Link>
            </div>
        );
    }

    render() {
        let parts = window.location.pathname.split('/');

        return (
            <div className="alert alert-success">
                
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
