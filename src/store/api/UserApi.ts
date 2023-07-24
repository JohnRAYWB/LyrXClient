import {userDto} from "@/api/dto/user.dto";
import {trackDto} from "@/api/dto/track.dto";
import {apiSlice} from "./apiSlice"

export const UserApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        fetchProfile: build.query<userDto, void>({
            query: () => ({
                url: 'users/profile'
            }),
            providesTags: result => ['User', 'Track']
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
    useFetchAllUserAndSearchQuery,
    useFetchUserByIdQuery,
    useUploadAboutMutation,
    useUploadAvatarMutation,
    useSubscribeUserMutation
} = UserApi