import React, {Component} from 'react';
import request from "../../../services/ajaxManager";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import RenderProduct from "./render_product";
import Pagination from "../../pagination";
import CircularProgress from "@material-ui/core/CircularProgress";


class ProductStatus extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            numberProducts: 0,
            ready: false
        }
    }


    async componentDidMount() {
        if (this.state.numberProducts < 50) {
            await this.getData()
        }
    }

    getData = (_, page = 1) => {
        let _this = this
        request(
            `product/admin/list?page=${page}`,
            'GET',
            {},
            {
                "Authorization": 'Bearer ' + this.props.token
            },
            function (response) {
                console.log(response)
                _this.setState({data: response, numberProducts: response.count, ready: true})
            },
            function (err) {
                console.log(err)
            }
        )
    }

    handleChange = (type, typeValue, id) => {


        let data = new FormData
        data.append('id', id)
        data.append(type, typeValue === true ? 1 : 0)

        request(
            'product/admin/group',
            'POST',
            data,
            {
                "Authorization": 'Bearer ' + this.props.token
            },
            function (response) {},
            function (err) {
                console.log(err)
            }
        )
    }


    render() {
        return (
            <div className='w-100'>
                {
                    this.state.ready
                        ?
                        <>
                            <h1 className='pb-4'>Добавление типа товара</h1>

                            <table className={'table table-striped table-hover w-100'}>
                                <thead>
                                <tr>
                                    <th>Код</th>
                                    <th className='text-left'>Наименование</th>
                                    <th className='w-25'>Тип</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.data ? this.state.data.data.map((item, key) => <RenderProduct key={key} item={item} handleCHange={this.handleChange}/>) : null}
                                </tbody>
                            </table>
                            {
                                this.state.data
                                    ?
                                    <Pagination
                                        numberItems={this.state.numberProducts}
                                        handleGet={this.getData}
                                        offset={50}
                                    />
                                    :
                                    null
                            }</>
                        : <CircularProgress className='mt-5' />
                }
            </div>
        );
    }
}


export default withRouter(connect(
    (state, ownProps) => ({
        token: state.token,
        user: state.user,
    }),
    dispatch => ({})
)(ProductStatus));