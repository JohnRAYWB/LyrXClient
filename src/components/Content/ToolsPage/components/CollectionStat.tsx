import React from 'react';

import styles from "../styles/EntitiesHandler.module.css"
import {playlistDto} from "@/api/dto/playlist.dto";
import {albumDto} from "@/api/dto/album.dto";
import {trackDto} from "@/api/dto/track.dto";
import EntitiesList from "@/components/Content/ToolsPage/components/EntitiesList";

interface Param {
    collection: trackDto[] | playlistDto[] | albumDto[]
    favoritesCollection: trackDto[] | playlistDto[] | albumDto[]
    listensCollection?: trackDto[]
    entitiesType?: string
    title: string
}

const CollectionStat: React.FC<Param> = ({collection, favoritesCollection, listensCollection, entitiesType, title}) => {

    let favorites = 0
    let listens = 0

    // @ts-ignore
    const uploadsForTheDay = collection.filter(entity => {

        if (entitiesType === 'track') {
            listens += entity.listens
        } else {
            favorites += entity.favorites
        }

        const date = new Date(entity.createdTime).toLocaleDateString().split('.')
        const now = new Date(Date.now()).toLocaleDateString().split('.')
        if (now[0] === date[0] && now[1] === date[1] && now[2] === date[2]) {
            return entity
        }
    }).length

    return (
        <div>
            <h1 className={styles.detailedStatTitle}>{title} Statistic</h1>
            <div className={styles.detailedStatEntitiesContainer}>
                <div>
                    <h1 className={styles.detailedEntityTitle}>Main info</h1>
                    <div className={styles.detailedStatEntities}>
                        <div className={styles.detailedStatEntity}>
                            <p className={styles.entityTitle}>Total count</p>
                            <p className={styles.entityScore}>{collection.length}</p>
                        </div>
                        {entitiesType === 'track' ?
                            <div className={styles.detailedStatEntity}>
                                <p className={styles.entityTitle}>Listens for all time</p>
                                <p className={styles.entityScore}>{listens}</p>
                            </div>
                            :
                            <div className={styles.detailedStatEntity}>
                                <p className={styles.entityTitle}>Total add to favorites</p>
                                <p className={styles.entityScore}>{favorites}</p>
                            </div>
                        }
                        <div className={styles.detailedStatEntity}>
                            <p className={styles.entityTitle}>Added for the day</p>
                            <p className={styles.entityScore}>{uploadsForTheDay}</p>
                        </div>
                    </div>
                    <h1 className={styles.detailedEntityTitle}>Top list</h1>
                    <div className={styles.topTrackContainer}>
                        {entitiesType === 'track' ?
                            <>
                                <div>
                                    <h1 className={styles.detailedStatTitle}>Most favorites tracks</h1>
                                    {favoritesCollection.length !== 0 ?
                                        <EntitiesList entities={favoritesCollection} entityType={'track'}
                                                      type={'favorites'}/>
                                        :
                                        <p className={styles.detailedStatTitle}>List is empty</p>
                                    }
                                </div>
                                <div>
                                    <h1 className={styles.detailedStatTitle}>Most listens tracks</h1>
                                    {listensCollection.length !== 0 ?
                                        <EntitiesList entities={listensCollection} entityType={'track'}
                                                      type={'listens'}/>
                                        :
                                        <p className={styles.detailedStatTitle}>List is empty</p>
                                    }
                                </div>
                            </>
                            :
                            <div>
                                <h1 className={styles.detailedStatTitle}>Most favorites {title}</h1>
                                {favoritesCollection.length !== 0 ?
                                    <EntitiesList entities={favoritesCollection} entityType={entitiesType}
                                                  type={'favorites'}/>
                                    :
                                    <p className={styles.detailedStatTitle}>List is empty</p>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CollectionStat;