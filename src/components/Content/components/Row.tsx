import React from "react";

import styles from "./styles/Row.module.css"
import Element from "@/components/Content/components/Element";
import {trackDto} from "@/api/dto/track.dto";
import {playlistDto} from "@/api/dto/playlist.dto";
import {albumDto} from "@/api/dto/album.dto";

interface trackItems {
    items: trackDto[] | playlistDto[] | albumDto[]
    type: string
}

const Row: React.FC<trackItems> = ({items, type}) => {

    return (
        <div className={styles.main}>
            {items && items.map((item, index) =>
                <Element
                    key={index}
                    item={item}
                    type={type}
                />
            )}
        </div>
    );
};

export default Row;