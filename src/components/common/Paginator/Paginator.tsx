import { useState } from 'react';
import s from './Paginator.module.css';
import cn from 'classnames';

type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    portionSize?: number
    onPageChanged: (pageNumber: number) => void
}

const Paginator: React.FC<PropsType> = ({ totalItemsCount, pageSize, currentPage = 1, onPageChanged, portionSize = 10 }) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize)

    let pages: Array<number> = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)

    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    return <div className={s.paginator}>
        {portionNumber > 1 && <button onClick={() => { setPortionNumber(portionNumber - 1) }}>PREV</button>}
        {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map(p => {
                return <div className={s.pagesBlock}>
                    <span
                        className={cn({ [s.selectedPage]: currentPage === p }, s.pageNumber)}
                        key={p}
                        onClick={(e) => { onPageChanged(p) }}>{p}</span>
                </div>
            })
        }
        {portionCount > portionNumber && <button onClick={() => { setPortionNumber(portionNumber + 1) }}>NEXT</button>}
    </div>
}

export default Paginator
