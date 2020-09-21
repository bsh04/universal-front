import React, {useEffect, useState} from 'react';
import request from "../../../services/ajaxManager";
import ExtensionIcon from '@material-ui/icons/Extension';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const CatalogList = (props) => {

    const list = props.list

    const renderList = (item, index) => {
        if (props.reduce) {
            return (
                <a href={`/catalog/${item.id}`} key={index}
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
                    <a href={`/catalog/${item.id}`} key={index}
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
                                    <a className='d-flex mt-2 catalog-first-item justify-content-between' href='/workshop'>
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
                                    {
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