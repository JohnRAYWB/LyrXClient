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
import {SettingOutlined} from "@ant-design/icons";
import {useAppSelector} from "@/hook/redux";
import {selectTrackData} from "@/store/slice/player";

interface Param {
    playlist: playlistDto
    user: userDto
}

const PlaylistHeader: React.FC<Param> = ({playlist, user}) => {

    const router = useRouter()

    const player = useAppSelector(selectTrackData)

    return (
        <div className={styles.CurrentContainer}>
            <div className={styles.CurrentInfoContainer}>
                <div className={styles.imageContainer}>
                    <Image
                        className={styles.image}
                        width={145}
                        height={145}
                        priority={true}
                        src={playlistImagePath(playlist)}
                        alt={'playlist_logo'}
                    />
                </div>
                <div className={styles.CurrentDescriptionContainer}>
                    <h1 onClick={() => router.push(`/pth/hub/playlist/${playlist._id}`)}
                        className={styles.CurrentName}>
                        {useTextLength(playlist.name[1], 9)}
                    </h1>
                    <ScoreContainer title={'Favorites'} count={playlist.favorites}/>
                    <div className={styles.genresContainer}>
                        {playlist.genre.map(genre => <p className={styles.genreName} key={genre._id}>{genre.name}</p>)}
                    </div>
                    {user.playlists.findIndex(uPlaylist => uPlaylist._id === playlist._id) !== -1 ?
                        <SettingOutlined
                            onClick={() => router.push(`/pth/hub/playlist/edit/${playlist._id}`)}
                            title={'Edit playlist'}
                            className={styles.edit}
                        />
                        :
                        null
                    }
                </div>
            </div>
            <div className={styles.trackListContainer}>
                {playlist.tracks.length === 0 ?
                    <h1 className={styles.title}>Track list is empty</h1>
                    :
                    <div className={styles.CurrentTracksContainer}>
                        {playlist.tracks.map((track, index) =>
                            <PlaylistsTrackList
                                key={track._id}
                                track={track}
                                currentTrack={player.currentTrack}
                                tracksList={playlist.tracks}
                                playlistId={playlist._id}
                                user={user}
                                index={index}
                                isPlaying={player.isPlaying}
                            />
                        )}
                    </div>
                }
            </div>
        </div>
    );
};

export default PlaylistHeader;