import React, {Component} from 'react';
import {Link, withRouter, Redirect} from 'react-router-dom';
import request from "../../../services/ajaxManager";
import {connect} from "react-redux";

class CategoryList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: [],
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
        let parts = window.location.pathname.split('/');
        if (item.children.length > 0) {
            
            return (
                <div key={item.id} className={'text-left '} >
                    <a href={"#collapseExample" + item.id}
                       onClick={() => {
                           this.setState({subMenuActive: item.id})
                        }}
                       className={`alert-link ${this.state.subMenuActive === item.id ? '' : 'collapsed'}`}
                       data-toggle="collapse"
                       role="button"
                       aria-expanded={`${this.state.subMenuActive === item.id ? 'true' : 'false'}`}
                       aria-controls={"collapseExample" + item.id}>
                        <span>{item.title}</span>
                    </a>
                    <div className={`${this.state.subMenuActive === item.id ? '' : 'collapse'}`} id={"collapseExample" + item.id}>
                        <div className="card-body ">
                            <Link to={"/catalog/" + item.id}
                                onClick={() => {this.props.onClick()}}
                                className={'alert-link-sub'}>
                                    Все товары
                            </Link>
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
                      className={'alert-link'}
                      onClick={() => {this.props.onClick()}}>
                    {type !== 'bold' ? <span>{item.title}</span> : <b><span>{item.title}</span></b>}
                </Link>
            </div>
        );
    }

    render() {
        let parts = window.location.pathname.split('/');
        console.log('PROPS:',this.props.categories)

        return (
            <div className='catalog_main'>
                <div className="alert alert-success">
                    
                    {this.itemView({id: 'new', children: [], title: 'Новые товары'}, 'bold')}
                    {this.itemView({id: 'stock', children: [], title: 'Товары по акции'}, 'bold')}
                    <div className={'text-left empty-item '}></div>
                    {this.props.categories ? this.props.categories.map((item) => {
                        console.log('render!')
                        return (
                            this.itemView(item)
                        );
                    }) : null}
                </div>
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
