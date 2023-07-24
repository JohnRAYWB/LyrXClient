import {userDto} from "@/api/dto/user.dto";
import {trackDto} from "@/api/dto/track.dto";
import {apiSlice} from "./apiSlice"

export const UserApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        fetchProfile: build.query<userDto, void>({
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
        fetchUserCollection: build.query<trackDto, void>({
            query: () => ({
                url: 'users/collection'
            }),
            providesTags: result => ['User']
        }),
        uploadAbout: build.mutation({
           query: (about) => ({
               url: 'users/profile/about',
               method: 'POST',
               body: about,
               responseHandler: response => response.text()
           }),
            invalidatesTags: result => ['User']
        }),
        uploadAvatar: build.mutation({
            query: (avatar) => ({
                url: 'users/profile/avatar',
                method: 'POST',
                file: avatar,
                body: avatar,
                formData: true,
                responseHandler: (response) => response.text()
            }),
            invalidatesTags: result => ['User']
        }),
        addTrackToUserCollection: build.mutation({
            query: (tId) => ({
                url: `tracks/collection/${tId}/add`,
                method: 'POST',
                responseHandler: (response) => response.text()
            }),
            invalidatesTags: result => ['User', 'Track']
        }),
        removeTrackFromUserCollection: build.mutation({
            query: (tId) => ({
                url: `tracks/collection/${tId}/remove`,
                method: 'POST',
                responseHandler: (response) => response.text()
            }),
            invalidatesTags: result => ['User', 'Track']
        }),
        subscribeUser: build.mutation({
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
    useUploadAboutMutation,
    useUploadAvatarMutation,
    useAddTrackToUserCollectionMutation,
    useRemoveTrackFromUserCollectionMutation,
    useSubscribeUserMutation
} = UserApi