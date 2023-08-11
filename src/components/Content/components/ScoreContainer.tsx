import React from 'react';
import styles from "./styles/ScoreContainer.module.css";
import {useScoreLength} from "@/util/useScoreLength";

interface Param {
    title: string
    count: number
}

const ScoreContainer: React.FC<Param> = ({title, count}) => {
    return (
        <div className={styles.scoreContainer}>
            <p className={styles.scoreTitle}>{title}</p>
            <p className={styles.scoreCounter}>{useScoreLength(count)}</p>
        </div>
    );
};

export default ScoreContainer;