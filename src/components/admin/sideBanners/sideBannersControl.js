import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import request from '../../../services/ajaxManager';

import BannersEditRow from './bannersEditRow';
import SideBannersTableItem from './sideBannersTableItem';

class SideBannersControl extends Component {
    constructor(props) {
        super(props);

        this.fileInput = React.createRef();

        this.state = {
            link: '',
            description: '',
            file: {},

            bannersList: []
        }
    }
    
    componentDidMount() {
        this.handleGet();
    }

    handleGet() {
        let _this = this;
        
        request(
            'news/sidebanners',
            'GET',
            {},
            {},
            function (response) {
                _this.setState({bannersList: response.data});
            },
        );
    }

    handleCreate(payload) {
        this.setState({loading: true});

        let data = new FormData();
        data.append('title', payload.shortContent);
        data.append('short_content', 'empty');
        data.append('photo', payload.file);
        data.append('link', payload.link);
        data.append('type', 'sidebanners');
        
        let _this = this;
        
        request(
            'news/',
            'POST',
            data,
            {
                "Authorization": 'Bearer ' + this.props.token
            },
            function (response) {
                let arr = [..._this.state.bannersList, response];

                _this.setState({
                    bannersList: arr,
                    loading: false,
                    showCreateRow: false
                });
            },
            function(err) {
                
            }
        );
    }


    handleDelete(id) {
        
        let data = {
            id: id,
        };

        let _this = this;

        request(
            'news/',
            'DELETE',
            data,
            {},
            function (response) {
                let arr = _this.state.bannersList.filter(item => item.id !== id);
                
                _this.setState({bannersList: arr});
            },
            this.state.errorCallback
        );
    }
    

    render() {
        return (
            <div className='w-100'>
                <h4 className="text-center">Управление мини-баннерами</h4>
                <table className={"table table-striped table-hover"}>
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>Название</th>
                            <th>Файл</th>
                            <th>Ссылка</th>
                            <th>
                                <button 
                                    type="button"
                                    className="btn btn-outline-success btn-sm"
                                    onClick={() => this.setState({showCreateRow: true})}
                                >
                                    Добавить
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.showCreateRow ?
                        <BannersEditRow
                            onSave={(data) => this.handleCreate(data)}
                            onCancel={() => this.setState({showCreateRow: false})}
                        /> : null}

                        {this.state.bannersList.map((item, index) => {
                            return (
                                <SideBannersTableItem 
                                    key={item.id.toString()}    
                                    item={item} 
                                    index={index + 1} 
                                    onPressDelete={() => this.handleDelete(item.id)}
                                />
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default withRouter(connect(
    (state, ownProps) => ({
        token: state.token
    }),
    dispatch => ({}))(SideBannersControl));
