import {apiSlice} from "@/store/api/apiSlice";
import {playlistDto} from "@/api/dto/playlist.dto";

export const PlaylistApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        fetchAllPlaylist: build.query<playlistDto[], number>({
            query: (page) => ({
                url: `playlists?limit=10&page=${page * 10}`,
            }),
            serializeQueryArgs: ({endpointName}) => {
                return endpointName
            },
            merge: (currentCache, newItems) => {
                currentCache.push(...newItems)
            },
            forceRefetch({currentArg, previousArg}) {
                return currentArg !== previousArg
            },
        }),
        fetchAllPlaylistAndSearch: build.query<playlistDto[], string>({
            query: (query) => ({
                url: `playlists/search?name=${query}`
            }),
            providesTags: result => ['Playlist']
        }),
        fetchMostLikedPlaylist: build.query<playlistDto[], void>({
            query: () => ({
                url: `playlists/top`
            }),
            providesTags: result => ['Playlist']
        }),
        fetchUsersPlaylists: build.query<playlistDto[], void>({
           query: () => ({
               url: `playlists/user`
           }),
            providesTags: result => ['Playlist']
        }),
        fetchPlaylistById: build.query<playlistDto, string>({
            query: (pId) => ({
                url: `playlists/${pId}/current`
            }),
            providesTags: result => ['Playlist']
        }),
        addPlaylist: build.mutation({
           query: (body) => ({
                url: 'playlists',
               method: 'POST',
               body: body,
               formData: true
           }),
            invalidatesTags: result => ['Playlist', 'User']
        }),
        addPlaylistToUserCollection: build.mutation({
            query: (pId) => ({
                url: `playlists/collection/${pId}/add`,
                method: 'POST',
                responseHandler: response => response.text()
            }),
            invalidatesTags: result => ['Playlist'],
        }),
        removePlaylistFromUserCollection: build.mutation({
            query: (pId) => ({
                url: `playlists/collection/${pId}/remove`,
                method: 'POST',
                responseHandler: response => response.text()
            }),
            invalidatesTags: result => ['Playlist']
        }),
        deletePlaylist: build.mutation({
            query: (pId) => ({
                url: `playlists/${pId}`,
                method: 'DELETE',
                responseHandler: response => response.text()
            }),
            invalidatesTags: result => ['Playlist']
        })
    })
})

export const {
    useFetchAllPlaylistQuery,
    useFetchAllPlaylistAndSearchQuery,
    useFetchMostLikedPlaylistQuery,
    useFetchUsersPlaylistsQuery,
    useFetchPlaylistByIdQuery,
    useAddPlaylistMutation,
    useAddPlaylistToUserCollectionMutation,
    useRemovePlaylistFromUserCollectionMutation,
    useDeletePlaylistMutation
} = PlaylistApi