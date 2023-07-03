import React from "react";
import styles from './styles/Element.module.css'
import Image from "next/image";
import {previewItemDto} from "@/api/dto/previewItem.dto";
import useTextLength from "@/util/useTextLength";

interface element {
    item: previewItemDto
}

const Element: React.FC<element> = ({item}) => {

    const nameLength = useTextLength(item.name, 40)
    const descriptionLength = useTextLength(item.description || '', 40)

    return (
        <div className={styles.container}>
            <Image className={styles.image} priority={true} quality={50} width={165} height={165} src={item.image} alt={'logo'}/>
            <div className={styles.textContainer}>
                <h1 className={styles.name}>{nameLength}</h1>
                <p className={styles.description}>{descriptionLength}</p>
            </div>
        </div>
    );
};

export default Element;