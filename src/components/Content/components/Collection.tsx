import React from 'react';

import styles from "./styles/Collection.module.css"
import CollectionItem from "@/components/Content/components/CollectionItem";
import {playlistDto} from "@/api/dto/playlist.dto";
import {albumDto} from "@/api/dto/album.dto";

interface CollectionItems {
    items: playlistDto[] | albumDto[]
    type: string
}

const Collection: React.FC<CollectionItems> = ({items, type}) => {

    return (
        <div className={styles.main}>
            {items && items.map((item, index) =>
                <CollectionItem
                    key={index}
                    item={item}
                    type={type}
                />
            )}
        </div>
    );
};

export default Collection