import React, {useEffect, useState} from 'react';
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

const Pagination = (props) => {

    const [pickPage, setPickPage] = useState(1)
    const [offset, setOffset] = useState(props.offset)
    const [numberPages, setNumberPages] = useState(props.numberItems)
    const [smallBar, setSmallBar] = useState(true)

    useEffect(() => {

        setNumberPages(Math.ceil(numberPages / offset))

        if (Math.ceil(numberPages / offset)  > 5) setSmallBar(false)
        else setSmallBar(true)

    }, [setNumberPages])

    useEffect(() => {
        props.handleRenderList(1, offset)
    }, [props.handleRenderList])

    useEffect(() => {
        let startRender, endRender
        if (pickPage === 1) {
            startRender = 1
            endRender = offset
        } else {
            startRender = pickPage * offset - offset + 1
            endRender = pickPage * offset
        }

        props.handleRenderList(startRender, endRender)
    }, [pickPage])

    const handlePicker = async (i) => {
        setPickPage(i)
    }

    const renderNumberPages = () => {
        if (numberPages) {
            const items = []
            if (numberPages > 5) {
                for (let i = 0; i < numberPages; i++) {
                    if (pickPage === 1 || pickPage === 2) {
                        if (i + 1 < 4) {
                            items.push(<p key={i} onClick={() => handlePicker(i + 1)}
                                          className={i + 1 === pickPage ? 'pick' : null}>{i + 1}</p>)
                        } else if (i + 1 === 4) {
                            items.push(<MoreHorizIcon key={i+1} className='item'/>)
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
                    } else if (pickPage > 3 && pickPage < numberPages - 3) {
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

                    } else if (pickPage === numberPages - 3) {
                        console.log('numberPages - 3')
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
                        console.log('> numberPages - 3')
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
            } else {
                for (let i = 0; i < numberPages; i++) {
                        items.push(<p key={i} onClick={() => handlePicker(i + 1)} className={i+1 === pickPage ? 'pick' : null}>{i + 1}</p>)
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
                <div className='number-pages-container'>
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