import {createApi} from "@reduxjs/toolkit/query/react";
import {HYDRATE} from "next-redux-wrapper";
import {baseQuery} from "@/store/api/headers";

const PlaylistApi = createApi({
    reducerPath: 'playlistApi',
    tagTypes: ['Playlist'],
    extractRehydrationInfo(action, {reducerPath}) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath]
        }
    },
    baseQuery: baseQuery,
    endpoints: (build) => ({
        fetchAllAndSearch: build.query({
            query: (query) => ({
                url: `playlists/search?name=${query}`
            })
        }),
        fetchMostLiked: build.query({
            query: (page) => ({
                url: `playlists/top?page=${page}`
            })
        }),
        fetchById: build.query({
            query: (pId) => ({
                url: `playlists/${pId}/current`
            })
        })
    })
})

export const {useFetchAllAndSearchQuery, useFetchMostLikedQuery, useFetchByIdQuery} = PlaylistApi

export default PlaylistApi