import {createApi} from "@reduxjs/toolkit/query/react";
import {HYDRATE} from "next-redux-wrapper";
import {baseQuery} from "@/store/api/headers";
import {trackDto} from "@/api/dto/track.dto";

const TrackApi = createApi({
    reducerPath: 'trackApi',
    tagTypes: ['Track', 'User'],
    extractRehydrationInfo(action, {reducerPath}) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath]
        }
    },
    baseQuery: baseQuery,
    endpoints: (build) => ({
        fetchAllAndSearch: build.query<trackDto[], string>({
            query: (query) => ({
                url: `tracks/search?name=${query}`,
            }),
            providesTags: result => ['Track']
        }),
        fetchMostLiked: build.query<trackDto, trackDto>({
            query: () => ({
                url: `tracks/top`,
            }),
            providesTags: result => ['Track']
        }),
        fetchById: build.query<trackDto, string>({
            query: (tId) => ({
                url: `tracks/${tId}/current`
            }),
            providesTags: result => ['Track']
        }),
        addToCollection: build.mutation<trackDto, string>({
            query: (tId) => ({
                url: `tracks/collection/${tId}/add`,
                method: 'POST',
                responseHandler: (response) => response.text()
            }),
            invalidatesTags: result => ['Track']
        }),
        removeFromCollection: build.mutation<trackDto, string>({
            query: (tId) => ({
                url: `tracks/collection/${tId}/remove`,
                method: 'POST',
                responseHandler: (response) => response.text()
            }),
            invalidatesTags: result => ['Track']
        }),
    })
})

export const {
    useFetchAllAndSearchQuery,
    useFetchMostLikedQuery,
    useFetchByIdQuery,
    useAddToCollectionMutation,
    useRemoveFromCollectionMutation
} = TrackApi

export default TrackApi
