import {apiSlice} from "@/store/api/apiSlice";

export const PlaylistApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        fetchAllPlaylistAndSearch: build.query({
            query: (query) => ({
                url: `playlists/search?name=${query}`
            }),
            providesTags: result => ['Playlist']
        }),
        fetchMostLikedPlaylist: build.query({
            query: () => ({
                url: `playlists/top`
            }),
            providesTags: result => ['Playlist']
        }),
        fetchPlaylistById: build.query({
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
        })
    })
})

export const {
    useFetchAllPlaylistAndSearchQuery,
    useFetchMostLikedPlaylistQuery,
    useFetchPlaylistByIdQuery,
    useAddPlaylistToUserCollectionMutation,
    useRemovePlaylistFromUserCollectionMutation
} = PlaylistApi