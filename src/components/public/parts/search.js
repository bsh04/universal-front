import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchValue: null,
            onFocus: false
        }
    }

    componentDidMount() {
        const searchValue = decodeURI(this.props.location.search.slice(3));
        this.setState({searchValue: searchValue})
    }

    handleSearch(e) {
        e.preventDefault();
        let parts = window.location.pathname.split('/');
        let { searchValue } = this.state;
        
        if (this.state.searchInCat) {
            this.props.history.push('/' + parts[1] + '/' + parts[2] + '/' + searchValue, {searchValue: searchValue});
        } else {
            this.props.history.push('/catalog/search?q=' + searchValue, {searchValue: searchValue});
        }
        this.props.history.go()
    }

    render() {
        let parts = window.location.pathname.split('/');
        return (
            <form className="position-relative search-form"
                  onSubmit={(e) => this.handleSearch(e)}
                  
                  /*onFocus={() => this.setState({onFocus: true})}
                  onBlur={() => {
                    setTimeout(() => {
                        this.setState({onFocus: false})    
                    }, 1500)
                    
                  }}*/>
                <div className="input-group mb-2">
                    <input type="text"
                            className="form-control"
                            id="inlineFormInputGroup"
                            defaultValue={(parts[1] === 'catalog' && parts.length > 3) ? parts[3] : this.state.searchValue}
                            onInput={((e)=> this.setState({
                                    searchValue: e.target.value
                                })
                            )}
                            placeholder="Поиск"/>
                    <div className="input-group-append">
                        <div className="input-group-text btn btn-success" onClick={(e) => this.handleSearch(e)}>
                            <i className={'fa fa-search'}></i>
                        </div>
                    </div>
                
                <div className={`form-check mb-2 mr-sm-2`}>
                    <input className="form-check-input" type="checkbox" id="inlineFormCheck"
                            ref={(input) => this.categorySearch = input}
                            onClick={() => {
                                this.setState({searchInCat: this.categorySearch.checked})
                            }}/>
                    <label className="form-check-label" htmlFor="inlineFormCheck">
                        Искать внутри выбранной категории
                    </label>
                </div>
                </div>
            </form>
        )

    }
}

export default withRouter(Search);