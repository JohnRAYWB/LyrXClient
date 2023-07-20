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
        })
    })
})

export const {useFetchAllPlaylistAndSearchQuery, useFetchMostLikedPlaylistQuery, useFetchPlaylistByIdQuery} = PlaylistApi