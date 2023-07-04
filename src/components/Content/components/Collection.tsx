import React from 'react';
import {previewItemDto} from "@/api/dto/previewItem.dto";
import styles from "./styles/Collection.module.css"
import CollectionItem from "@/components/Content/components/CollectionItem";

interface CollectionItems {
    items: previewItemDto[]
}

const Collection: React.FC<CollectionItems> = ({items}) => {

    return (
        <div className={styles.main}>
            {items && items.map(item =>
                <CollectionItem
                    key={item._id}
                    item={item}
                />
            )}
        </div>
    );
};

export default Collection