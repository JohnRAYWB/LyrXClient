import React, {useEffect} from 'react';

interface Param {
    page: number
    setPage: Function
    isFetching: boolean
    children: React.ReactNode
}

const Pagination: React.FC<Param> = ({page, setPage, isFetching, children}) => {

    useEffect(() => {
        const onScroll = () => {
            const scrolledToBottom = (document.body.offsetHeight - (window.innerHeight + window.scrollY)) < 25
            if (scrolledToBottom && !isFetching) {
                console.log("Fetching more data...");
                setPage(page + 1);
            }
        }

        document.addEventListener("scroll", onScroll);

        return function () {
            document.removeEventListener("scroll", onScroll);
        };
    }, [page, isFetching])

    return (
        <div>
            {children}
        </div>
    )
}

export default Pagination