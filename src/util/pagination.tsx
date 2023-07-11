import React, {useEffect, useState} from 'react';
import axios from "axios";

interface Link {
    link: string
    num: number
}

const Pagination: React.FC<Link> = ({link, num}) => {

    const [entities, setEntities] = useState([])

    const [page, setPage] = useState(num)

    const [fetch, setFetch] = useState(false)

    const [totalCount, setTotalCount] = useState(1)

    useEffect(() => {
        if (fetch) {
            axios.get(`${link}${page}`)
                .then(res => {
                        setEntities([...entities, ...res.data])
                        setPage(page => page + 1)
                        console.log(page)
                        setTotalCount(res.headers['x-total-count'])
                    console.log(res.headers)
                    }
                )
                .finally(() => {
                    setFetch(false)
                })
        }
    }, [fetch])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)

        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [])

    const scrollHandler = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 && entities.length < totalCount) {
            setFetch(true)
        }
    }
    // http://localhost:4221/track/maslo/image/5975ac70-70b0-4b2d-b35a-e37923f40bfd.jpg
    console.log(entities)
    return (
        <div>
            {entities.map(en =>
                <div key={en._id}>
                    <p>{en.name}</p>
                    <img src={`http://localhost:4221/track/maslo/${en.image}`}/>
                </div>
            )}
        </div>
    );
};

export default Pagination;