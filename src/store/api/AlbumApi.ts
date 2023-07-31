import {apiSlice} from "@/store/api/apiSlice";
import {albumDto} from "@/api/dto/album.dto";

export const AlbumApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        fetchAllAlbumAndSearch: build.query<albumDto[], string>({
            query: (query) => ({
                url: `albums/search?name=${query}`
            }),
            providesTags: result => ['Album']
        }),
        fetchMostLikedAlbum: build.query<albumDto[], void>({
            query: () => ({
                url: `albums/top`
            }),
            providesTags: result => ['Album']
        }),
        fetchAlbumById: build.query<albumDto, string>({
            query: (aId) => ({
                url: `albums/${aId}/current`
            }),
            providesTags: result => ['Album']
        }),
        addAlbumToUserCollection: build.mutation({
            query: (pId) => ({
                url: `albums/collection/${pId}/add`,
                method: 'POST',
                responseHandler: response => response.text()
            }),
            invalidatesTags: result => ['Album', 'User']
        }),
        removeAlbumFromUserCollection: build.mutation({
            query: (pId) => ({
                url: `albums/collection/${pId}/remove`,
                method: 'POST',
                responseHandler: response => response.text()
            }),
            invalidatesTags: result => ['Album', 'User']
        }),
        removeTrackFromAlbum: build.mutation({
           query: ({aId, ...tId}) => ({
               url: `albums/track/${aId}/remove`,
               method: 'PATCH',
               body: tId,
               responseHandler: (response) => response.text()
           }),
            invalidatesTags: result => ['Album', 'Track']
        }),
        deleteAlbum: build.mutation({
            query: (aId) => ({
                url: `albums/${aId}`,
                method: 'DELETE',
                responseHandler: response => response.text()
            }),
            invalidatesTags: result => ['Album']
        })
    })
})

export const {
    useFetchAllAlbumAndSearchQuery,
    useFetchMostLikedAlbumQuery,
    useFetchAlbumByIdQuery,
    useAddAlbumToUserCollectionMutation,
    useRemoveAlbumFromUserCollectionMutation,
    useRemoveTrackFromAlbumMutation,
    useDeleteAlbumMutation
} = AlbumApi