import React from "react";
import styles from "./styles/Row.module.css"
import Element from "@/components/Content/components/Element";
import {previewItemDto} from "@/api/dto/previewItem.dto";

interface trackItems {
    items: previewItemDto[]
}

const Row: React.FC<trackItems> = ({items}) => {

    const firstFive = items.slice(0,5).map(element => ({image: element.image, name: element.name, description: element.description}))

    return (
        <div className={styles.main}>
            {firstFive && firstFive.map((item,index) =>
                <Element
                    key={index}
                    item={item}
                />
            )}
        </div>
    );
};

export default Row;