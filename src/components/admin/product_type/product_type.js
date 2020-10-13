import React, {Component} from 'react';
import request from "../../../services/ajaxManager";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import RenderProduct from "./render_product";
import CircularProgress from "@material-ui/core/CircularProgress";
import { parsePage } from '../../../services/parsePage';
import { TruePagination } from '../../truePagination';


class ProductStatus extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            numberProducts: 0,
            ready: false,
            enterType: [],
            selectedCategory: null,
            categories: []
        }
    }


    async componentDidMount() {
        if (this.state.numberProducts < 50) {
            await this.getData()
        }
    }

    componentDidUpdate(prevProps, prevState) {

        if(JSON.stringify(this.props.location.pathname) !== JSON.stringify(prevProps.location.pathname) 
        || JSON.stringify(this.props.location.search) !== JSON.stringify(prevProps.location.search)) {
        
            this.getData({}, parsePage());
        }
    }

    getData = (_, page = 1) => {
        let cat = `page=${page === 0 ? 1 : page}${this.state.selectedCategory ? '&category=' + this.state.selectedCategory : null}`
        this.state.enterType.map(item => {
            cat += `&${item}=1`
        })
        let _this = this
        request(
            `product/admin/list?${cat}`,
            'GET',
            {},
            {
                "Authorization": 'Bearer ' + this.props.token
            },
            function (response) {
                if (response) {
                    _this.setState({data: response, numberProducts: response.count, ready: true})
                }
            },
            function (err) {
                console.log(err)
            }
        )

        request(
            'product/categories',
            'GET',
            null,
            {},
            function (response) {
                _this.setState({categories: response})
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
            function (response) {
            },
            function (err) {
                console.log(err)
            }
        )
    }

    renderSelectItems() {
        if (this.state.categories) {
            return this.state.categories.sort(function(a,b) {
                if (a.title > b.title) {
                    return 1;
                }
                else if (a.title < b.title) return -1;
                else return 0;
            }).map((category, key) => {
                    if (category.children.length > 0) {
                        let arr = [
                            <option value={category.id} key={key}>{category.title}</option>,
                        ];
                        category.children.sort(function(a,b) {
                            if (a.title > b.title) {
                                return 1;
                            }
                            else if (a.title < b.title) return -1;
                            else return 0;
                        }).map((subCategory, index) => {
                            arr.push(<option key={index + 'sub'}
                                             value={subCategory.id}>
                                {category.title} -- {subCategory.title}
                            </option>);
                        })
                        return arr;
                    } else {
                        return <option value={category.id} key={key}>{category.title}</option>
                    }
                }
            )
        }
    }

    handleSelectValue = (e) => {
        this.setState({selectedCategory: e.target.value}, () => this.getData())
    }

    addedCategory = async (category) => {
        let data
        if (this.state.enterType.includes(category)) {
            data = [...this.state.enterType].filter(item => item !== category)
        } else {
            data = [...this.state.enterType, category]
        }
        await this.setState({enterType: data})
        this.getData()
    }

    render() {
        return (
            <div className='w-100'>
                {
                    this.state.ready
                        ?
                        <>
                            <h1 className='pb-4'>Добавление типа товара</h1>

                            <div className='d-flex flex-row align-items-center py-3'>
                                <p className='pr-3 m-0'><strong>Показать только:</strong></p>
                                <div className='d-flex align-items-center mr-3'>
                                    <input className='mr-2' type="checkbox" onClick={async () => {
                                        await this.addedCategory('season')
                                    }}/>
                                    <p className='mb-0'>Сезонные</p>
                                </div>
                                <div className='d-flex align-items-center mr-3'>
                                    <input className='mr-2' type="checkbox" onClick={async () => {
                                        await this.addedCategory('produced')
                                    }}/>
                                    <p className='mb-0 text-left'>Собственное производство</p>
                                </div>
                                <div className='d-flex align-items-center mr-3'>
                                    <input className='mr-2' type="checkbox" onClick={async () => {
                                        await this.addedCategory('popular')
                                    }}/>
                                    <p className='mb-0'>Популярные</p>
                                </div>
                            </div>
                            <div className='d-flex py-3 align-items-center'>
                                <strong className='pr-3'>Фильтр по категории:</strong>
                                <select className="custom-select w-75" onChange={this.handleSelectValue}
                                        value={this.state.selectedCategory}>
                                    <option onClick={() => this.setState({selectedCategory: null})} value={null}>Не
                                        выбрано
                                    </option>
                                    {this.renderSelectItems()}
                                </select>
                            </div>

                            <table className={'table table-striped table-hover w-100'}>
                                <thead>
                                <tr>
                                    <th>Код</th>
                                    <th className='text-left'>Наименование</th>
                                    <th className='w-25'>Тип</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.data && this.state.data.count !== 0 ? this.state.data.data.map((item, key) =>
                                    <RenderProduct key={key}
                                                   item={item}
                                                   handleChange={this.handleChange}
                                    />) : <p className='text-center w-75 pt-5 position-absolute'>Товаров нет</p>}
                                </tbody>
                            </table>
                            {
                                this.state.data && this.state.data.count !== 0
                                    ?
                                    <TruePagination 
                                        numberOfPages={Math.ceil(this.state.numberProducts / 50)}
                                        onPageSelect={(page) => this.props.history.push(`?page=${page}`)}
                                    />
                                    :
                                    null
                            }</>
                        : <CircularProgress className='mt-5'/>
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