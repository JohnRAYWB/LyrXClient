import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {HYDRATE} from "next-redux-wrapper";
import {trackDto} from "@/api/dto/track.dto";

const baseUrl = 'http://localhost:4221'

const TrackApi = createApi({
    reducerPath: 'trackApi',
    tagTypes: ['Tracks'],
    baseQuery: fetchBaseQuery({baseUrl}),
    extractRehydrationInfo(action, {reducerPath}) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath]
        }
    },
    endpoints: (build) => ({
        fetchAllAndSearch: build.query({
            query: (query) => ({
                url: `tracks/search?name=${query}`
            })
        }),
        fetchMostLiked: build.query<number>({
            query: (page) => ({
                url: `tracks/top?page=${page}`
            })
        }),
        fetchById: build.query({
            query: (tId) => ({
                url: `tracks/${tId}/current`
            })
        })
    })
})

export const {useFetchAllAndSearchQuery, useFetchMostLikedQuery, useFetchByIdQuery} = TrackApi

export default TrackApi