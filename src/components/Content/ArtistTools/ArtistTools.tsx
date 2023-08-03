import React from 'react';

import styles from "./styles/ArtistTools.module.css"
import ArtistOwnElementInfo from "@/components/Content/ArtistTools/components/ArtistOwnElementInfo";
import {userDto} from "@/api/dto/user.dto";
import {useFetchArtistsTracksQuery} from "@/store/api/TrackApi";
import {useFetchArtistsAlbumsQuery} from "@/store/api/AlbumApi";
import {useScoreLength} from "@/util/useScoreLength";

interface Param {
    artist: userDto
}

const ArtistTools: React.FC<Param> = ({artist}) => {

    const {data: allTracks, isLoading: allLoading} = useFetchArtistsTracksQuery(null)
    const {data: listensTracks, isLoading: listensLoading} = useFetchArtistsTracksQuery('listens')
    const {data: favoritesTracks, isLoading: favoritesLoading} = useFetchArtistsTracksQuery('favorites')
    const {data: commentedTracks, isLoading: commentedLoading} = useFetchArtistsTracksQuery('comment')

    const {data: albums, isLoading} = useFetchArtistsAlbumsQuery()

    if (isLoading || allLoading || listensLoading || favoritesLoading || commentedLoading) {
        return <></>
    }

    let commentCount = 0
    let listens = 0
    let tracksFavorites = 0

    allTracks.forEach(track => {
        commentCount += track.commentCount
        listens += track.listens
        tracksFavorites += track.favorites
    })

    const commentCountRound = useScoreLength(commentCount)
    const listensRound = useScoreLength(listens)
    const tracksFavoritesRound = useScoreLength(tracksFavorites)

    let albumsFavorites = 0

    albums.forEach(album => albumsFavorites += album.favorites)

    const followersCount = artist.followers.length
    const tracksCount = artist.tracks.length
    const albumsCount = artist.albums.length

    const listenedTrack = listensTracks[0]
    const likedTrack = favoritesTracks[0]
    const commentedTrack = commentedTracks[0]

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Artists Statistic</h1>
            <div className={styles.artistStatContainer}>
                <p className={styles.artistStatBox}>Followers | {followersCount} | Total</p>
                <p className={styles.artistStatBox}>Tracks | {tracksCount} | Total</p>
                <p className={styles.artistStatBox}>Albums | {albumsCount} | Total</p>
            </div>
            <h1 className={styles.title}>Tracks Statistic</h1>
            {allTracks.length !== 0 ?
                <div className={styles.elementsContainer}>
                    <div className={styles.elementsRow}>
                        <div className={styles.elementContainer}>
                            <p className={styles.elementContainerTitle}>Most listened</p>
                            <ArtistOwnElementInfo element={listenedTrack} elementType={'track'} type={'listens'}/>
                        </div>
                        <div className={styles.elementContainer}>
                            <p className={styles.elementContainerTitle}>Most liked</p>
                            <ArtistOwnElementInfo element={likedTrack} elementType={'track'} type={'favorites'}/>
                        </div>
                        <div className={styles.elementContainer}>
                            <p className={styles.elementContainerTitle}>Most commented</p>
                            <ArtistOwnElementInfo element={commentedTrack} elementType={'track'} type={'comment'}/>
                        </div>
                    </div>
                    <div className={styles.elementsRow}>
                        <div className={styles.elementContainer}>
                            <div className={styles.scoreContainer}>
                                <p className={styles.scoreTitle}>Total listens</p>
                                <p className={styles.scoreCount}>{listensRound}</p>
                            </div>
                        </div>
                        <div className={styles.elementContainer}>
                            <div className={styles.scoreContainer}>
                                <p className={styles.scoreTitle}>Total favorites</p>
                                <p className={styles.scoreCount}>{tracksFavoritesRound}</p>
                            </div>
                        </div>
                        <div className={styles.elementContainer}>
                            <div className={styles.scoreContainer}>
                                <p className={styles.scoreTitle}>Total comments</p>
                                <p className={styles.scoreCount}>{commentCountRound}</p>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <p>You don't have tracks yet</p>
            }
            <h1 className={styles.title}>Albums Statistic</h1>
            {albums.length !== 0 ?
                <div className={styles.elementsContainer}>
                    <p className={styles.elementContainerTitle}>Most Liked</p>
                    <div className={styles.elementsRow}>
                        <div className={styles.elementContainer}>
                            <ArtistOwnElementInfo element={albums[0]} elementType={'album'}/>
                        </div>
                        <div className={styles.elementContainer}>
                            <ArtistOwnElementInfo element={albums[1]} elementType={'album'}/>
                        </div>
                        <div className={styles.elementContainer}>
                            <ArtistOwnElementInfo element={albums[2]} elementType={'album'}/>
                        </div>
                    </div>
                </div>
                :
                <p>You don't have albums yet</p>
            }
        </div>
    );
};

export default ArtistTools;