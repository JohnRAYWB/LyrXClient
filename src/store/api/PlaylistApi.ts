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
        fetchUsersPlaylistsCollection: build.query<playlistDto[], void>({
            query: () => ({
                url: `playlists/user/playlist_collection`
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
        addGenreToPlaylist: build.mutation({
            query: ({pId, ...genre}) => ({
                url: `playlists/genre/${pId}/add`,
                method: 'POST',
                body: genre,
                responseHandler: (response) => response.text()
            }),
            invalidatesTags: result => ['Playlist', 'Genre']
        }),
        addPlaylistToUserCollection: build.mutation({
            query: (pId) => ({
                url: `playlists/collection/${pId}/add`,
                method: 'POST',
                responseHandler: response => response.text()
            }),
            invalidatesTags: result => ['Playlist'],
        }),
        editPlaylistDescription: build.mutation({
            query: ({pId, ...body}) => ({
                url: `playlists/edit/${pId}/description`,
                method: 'PATCH',
                body: body,
                responseHandler: (response) => response.text()
            }),
            invalidatesTags: result => ['Playlist']
        }),
        editPlaylistImage: build.mutation({
            query: ({pId, image}) => ({
                url: `playlists/edit/${pId}/image`,
                method: 'PATCH',
                file: image,
                body: image,
                formData: true,
                responseHandler: (response) => response.text()
            }),
            invalidatesTags: result => ['Playlist']
        }),
        removeGenreFromPlaylist: build.mutation({
            query: ({pId, ...genre}) => ({
                url: `playlists/genre/${pId}/remove`,
                method: 'POST',
                body: genre,
                responseHandler: (response) => response.text()
            }),
            invalidatesTags: result => ['Playlist', 'Genre']
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
            invalidatesTags: result => ['Playlist', 'User']
        })
    })
})

export const {
    useFetchAllPlaylistQuery,
    useFetchAllPlaylistAndSearchQuery,
    useFetchMostLikedPlaylistQuery,
    useFetchUsersPlaylistsQuery,
    useFetchUsersPlaylistsCollectionQuery,
    useFetchPlaylistByIdQuery,
    useAddPlaylistMutation,
    useAddGenreToPlaylistMutation,
    useAddPlaylistToUserCollectionMutation,
    useEditPlaylistDescriptionMutation,
    useEditPlaylistImageMutation,
    useRemoveGenreFromPlaylistMutation,
    useRemovePlaylistFromUserCollectionMutation,
    useDeletePlaylistMutation
} = PlaylistApi