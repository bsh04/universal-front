import React, { useEffect, useState } from 'react';
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";


export const TruePagination = ({numberOfPages = 1, initialPage = parsePage(), onPageSelect}) => {
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [isMounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if(isMounted) {
            onPageSelect(currentPage);
        }        
    }, [currentPage])
    

    function makePagesArray() {
        let arr = new Array(numberOfPages)
            .fill('')
            .map((_, page) => page + 1);

        if(numberOfPages > 6) {
            arr = [
                arr[0], 
                ...arr.slice(
                    currentPage === 2 ? currentPage - 1 : (currentPage - 2) > 0 ? currentPage - 2 : 1, //start
                    currentPage < arr.length - 1 && currentPage !== 1 ? currentPage + 1 : currentPage + 2 //end
                ), 
                arr[arr.length - 1]
            ]
        }

        return arr
            .filter((item, index, arr) => arr.indexOf(item) == index)
            .map((item, index, arr) => (item + 1 !== arr[index + 1] && index !== arr.length - 1) ? [item, 'dotted'] : item)
            .flat(1);

    }
    
    return (
        <div className="true-pagination">
            <DoubleArrowIcon
                className='fa-rotate-180 pagination__item'
                onClick={() => setCurrentPage(1)}
            />
            <KeyboardArrowLeftIcon
                className='pagination__item'
                onClick={() => setCurrentPage((currentPage - 1 > 1 ? currentPage - 1 : 1))}
            />
                {makePagesArray().map((item, index) => {
                        if(item === 'dotted') {
                            return <MoreHorizIcon key={item + index} className={'pagination__item' + ' pagination__item_' + item}/>
                        } else {
                            return (
                                <span key={item.toString()}
                                    className={"pagination__item" + (currentPage === item ? ' pagination__item_active' : '')}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setCurrentPage(item)
                                    }}
                                >{item}</span>
                            )
                        }
                    })}
            <KeyboardArrowRightIcon
                className='pagination__item'
                onClick={() => setCurrentPage((currentPage + 1 < numberOfPages ? currentPage + 1 : numberOfPages)) }
            />
            <DoubleArrowIcon
                className='pagination__item'
                onClick={() => setCurrentPage(numberOfPages)}
            />
        </div>
    )
}

function parsePage() {
    let result = window.location.href.split('page=')[1];
    if(result) {
        result = result.split('&')[0];
    }
    
    return parseInt(result) || 1;
}