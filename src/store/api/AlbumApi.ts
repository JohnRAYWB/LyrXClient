import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {HYDRATE} from "next-redux-wrapper";

const baseUrl = 'http://localhost:4221/albums'

const AlbumApi = createApi({
    reducerPath: 'albumApi',
    tagTypes: ['Album'],
    baseQuery: fetchBaseQuery({baseUrl}),
    extractRehydrationInfo(action, {reducerPath}) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath]
        }
    },
    endpoints: (build) => ({
        fetchAllAndSearch: build.query({
            query: (query) => ({
                url: `search?name=${query}`
            })
        }),
        fetchMostLiked: build.query({
            query: (page) => ({
                url: `top?page=${page}`
            })
        }),
        fetchById: build.query({
            query: (aId) => ({
                url: `${aId}/current`
            })
        })
    })
})

export const {useFetchAllAndSearchQuery, useFetchMostLikedQuery, useFetchByIdQuery} = AlbumApi

export default AlbumApi