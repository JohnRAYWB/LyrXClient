import {userDto} from "@/api/dto/user.dto";
import {apiSlice} from "./apiSlice"

export const UserApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        fetchProfile: build.query<userDto, void>({
            query: () => ({
                url: 'users/profile'
            }),
            providesTags: result => ['User', 'Track', 'Playlist', 'Album']
        }),
        fetchAllUserAndSearch: build.query<userDto[], string>({
            query: (query) => ({
                url: `users/search?username=${query}`
            }),
            providesTags: result => ['User']
        }),
        fetchAllUsers: build.query<userDto[], number>({
            query: (page) => ({
                url: `users?limit=10&page=${page * 10}`
            }),
            serializeQueryArgs: ({endpointName}) => {
                return endpointName
            },
            merge: (currentCache, newItem) => {
                currentCache.push(...newItem)
            },
            forceRefetch({currentArg, previousArg}) {
                return currentArg !== previousArg
            }
        }),
        fetchAllArtistsAndSearch: build.query<userDto[], string>({
            query: (query) => ({
                url: `users/artists/search?username=${query}`
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
        }),
        addRole: build.mutation({
            query: ({uId, ...roleName}) => ({
                url: `users/role/${uId}/add`,
                method: 'POST',
                body: roleName,
                responseHandler: (response) => response.text()
            }),
            invalidatesTags: result => ['User']
        }),
        removeRole: build.mutation({
            query: ({uId, ...roleName}) => ({
                url: `users/role/${uId}/remove`,
                method: 'POST',
                body: roleName,
                responseHandler: (response) => response.text()
            }),
            invalidatesTags: result => ['User']
        }),
        unbanUser: build.mutation({
            query: (uId) => ({
                url: `users/unban/${uId}`,
                method: 'POST',
                responseHandler: (response) => response.text()
            }),
            invalidatesTags: result => ['User']
        }),
        banUser: build.mutation({
            query: ({uId, ...reason}) => ({
                url: `users/ban/${uId}`,
                method: 'POST',
                body: reason,
                responseHandler: (response) => response.text()
            }),
            invalidatesTags: result => ['User']
        })
    })
})

export const {
    useFetchProfileQuery,
    useFetchAllUsersQuery,
    useFetchAllUserAndSearchQuery,
    useFetchAllArtistsAndSearchQuery,
    useFetchUserByIdQuery,
    useUploadAboutMutation,
    useUploadAvatarMutation,
    useSubscribeUserMutation,
    useAddRoleMutation,
    useRemoveRoleMutation,
    useUnbanUserMutation,
    useBanUserMutation,
} = UserApi