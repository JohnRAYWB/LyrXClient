import React from 'react';
import {previewItemDto} from "@/api/dto/previewItem.dto";
import Element from "@/components/Content/components/Element";
import styles from "./styles/Collection.module.css"

interface CollectionItems {
    items: previewItemDto[]
}

const Collection: React.FC<CollectionItems> = ({items}) => {
    return (
        <div className={styles.main}>
            {items && items.map((item,index) =>
                <Element key={index} item={item}/>
            )}
        </div>
    );
};

export default Collection