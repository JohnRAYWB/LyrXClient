import React from "react";
import styles from './styles/Element.module.css'
import Image from "next/image";
import {previewItemDto} from "@/api/dto/previewItem.dto";

interface element {
    item: previewItemDto
}

const Element: React.FC<element> = ({item}) => {

    const descriptionLength = (text: string) => {
        if (text.length > 40) {
            return text.slice(0, 40) + '...'
        }
        return text
    }

    return (
        <div className={styles.container}>
            <Image className={styles.image} priority={true} quality={50} width={150} height={150} src={item.image} alt={'logo'}/>
            <div className={styles.textContainer}>
                <h1 className={styles.name}>{item.name}</h1>
                <p className={styles.description}>{descriptionLength(item.description || '')}</p>
            </div>
        </div>
    );
};

export default Element;