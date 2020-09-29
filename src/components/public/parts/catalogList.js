import React, {useEffect, useState} from 'react';
import request from "../../../services/ajaxManager";
import ExtensionIcon from '@material-ui/icons/Extension';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const CatalogList = (props) => {

    const [list, setList] = useState(props.list || [])
    const [showCategory, setShowCategory] = useState(false)
    const [listCategory, setListCategory] = useState()

    useEffect(() => {
        getData();

    }, [list])


    const getData = () => {
        let additionalData = [
            {
                title: 'Новые товары',
                id: 'new',
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


        request(
            'product/categories',
            'GET',
            {},
            {},
            function (response) {
                setList([...additionalData, ...response])
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
                    <img className='icons-left-menu'
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
                        <img className='icons-left-menu'
                             src={require(`../../../images/left_menu/category_icon_${item.id}.png`)}/>
                        {item.title}
                    </a>
                )
            } else {
                return (
                    <a href={`/catalog/${item.id}`} key={index} className='nav-link d-flex ml-4 mt-2 catalog-item'>
                        <img src={require(`../../../images/left_menu/category_icon_${item.id}.png`)}/>
                        {item.title}
                    </a>
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
                                            <a className='d-flex mt-2 catalog-first-item justify-content-between'
                                               href='/workshop'>
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
                                            </a>
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
                                        <a className='nav-link d-flex mt-2 production-catalog' href='/workshop'>
                                            <img className='icons-left-menu'
                                                 src={require(`../../../images/left_menu/factory.png`)}/>
                                            <div className='rounded-pill pl-2 pr-2 text-light'>
                                                НАШЕ ПРОИЗВОДСТВО
                                            </div>
                                        </a>
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
                                        <a className='nav-link d-flex mt-2 production-catalog' href='/workshop'>
                                            <div className='d-flex align-items-center'>
                                                <img className='icons-left-menu'
                                                     src={require(`../../../images/left_menu/factory.png`)}/>
                                                <div className='rounded-pill pl-2 pr-2 text-light'>
                                                    НАШЕ ПРОИЗВОДСТВО
                                                </div>
                                            </div>
                                            <ArrowForwardIosIcon className='text-white'/>
                                        </a>
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