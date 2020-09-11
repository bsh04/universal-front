import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export class SubCategoriesRow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isMobile: false,
            currentCategory: null,
            listShow: false
        }
    }

    componentDidMount() {
        this.checkCurrentCategory();
        this.checkWindowSize();
        window.addEventListener('resize', this.checkWindowSize);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.checkWindowSize);
    }

    checkWindowSize = () => {
        if(window.innerWidth < 600 && this.state.isMobile === false) {
            this.setState({isMobile: true})
        } else if(window.innerWidth >= 600 && this.state.isMobile === true) {
            this.setState({isMobile: false})
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps !== this.props) {
            this.checkCurrentCategory();
            this.setState({listShow: false})
        }
    }
    

    checkCurrentCategory() {
        let {catList} = this.props;
        let pathnameArr = this.props.location.pathname.split('/');

        let current = catList.find(item => item.id === pathnameArr[pathnameArr.length - 1]);
        let result = '';
        
        if(current === undefined) {
            result = '-все-';
        } else {
            result = current.title;
        }

        this.setState({currentCategory: result});
    }

    sortCategories(catList) {
        return catList.sort((a, b) => {
            if (a.title > b.title) return 1;
            else if (a.title < b.title) return -1;
            else return 0;
        });
    }

    

    render() {
        if(!this.props.catList || this.props.catList.length < 1) return null;

        if(this.state.isMobile) {
            return (
                <div className="sub-categories-select">
                    <span className="sub-categories-select__title" onClick={() => this.setState({listShow: !this.state.listShow})}>
                        {!this.state.currentCategory ? '-все-' : this.state.currentCategory}
                    </span>
                    <div className={`sub-categories-select-list${this.state.listShow ? '_show' : ''}`}>
                        {this.sortCategories(this.props.catList).map((subcat, key) => {
                            return (
                                <span className="sub-categories-select-list__item" key={key}>
                                    <Link to={'/catalog/' + subcat.id}>
                                        {subcat.title}
                                    </Link>
                                </span>
                            )
                        })}
                    </div>
                </div>
            )
        }
        
        return (
            <div className="sub-categories-row">
                
                    {this.sortCategories(this.props.catList).map((subcat, key) => {
                        return (
                            <span className="sub-categories-row__item" key={key}>
                                <Link to={'/catalog/' + subcat.id}>
                                    {subcat.title}
                                </Link>
                            </span>
                        )
                    })}
                
            </div>
        );
    }
}