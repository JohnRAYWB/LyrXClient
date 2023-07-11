import React from "react";
import styles from "./styles/Row.module.css"
import Element from "@/components/Content/components/Element";
import {previewItemDto} from "@/api/dto/previewItem.dto";
import {trackDto} from "@/api/dto/track.dto";
import {playlistDto} from "@/api/dto/playlist.dto";
import album from "@/pages/pth/hub/album";
import {albumDto} from "@/api/dto/album.dto";

interface trackItems {
    items: trackDto[] | playlistDto[] | albumDto[]
    type: string
}

const Row: React.FC<trackItems> = ({items, type}) => {

    return (
        <div className={styles.main}>
            {items && items.map(item =>
                <Element
                    key={item._id}
                    item={item}
                    type={type}
                />
            )}
        </div>
    );
};

export default Row;