import React, {useEffect, useState} from 'react';
import request from "../../../services/ajaxManager";
import ExtensionIcon from '@material-ui/icons/Extension';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const CatalogList = (props) => {

    const [list, setList] = useState([])

    useEffect(() => {
        getData()
    }, [setList])

    const getData = () => {
        request(
            'product/categories',
            'GET',
            {},
            {},
            function (response) {
                setList(response)
            },
            function (err) {
                console.log(err)
            }
        )
    }

    const renderList = (item, index) => {
        if (props.reduce) {
            return (
                    <a href={`/catalog/${item.id}`} key={index} className='d-flex ml-4 mt-2 catalog-item hr-bottom'>
                        <ExtensionIcon className='mr-2 text-black-50'/>
                        <p className='text-break'>
                            {item.title}
                        </p>
                    </a>
            )
        } else {
            if (props.mobile) {
                return (
                    <a href={`/catalog/${item.id}`} key={index}
                       className='nav-link dropdown-item d-flex ml-4 mt-2 catalog-item'>
                        <ExtensionIcon className='mr-2 text-black-50'/>
                        {item.title}
                    </a>
                )
            } else {
                return (
                    <a href={`/catalog/${item.id}`} key={index} className='nav-link d-flex ml-4 mt-2 catalog-item'>
                        <ExtensionIcon className='mr-2 text-black-50'/>
                        {item.title}
                    </a>
                )
            }
        }
    }

    if (list.length !== 0) {
        if (props.reduce) {
            return (
                list.length > 0 ?
                    <div className='w-100'>
                        <a className='d-flex mt-2 catalog-first-item justify-content-between'>
                            <div className='d-flex align-items-center'>
                                <ExtensionIcon className='ml-2 mr-2 text-black-50'/>
                                <div className='pl-2 pr-2 text-light'>
                                    НАШЕ ПРОИЗВОДСТВО
                                </div>
                            </div>
                            <ArrowForwardIosIcon className='text-white'/>
                        </a>
                        {
                            list.map((item, index) => renderList(item, index))
                        }
                    </div>
                    : null
            )
        } else {
            if (props.mobile) {
                return (
                    list.length > 0 ?
                        <>
                            <a className='nav-link d-flex mt-2'>
                                <ExtensionIcon className='ml-2 mr-2 text-black-50'/>
                                <div className='rounded-pill pl-2 pr-2 text-light' style={{backgroundColor: '#229dd2'}}>
                                    НАШЕ ПРОИЗВОДСТВО
                                </div>
                            </a>
                            {
                                list.map((item, index) => renderList(item, index))
                            }
                        </>
                        : null
                );
            } else {
                return (
                    list.length > 0 ?
                        <>
                            <a className='nav-link d-flex mt-2'>
                                <ExtensionIcon className='ml-2 mr-2 text-black-50'/>
                                <div className='rounded-pill pl-2 pr-2 text-light' style={{backgroundColor: '#229dd2'}}>
                                    НАШЕ ПРОИЗВОДСТВО
                                </div>
                            </a>
                            {
                                list.map((item, index) => renderList(item, index))
                            }
                        </>
                        :
                        null
                )
            }
        }
    } else {
        return null
    }
};

export default CatalogList;