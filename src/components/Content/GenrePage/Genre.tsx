import React from 'react';
import {useRouter} from "next/navigation";

import styles from "./styles/Genre.module.css"
import {genreDto} from "@/api/dto/genre.dto";
import useTextLength from "@/util/useTextLength";

interface Genre {
    genre: genreDto
}

const Genre: React.FC<Genre> = ({genre}) => {

    const router = useRouter()

    return (
        <div className={styles.main} onClick={() => router.push(`/pth/hub/genre/${genre._id}`)}>
            <h1 className={styles.title}>{useTextLength(genre.name, 13)}</h1>
        </div>
    );
};

export default Genre;