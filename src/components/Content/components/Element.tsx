import React from "react";
import styles from './styles/Element.module.css'
import Image from "next/image";
import {previewItemDto} from "@/api/dto/previewItem.dto";
import useTextLength from "@/util/useTextLength";
import {useRouter} from "next/navigation";

interface element {
    item: previewItemDto
    type: string
}

const Element: React.FC<element> = ({item, type}) => {

    const router = useRouter()

    const nameLength = useTextLength(item.name, 40)
    const descriptionLength = useTextLength(item.description || '', 40)

    return (
        <div className={styles.container} onClick={() => router.push(`/pth/hub/${type}/${item._id}`)}>
            <Image className={styles.image} priority={true} quality={50} width={165} height={165} src={item.image} alt={'logo'}/>
            <div className={styles.textContainer}>
                <h1 className={styles.name}>{nameLength}</h1>
                <p className={styles.description}>{descriptionLength}</p>
            </div>
        </div>
    );
};

export default Element;