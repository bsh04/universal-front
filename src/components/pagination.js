import React, {useEffect, useState} from 'react';
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

const Pagination = (props) => {

    const [offset, setOffset] = useState(Number(props.offset))
    const [pickPage, setPickPage] = useState(1)
    const [numberPages, setNumberPages] = useState(Number(props.numberItems))
    const [numberItems, setNumberItems] = useState(Number(props.numberItems))
    const [smallBar, setSmallBar] = useState(true)
    const [currentCategory, setCurrentCategory] = useState(props.currentCategory)

    useEffect(() => {
        setOffset(Number(props.offset))
        console.log(offset)
    }, [props.offset])

    useEffect(() => {
        setPickPage(1)
    }, [props.match])

    useEffect(() => {
        setNumberItems(props.numberItems)
        console.log(numberItems)
    })

    useEffect(() => {
        setNumberPages(Math.ceil(numberItems / offset))

        if (Math.ceil(numberItems / offset) > 5) setSmallBar(false)
        else setSmallBar(true)

    }, [numberItems, offset])

    useEffect(() => {
        if (pickPage === numberPages + 1) {
            handlePicker(numberPages)
        }
    }, [numberPages])

    useEffect(() => {
        if (props.handleRenderList) props.handleRenderList(1, offset)
    }, [props.handleRenderList])

    useEffect(() => {
        document.documentElement.scrollTop = 0
        if (props.currentCategory) {
            props.handleGet(props.match ? props.match.params.category : null, pickPage)
        } else {
            let startRender, endRender
            if (pickPage === 1) {
                startRender = 1
                endRender = offset
            } else {
                startRender = pickPage * offset - offset + 1
                endRender = pickPage * offset
            }

            props.handleRenderList(startRender, endRender)
        }
    }, [pickPage])

    const handlePicker = async (i) => {
        setPickPage(i)
    }

    const renderNumberPages = () => {
        if (numberPages) {
            const items = []
            if (numberPages > 6) {
                for (let i = 0; i < numberPages; i++) {
                    if (pickPage === 1 || pickPage === 2) {
                        if (i + 1 < 4) {
                            items.push(<p key={i} onClick={() => handlePicker(i + 1)}
                                          className={i + 1 === pickPage ? 'pick' : null}>{i + 1}</p>)
                        } else if (i + 1 === 4) {
                            items.push(<MoreHorizIcon key={i + 1} className='item'/>)
                            items.push(<p key={i} onClick={() => handlePicker(numberPages)}
                                          className={i + 1 === pickPage ? 'pick' : null}>{numberPages}</p>)
                        }
                    } else if (pickPage === 3) {
                        if (i + 1 < 5) {
                            items.push(<p key={i} onClick={() => handlePicker(i + 1)}
                                          className={i + 1 === pickPage ? 'pick' : null}>{i + 1}</p>)
                        } else if (i + 1 === 5) {
                            items.push(<MoreHorizIcon key={i} className='item'/>)
                        } else if (i + 1 === numberPages) {
                            items.push(<p key={i} onClick={() => handlePicker(numberPages)}
                                          className={i + 1 === pickPage ? 'pick' : null}>{numberPages}</p>)
                        }
                    } else if (pickPage > 3 && pickPage < numberPages - 2) {
                        if (i + 1 === 1) {
                            items.push(<p key={i} onClick={() => handlePicker(1)}
                                          className={i + 1 === pickPage ? 'pick' : null}>{1}</p>)
                        } else if (i + 1 === 2) {
                            items.push(<MoreHorizIcon key={i} className='item'/>)
                        } else if (i + 1 === pickPage - 1 || i + 1 === pickPage || i + 1 === pickPage + 1) {
                            items.push(<p key={i} onClick={() => handlePicker(i + 1)}
                                          className={i + 1 === pickPage ? 'pick' : null}>{i + 1}</p>)
                        } else if (i + 1 === numberPages - 1) {
                            items.push(<MoreHorizIcon key={i} className='item'/>)
                        } else if (i + 1 === numberPages) {
                            items.push(<p key={i} onClick={() => handlePicker(numberPages)}
                                          className={i + 1 === pickPage ? 'pick' : null}>{numberPages}</p>)
                        }

                    } else if (pickPage === numberPages - 2) {
                        if (i + 1 === 1) {
                            items.push(<p key={i} onClick={() => handlePicker(1)}
                                          className={i + 1 === pickPage ? 'pick' : null}>1</p>)
                        } else if (i + 1 === 2) {
                            items.push(<MoreHorizIcon key={i} className='item'/>)
                        } else if (i + 1 > numberPages - 4) {
                            items.push(<p key={i} onClick={() => handlePicker(i + 1)}
                                          className={i + 1 === pickPage ? 'pick' : null}>{i + 1}</p>)
                        }
                    } else if (pickPage > numberPages - 3) {
                        if (i + 1 === 1) {
                            items.push(<p key={i} onClick={() => handlePicker(1)}
                                          className={i + 1 === pickPage ? 'pick' : null}>1</p>)
                        } else if (i + 1 === 2) {
                            items.push(<MoreHorizIcon key={i} className='item'/>)
                        } else if (i + 1 > numberPages - 3) {
                            items.push(<p key={i} onClick={() => handlePicker(i + 1)}
                                          className={i + 1 === pickPage ? 'pick' : null}>{i + 1}</p>)
                        }
                    }
                }
            } else if (numberPages <= 6) {
                for (let i = 0; i < numberPages; i++) {
                    items.push(<p key={i} onClick={() => handlePicker(i + 1)}
                                  className={i + 1 === pickPage ? 'pick' : null}>{i + 1}</p>)
                }
            }
            return items
        }
    }

    return (

        <div className='pagination-cont'>
            <div className={smallBar ? 'pagination-body small' : 'pagination-body'}>
                <DoubleArrowIcon
                    className='fa-rotate-180 item'
                    onClick={() => setPickPage(1)}
                />
                <KeyboardArrowLeftIcon
                    className='item'
                    onClick={() =>
                        setPickPage(pickPage === 1
                            ? 1
                            : pickPage - 1)}
                />
                <div
                    className={`number-pages-container ${numberPages === 1 ? 'one' : numberPages === 2 ? 'w-25' : numberPages === 3 ? 'minimal' : ''}`}>
                    {renderNumberPages()}
                </div>
                <KeyboardArrowRightIcon
                    className='item'
                    onClick={() =>
                        setPickPage(pickPage === numberPages
                            ?
                            numberPages
                            :
                            pickPage + 1)
                    }
                />
                <DoubleArrowIcon
                    className='item'
                    onClick={() =>
                        setPickPage(numberPages)}
                />
            </div>
        </div>
    );
};

export default Pagination;