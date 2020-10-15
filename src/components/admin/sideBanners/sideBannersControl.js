import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import request from '../../../services/ajaxManager';

import BannersEditRow from './bannersEditRow';

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
        data.append('short_content', payload.shortContent);
        data.append('photo', payload.file);
        data.append('link', payload.link);
        data.append('type', 'sidebanners');
        
        let _this = this;
         
        request(
            'news/sidebanners',
            'POST',
            data,
            {},
            function (response) {
                let arr = _this.state.bannersList;
                arr.push(response);
                _this.setState({bannersList: arr, loading: false, showCreateRow: false});
            },
            this.state.errorCallback
        );
    }


    handleDelete(key) {
        
        let data = {
            id: this.state.bannersList[key].id,
        };

        let _this = this;

        request(
            'news/sidebanners',
            'DELETE',
            data,
            {},
            function (response)
            {
                let arr = _this.state.bannersList;
                arr.splice(key, 1)
                _this.setState({bannersList: arr});
            },
            this.state.errorCallback
        );
    }

    

    render() {
        return (
            <div className='w-100'>
                <h4 className="text-center">Управление швейным цехом</h4>
                <table className={"table table-striped table-hover"}>
                    <tr>
                        <th>№</th>
                        <th>Название</th>
                        <th>Файл</th>
                        <th>Ссылка</th>
                        <th>
                            <button 
                                className="btn btn-success"
                                onClick={() => this.setState({showCreateRow: true})}
                            >
                                Добавить
                            </button>
                        </th>
                    </tr>

                    {this.state.showCreateRow ?
                    <BannersEditRow
                        onSave={(data) => this.handleCreate(data)}
                        onCancel={() => this.setState({showCreateRow: false})}
                    /> : null}

                    {this.state.bannersList.map(item => {
                        return (
                            'a'
                        )
                    })}
                </table>
            </div>
        )
    }
}

export default withRouter(SideBannersControl);