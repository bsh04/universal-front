import React, {useEffect, useState} from 'react';
import request from "../../../services/ajaxManager";
import ExtensionIcon from '@material-ui/icons/Extension';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {Link} from "react-router-dom";

const CatalogList = (props) => {

    const [list, setList] = useState(props.list || [])
    const [showCategory, setShowCategory] = useState(false)
    const [listCategory, setListCategory] = useState()

    const additionalData = [
        {
            title: 'Новые товары',
            id: 'new',
            children: []
        }, {
            title: 'Популярные товары',
            id: 'popular',
            children: []
        }, {
            title: 'Акционные товары',
            id: 'stock',
            children: []
        }, {
            title: 'Сезонные товары',
            id: 'season',
            children: []
        },
    ]


    useEffect(() => {
        getData();

    }, [])


    const getData = () => {

        request(
            'product/categories',
            'GET',
            {},
            {},
            function (response) {
                
                let arr = response.map(item => {
                    if (item.children.length > 1) {
                        item.children = item.children.sort((current, next) => {
                            if (current.title < next.title) {
                                return -1;
                            }
                            if (current.title > next.title) {
                                return 1;
                            }
                            return 0
                        })
                    }
                    return item;
                });
                
                setList([...additionalData, ...arr]);
            },
            function (err) {
                console.log(err)
            }
        )
    }

    const renderCategories = (item, index) => {
        return (
            <a key={index}
               onClick={() => {
                   props.history.push(`/catalog/${item.id}`)
                   props.setIsOpenCatalog(false)
               }}
               className='d-flex ml-4 mt-2 catalog-item align-items-center'>
                <p className='text-break mb-0'>
                    {item.title}
                </p>
            </a>
        )
    }

    const addImageBackground = (id) => {
        if(additionalData.find(item => item.id === id)) {
            return 'icons-left-menu_' + id;
        }
        return '';
    }

    const renderList = (item, index) => {
        if (props.reduce) {
            return (
                <a onClick={() => {
                    if (item.children.length > 0) {
                        setShowCategory(true)
                        setListCategory(item)
                    } else {
                        props.setIsOpenCatalog(false)
                        props.history.push(`/catalog/${item.id}`)
                    }
                }} key={index}
                   className='d-flex ml-4 mt-2 catalog-item hr-bottom align-items-center'>
                    <img className={`icons-left-menu ${addImageBackground(item.id)}`}
                         src={require(`../../../images/left_menu/category_icon_${item.id}.png`)}/>
                    <p className='text-break mb-0'>
                        {item.title}
                    </p>
                </a>
            )
        } else {
            if (props.mobile) {
                return (
                    <a onClick={() => {
                        if (item.children.length > 0) {
                            setShowCategory(true)
                            setListCategory(item)
                        } else {
                            props.setIsOpenCatalog(false)
                            props.history.push(`/catalog/${item.id}`)
                        }
                    }} key={index}
                       className='nav-link dropdown-item d-flex ml-4 mt-2 catalog-item'>
                        <img className={`icons-left-menu ${addImageBackground(item.id)}`}
                             src={require(`../../../images/left_menu/category_icon_${item.id}.png`)}/>
                        {item.title}
                    </a>
                )
            } else {
                return (
                    <Link to={`/catalog/${item.id}`} key={index} className='nav-link d-flex ml-4 mt-2 catalog-item'>
                        <img className={`icons-left-menu ${addImageBackground(item.id)}`}
                        src={require(`../../../images/left_menu/category_icon_${item.id}.png`)}/>
                        {item.title}
                    </Link>
                )
            }
        }
    }

    if (list) {
        return (
            <>
                {
                    list.length !== 0
                        ?
                        props.reduce
                            ?
                            list.length > 0
                                ?
                                <div className='w-100'>
                                    {
                                        showCategory
                                            ?
                                            <div className='category-header'>
                                                <ArrowForwardIosIcon onClick={() => {
                                                    setShowCategory(false)
                                                    setListCategory('')
                                                }} className='arrow fa-rotate-180'/>
                                                <h5>{listCategory.title}</h5>
                                            </div>
                                            :
                                            <Link className='d-flex mt-2 catalog-first-item justify-content-between'
                                               to='/workshop'>
                                                <div className='d-flex align-items-center'>
                                                    <div className='d-flex align-items-center'>
                                                        <img className='icons-left-menu'
                                                             src={require(`../../../images/left_menu/factory.png`)}/>
                                                        <div className='pl-2 pr-2 text-light'>
                                                            НАШЕ ПРОИЗВОДСТВО
                                                        </div>
                                                    </div>
                                                </div>
                                                <ArrowForwardIosIcon className='text-white'/>
                                            </Link>
                                    }
                                    {
                                        showCategory
                                            ?
                                            listCategory.children.map((item, index) => renderCategories(item, index))
                                            :
                                            list.map((item, index) => renderList(item, index))
                                    }
                                </div>
                                :
                                null
                            :
                            props.mobile
                                ?
                                list.length > 0
                                    ?
                                    <>
                                        <Link className='nav-link d-flex mt-2 production-catalog' to='/workshop'>
                                            <img className='icons-left-menu'
                                                 src={require(`../../../images/left_menu/factory.png`)}/>
                                            <div className='rounded-pill pl-2 pr-2 text-light'>
                                                НАШЕ ПРОИЗВОДСТВО
                                            </div>
                                        </Link>
                                        {
                                                list.map((item, index) => renderList(item, index))
                                        }
                                    </>
                                    :
                                    null
                                :
                                list.length > 0
                                    ?
                                    <>
                                        <Link className='nav-link d-flex mt-2 production-catalog' to='/workshop'>
                                            <div className='d-flex align-items-center'>
                                                <img className='icons-left-menu'
                                                     src={require(`../../../images/left_menu/factory.png`)}/>
                                                <div className='rounded-pill pl-2 pr-2 text-light'>
                                                    НАШЕ ПРОИЗВОДСТВО
                                                </div>
                                            </div>
                                            <ArrowForwardIosIcon className='text-white'/>
                                        </Link>
                                        {
                                            list.map((item, index) => renderList(item, index))
                                        }
                                    </>
                                    :
                                    null
                        :
                        null
                }
            </>
        )
    } else return null

};

export default CatalogList;