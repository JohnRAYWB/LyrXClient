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
        })
    })
})

export const {
    useFetchAllAlbumAndSearchQuery,
    useFetchMostLikedAlbumQuery,
    useFetchAlbumByIdQuery,
    useAddAlbumToUserCollectionMutation,
    useRemoveAlbumFromUserCollectionMutation
} = AlbumApi