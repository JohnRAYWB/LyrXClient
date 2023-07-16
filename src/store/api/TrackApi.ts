import {createApi} from "@reduxjs/toolkit/query/react";
import {HYDRATE} from "next-redux-wrapper";
import {baseQuery} from "@/store/api/headers";

const TrackApi = createApi({
    reducerPath: 'trackApi',
    tagTypes: ['Tracks'],
    extractRehydrationInfo(action, {reducerPath}) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath]
        }
    },
    baseQuery: baseQuery,
    endpoints: (build) => ({
        fetchAllAndSearch: build.query({
            query: (query) => ({
                url: `tracks/search?name=${query}`,
            })
        }),
        fetchMostLiked: build.query({
            query: () => ({
                url: `tracks/top`,
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
