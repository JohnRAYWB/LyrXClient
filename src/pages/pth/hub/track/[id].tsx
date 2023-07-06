import React, {useState} from 'react';
import {NextPage} from "next";
import {trackDto} from "@/api/dto/track.dto";
import Image from "next/image";
import styles from "@/styles/TrackPage.module.css"

const TrackPage: NextPage = () => {

    const track: trackDto = {
        _id: "1",
        name: "Масло черного тмина - Иконы",
        description: '10 Try to put here text includes for more then 40 characters',
        listens: 10,
        favorites: 0,
        audio: "audio/d47aca10-dd29-40d4-abf5-cb4798870d88.mp3",
        image: "/../public/logo_track.jpg",
        protectedDeletion: false,
        artist: "648bf1eeb3f515230b3fc72f",
        genre: [
            {
                name: "Bibob"
            },
            {
                name: "Bibob"
            },
            {
                name: "Bibob"
            },
        ],
        comments: [],
        album: {name: "Maximum Black"},
        __v: 0
    }

    const genres = track.genre.map(gen => [].concat(gen.name)).join(' | ')
    const [artistName, trackName] = track.name.split(' - ')

    return (
        <div className={styles.main}>
            <div className={styles.infoContainer}>
                <Image className={styles.image} priority={true} width={300} height={300} src={track.image} alt={'track_logo'}/>
                <div className={styles.infoText}>
                    <p>NAME: {trackName}</p>
                    <p>ARTIST: {artistName}</p>
                    <p>DESCRIPTION: {track.description}</p>
                    {track.album.name ? <p>ALBUM: {track.album.name}</p> : null}
                    {genres.length !== 0 ? <p>GENRES: {genres}</p> : null}
                </div>
            </div>
        </div>
    );
};

TrackPage.displayName = 'Track Page'
export default TrackPage;