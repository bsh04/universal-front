import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {connect} from "react-redux";
import Card from "./card";

class CardCarousel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            array: this.props.array,
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({array: nextProps.array});
    }

    componentDidMount() {
        window.$('.carousel').carousel();
    }

    render() {
        if (this.state.array.length > 0) {
            return (
                <div>
                    <h2>{this.props.title}</h2>
                    <div id={"carouselExampleIndicators" + this.props.title} className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                            {this.state.array.map((item,key) => {
                                return(
                                    <div key={key} className={"carousel-item height-auto " + (key === 0 ? "active" : '')}>
                                        <div className={'card-group'}>
                                            <Card item={item} key={item.id} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <a className="carousel-control-prev" href={"#carouselExampleIndicators" + this.props.title} role="button" data-slide="prev">
                            <i className={'fa fa-arrow-left'}></i>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href={"#carouselExampleIndicators" + this.props.title} role="button" data-slide="next">
                            <i className={'fa fa-arrow-right'}></i>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <h5>{this.props.title}</h5>
                <p>В данный момент товаров категории "{this.props.title}" нет!</p>
            </div>
        );
    }
}

export default withRouter(connect(
    (state, ownProps) => ({}),
    dispatch => ({})
)(CardCarousel));
