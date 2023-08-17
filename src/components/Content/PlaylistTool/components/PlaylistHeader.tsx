import React from 'react';
import {playlistDto} from "@/api/dto/playlist.dto";
import styles from "@/components/Content/PlaylistTool/styles/UsersPlaylists.module.css";
import Image from "next/image";
import {playlistImagePath} from "@/util/ImagePath";
import useTextLength from "@/util/useTextLength";
import ScoreContainer from "@/components/Content/components/ScoreContainer";
import PlaylistsTrackList from "@/components/Content/PlaylistTool/components/PlaylistsTrackList";
import {userDto} from "@/api/dto/user.dto";
import {useRouter} from "next/navigation";

interface Param {
    playlist: playlistDto
    user: userDto
}

const PlaylistHeader: React.FC<Param> = ({playlist, user}) => {

    const router = useRouter()

    return (
        <div className={styles.CurrentContainer}>
            <div className={styles.CurrentInfoContainer}>
                <Image
                    className={styles.image}
                    width={150}
                    height={150}
                    priority={true}
                    src={playlistImagePath(playlist)}
                    alt={'playlist_logo'}
                />
                <div className={styles.CurrentDescriptionContainer}>
                    <h1 onClick={() => router.push(`/pth/hub/playlist/${playlist._id}`)}
                        className={styles.CurrentName}>
                        {useTextLength(playlist.name[1], 10)}
                    </h1>
                    <ScoreContainer title={'Favorites'} count={playlist.favorites}/>
                    <div className={styles.genresContainer}>
                        {playlist.genre.map(genre => <p key={genre._id}>{genre.name}</p>)}
                    </div>
                </div>
            </div>
            <div className={styles.trackListContainer}>
                {playlist.tracks.length === 0 ?
                    <h1 className={styles.title}>Track list is empty</h1>
                    :
                    <div className={styles.CurrentTracksContainer}>
                        {playlist.tracks.map((track, index) =>
                            <PlaylistsTrackList key={track._id} track={track} playlistId={playlist._id} user={user} index={index}/>
                        )}
                    </div>
                }
            </div>
        </div>
    );
};

export default PlaylistHeader;