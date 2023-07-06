import React from 'react';
import {previewItemDto} from "@/api/dto/previewItem.dto";
import styles from "./styles/Collection.module.css"
import CollectionItem from "@/components/Content/components/CollectionItem";

interface CollectionItems {
    items: previewItemDto[]
    type: string
}

const Collection: React.FC<CollectionItems> = ({items, type}) => {

    return (
        <div className={styles.main}>
            {items && items.map(item =>
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