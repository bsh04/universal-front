import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchValue: null,
            searchFieldOnFocus: false,
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
        let showCheckbox = false;
        
        if(this.state.searchFieldOnFocus) {
            showCheckbox = true
        }

        return (
            <form className="position-relative search-form"
                  id="search-form"
                  onSubmit={(e) => this.handleSearch(e)}
                  onBlur={() => {
                    setTimeout(() => { 
                        this.setState({searchFieldOnFocus: false})    
                    }, 200);
                  }}
                  >
                <div className="input-group mb-2">
                    <input type="text"
                            form="search-form"
                            onFocus={() => {
                                setTimeout(() => {
                                    this.setState({searchFieldOnFocus: true})
                                    console.log('INSIDE', this)
                                }, 200);
                                console.log('OUTSIDE', this)
                            }}
                                      
                            className="form-control"
                            ref={(input) => {this.searchField = input}}
                            id="inlineFormInputGroup"
                            defaultValue={(parts[1] === 'catalog' && parts.length > 3) ? decodeURI(parts[3]) : this.state.searchValue}
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
                
                {showCheckbox 
                ? <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="inlineFormCheck" form="search-form"
                            ref={(input) => this.categorySearch = input}
                            defaultChecked={this.state.searchInCat}
                            onClick={() => {
                                this.setState({
                                    searchInCat: this.categorySearch.checked,
                                });
                                
                                this.searchField.focus();
                            }}
                            />
                    <label className="form-check-label" htmlFor="inlineFormCheck" form="search-form">
                        Искать внутри выбранной категории
                    </label>
                </div> : null }
                </div>
            </form>
        )

    }
}

export default withRouter(Search);