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

    if(items.length === 0) {
        return <div className={styles.emptyList}>Here no added collection yet</div>
    }

    return (
        <div className={styles.main}>
            {items && items.map((item) =>
                <CollectionItem
                    key={item._id}
                    item={item}
                    type={type}
                />
            )}
        </div>
    );
};

export default Collection