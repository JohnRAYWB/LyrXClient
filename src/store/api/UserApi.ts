import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {HYDRATE} from "next-redux-wrapper";

const baseUrl = 'http://localhost:4221/users'

const UserApi = createApi({
    reducerPath: 'userApi',
    tagTypes: ['User'],
    baseQuery: fetchBaseQuery({baseUrl}),
    extractRehydrationInfo(action, {reducerPath}) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath]
        }
    },
    endpoints: (build) => ({
        fetchAllAndSearch: build.query({
            query: (query) => ({
                url: `search?username=${query}`
            })
        }),
        fetchById: build.query({
            query: (uId) => ({
                url: `profile/${uId}`
            })
        })
    })
})

export const {useFetchAllAndSearchQuery, useFetchByIdQuery} = UserApi

export default UserApi