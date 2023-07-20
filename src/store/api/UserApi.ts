import {userDto} from "@/api/dto/user.dto";
import {trackDto} from "@/api/dto/track.dto";
import {apiSlice} from "./apiSlice"

export const UserApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        fetchProfile: build.query<userDto, userDto>({
            query: () => ({
                url: 'users/profile'
            }),
            providesTags: result => ['User']
        }),
        fetchAllUserAndSearch: build.query<userDto[], string>({
            query: (query) => ({
                url: `users/search?username=${query}`
            }),
            providesTags: result => ['User']
        }),
        fetchUserById: build.query<userDto, string>({
            query: (uId) => ({
                url: `users/profile/${uId}`
            }),
            providesTags: result => ['User']
        }),
        fetchUserCollection: build.query({
            query: () => ({
                url: 'users/collection'
            }),
            providesTags: result => ['User']
        }),
        addToUserCollection: build.mutation<trackDto, string>({
            query: (tId) => ({
                url: `tracks/collection/${tId}/add`,
                method: 'POST',
                responseHandler: (response) => response.text()
            }),
            invalidatesTags: result => ['User']
        }),
        removeFromUserCollection: build.mutation<trackDto, string>({
            query: (tId) => ({
                url: `tracks/collection/${tId}/remove`,
                method: 'POST',
                responseHandler: (response) => response.text()
            }),
            invalidatesTags: result => ['User']
        }),
        subscribeUser: build.mutation<userDto, string>({
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
    useFetchUserCollectionQuery,
    useFetchAllUserAndSearchQuery,
    useFetchUserByIdQuery,
    useAddToUserCollectionMutation,
    useRemoveFromUserCollectionMutation,
    useSubscribeUserMutation
} = UserApi