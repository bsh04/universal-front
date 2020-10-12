import React, { useEffect, useState } from 'react';

export const TruePagination = ({numberOfPages = 1, onPageSelect}) => {
    const [currentPage, setCurrentPage] = useState(1);


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
        <div>
            <span>{'<<'}</span>
            <span>{'<'}</span>
                {
                    makePagesArray().map((item, index) => {
                        if(item === 'dotted') {
                            return <span className={'pagination__item' + ' pagination__item_' + item} key={item + index}/>
                        } else {
                            return (
                                <span 
                                    key={item.toString()}
                                    className="pagination__item"
                                    onClick={() => {
                                        setCurrentPage(item);
                                        onPageSelect(item);
                                    }}
                                >
                                    {item}
                                </span>
                            )
                        }
                    })
                }
            <span>{'>'}</span>
            <span>{'>>'}</span>
        </div>
    )
}