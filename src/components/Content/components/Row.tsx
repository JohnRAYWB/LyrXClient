import React from "react";
import styles from "./styles/Row.module.css"
import Element from "@/components/Content/components/Element";
import {previewItemDto} from "@/api/dto/previewItem.dto";

interface trackItems {
    items: previewItemDto[]
}

const Row: React.FC<trackItems> = ({items}) => {

    return (
        <div className={styles.main}>
            {items && items.map(item =>
                <Element
                    key={item._id}
                    item={item}
                />
            )}
        </div>
    );
};

export default Row;