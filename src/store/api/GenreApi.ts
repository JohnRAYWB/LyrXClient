import {createApi} from "@reduxjs/toolkit/query/react";
import {HYDRATE} from "next-redux-wrapper";
import {baseQuery} from "@/store/api/headers";

const GenreApi = createApi({
    reducerPath: 'genreApi',
    tagTypes: ['Genre'],
    extractRehydrationInfo(action, {reducerPath}) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath]
        }
    },
    baseQuery: baseQuery,
    endpoints: (build) => ({
        fetchAll: build.query({
            query: (page) => ({
                url: `genres?limit=20&page=${page}`,
            })
        }),
        fetchById: build.query({
            query: (gId) => ({
                url: `genres/${gId}`
            })
        })
    })
})

export const {useFetchAllQuery, useFetchByIdQuery} = GenreApi

export default GenreApi