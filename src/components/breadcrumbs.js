import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';

class Breadcrumbs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            path: [{
                title: '',
                link: ''
            }]
        }
    }

    componentWillMount() {
        let arr = this.props.path;
        
        this.setState({
            path: arr
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            path: nextProps.path
        })
    }

    go(link) {
        this.props.history.push(link);
    }

    bodyView() {
        let key = 'uniqKey';

        let arr = this.state.path.map((item, key) => {
            let link = item.link;
            return (
                key !== this.state.path.length -1 
                ? <li className="breadcrumb-item" key={key}><Link to='' onClick={() => this.go(link)}>{item.title}</Link></li>
                : <li className="breadcrumb-item active" key={key} aria-current="page">{item.title}</li>
            )
        })

        arr.unshift(<li className="breadcrumb-item" key={key}><Link to='' onClick={()=> this.go('/')}>{'Главная'}</Link></li>)

        return arr;
    }

    render() {
        return (
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb bg-white breadcrumb-custom-styles">
                    {this.bodyView()}
                </ol>
            </nav>
        )
    }
}

export default withRouter(Breadcrumbs);