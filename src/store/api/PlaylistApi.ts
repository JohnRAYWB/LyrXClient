import {apiSlice} from "@/store/api/apiSlice";
import {playlistDto} from "@/api/dto/playlist.dto";

export const PlaylistApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
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
        fetchPlaylistById: build.query<playlistDto, string>({
            query: (pId) => ({
                url: `playlists/${pId}/current`
            }),
            providesTags: result => ['Playlist']
        }),
        addPlaylistToUserCollection: build.mutation({
            query: (pId) => ({
                url: `playlists/collection/${pId}/add`,
                method: 'POST',
                responseHandler: response => response.text()
            }),
            invalidatesTags: result => ['Playlist', 'User']
        }),
        removePlaylistFromUserCollection: build.mutation({
            query: (pId) => ({
                url: `playlists/collection/${pId}/remove`,
                method: 'POST',
                responseHandler: response => response.text()
            }),
            invalidatesTags: result => ['Playlist', 'User']
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
    useFetchAllPlaylistAndSearchQuery,
    useFetchMostLikedPlaylistQuery,
    useFetchPlaylistByIdQuery,
    useAddPlaylistToUserCollectionMutation,
    useRemovePlaylistFromUserCollectionMutation,
    useDeletePlaylistMutation
} = PlaylistApi