import {createApi} from "@reduxjs/toolkit/query/react";
import {HYDRATE} from "next-redux-wrapper";
import {baseQuery} from "@/store/api/headers";

const AlbumApi = createApi({
    reducerPath: 'albumApi',
    tagTypes: ['Album'],
    extractRehydrationInfo(action, {reducerPath}) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath]
        }
    },
    baseQuery: baseQuery,
    endpoints: (build) => ({
        fetchAllAndSearch: build.query({
            query: (query) => ({
                url: `albums/search?name=${query}`
            })
        }),
        fetchMostLiked: build.query({
            query: () => ({
                url: `albums/top`
            })
        }),
        fetchById: build.query({
            query: (aId) => ({
                url: `albums/${aId}/current`
            })
        })
    })
})

export const {useFetchAllAndSearchQuery, useFetchMostLikedQuery, useFetchByIdQuery} = AlbumApi

export default AlbumApi