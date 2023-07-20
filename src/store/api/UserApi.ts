import {createApi} from "@reduxjs/toolkit/query/react";
import {HYDRATE} from "next-redux-wrapper";
import {baseQuery} from "@/store/api/headers";
import {userDto} from "@/api/dto/user.dto";
import {trackDto} from "@/api/dto/track.dto";
import

const UserApi = createApi({
    reducerPath: 'userApi',
    tagTypes: ['User'],
    baseQuery: baseQuery,
    extractRehydrationInfo(action, {reducerPath}) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath]
        }
    },
    endpoints: (build) => ({
        fetchProfile: build.query<userDto, userDto>({
            query: () => ({
                url: 'users/profile'
            }),
            providesTags: result => ['User']
        }),
        fetchAllAndSearch: build.query<userDto[], string>({
            query: (query) => ({
                url: `users/search?username=${query}`
            }),
            providesTags: result => ['User']
        }),
        fetchById: build.query<userDto, string>({
            query: (uId) => ({
                url: `users/profile/${uId}`
            }),
            providesTags: result => ['User']
        }),
        fetchCollection: build.query({
            query: () => ({
                url: 'users/collection'
            }),
            providesTags: result => ['User']
        }),
        addToCollection: build.mutation<trackDto, string>({
            query: (tId) => ({
                url: `tracks/collection/${tId}/add`,
                method: 'POST',
                responseHandler: (response) => response.text()
            }),
            invalidatesTags: result => ['User']
        }),
        removeFromCollection: build.mutation<trackDto, string>({
            query: (tId) => ({
                url: `tracks/collection/${tId}/remove`,
                method: 'POST',
                responseHandler: (response) => response.text()
            }),
            invalidatesTags: result => ['User']
        }),
        subscribe: build.mutation<userDto, string>({
            query: (uId) => ({
                url: `users/subscribe/${uId}`,
                method: 'POST',
                responseHandler: (response) => response.text()
            }),
            invalidatesTags: result => ['User']
        })
    })
})

export const {
    useFetchProfileQuery,
    useFetchCollectionQuery,
    useFetchAllAndSearchQuery,
    useFetchByIdQuery,
    useAddToCollectionMutation,
    useRemoveFromCollectionMutation,
    useSubscribeMutation
} = UserApi

export default UserApi