import React from 'react';

import styles from "./styles/TopListenedTracks.module.css"
import {trackDto} from "@/api/dto/track.dto";
import PlayableElement from "@/components/Content/components/PlayableElement";

interface Param {
    tracksList: trackDto[]
}

const TopListenedTracks: React.FC<Param> = ({tracksList}) => {
    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <h1 className={styles.title}>Top 10 listened tracks</h1>
            </div>
            <div className={styles.tracksContainer}>
                {tracksList.map((track, index) =>
                    <PlayableElement
                        key={index}
                        track={track}
                        tracksList={tracksList}
                        currentIndex={index}
                    />
                )}
            </div>
        </div>
    );
};

export default TopListenedTracks;